import os
def get_agent_url():
    return os.getenv("AGENT_URL", "https://agente.extraordinaria.ai")

if __name__ == "__main__":
    print(f"Seu agente está disponível em: {get_agent_url()}")
import os, sys, yaml, time, logging, importlib, threading, requests, json
from pathlib import Path
from datetime import datetime
from typing import Any, Dict, Optional, List, Union

from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from apscheduler.schedulers.background import BackgroundScheduler
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

from modules.integrations.social_channels import (
    ChannelName,
    send_to_channel,
    broadcast,
    SocialChannelError,
)

load_dotenv()
ROOT = Path(__file__).resolve().parent
STORAGE = ROOT / "storage"
LOGS = STORAGE / "logs"
PROMPT_PATH = ROOT / "agent_gpt_prompt.yaml"
STORAGE.mkdir(exist_ok=True); LOGS.mkdir(exist_ok=True)

logging.basicConfig(
  level=logging.INFO,
  format="%(asctime)s [%(levelname)s] %(message)s",
  handlers=[logging.FileHandler(LOGS / "agent.log", encoding="utf-8"), logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger("AgenteGPT")

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///storage/agent.sqlite3")
engine = create_engine(DATABASE_URL, echo=False, future=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)

def init_db():
    logger.info("🔧 Iniciando banco de dados e garantindo tabelas…")
    with engine.begin() as conn:
        conn.execute(text("""
        CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          name TEXT, module TEXT, status TEXT,
          started_at TEXT, finished_at TEXT, result TEXT, error TEXT
        )"""))
        conn.execute(text("""CREATE TABLE IF NOT EXISTS kv (k TEXT PRIMARY KEY, v TEXT)"""))
        conn.execute(text("""
        CREATE TABLE IF NOT EXISTS affiliates (
          id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          name TEXT, email TEXT, phone TEXT,
          sponsor_id INTEGER, tenant_id TEXT, created_at TEXT
        )"""))
        conn.execute(text("""
        CREATE TABLE IF NOT EXISTS subscriptions (
          id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          affiliate_id INTEGER, amount REAL, period TEXT,
          tenant_id TEXT, created_at TEXT
        )"""))
        conn.execute(text("""
        CREATE TABLE IF NOT EXISTS commissions (
          id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          payer_affiliate_id INTEGER, beneficiary_affiliate_id INTEGER,
          level INTEGER, base_amount REAL, percent REAL, commission_value REAL,
          tenant_id TEXT, created_at TEXT
        )"""))
        conn.execute(text("""
        CREATE TABLE IF NOT EXISTS business_demands (
          id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          client_id TEXT,
          title TEXT,
          description TEXT,
          channels TEXT,
          to_map TEXT,
          status TEXT,
          created_at TEXT,
          processed_at TEXT
        )"""))
    logger.info("✔ Banco de dados pronto.")

def kv_set(session, k, v):
    session.execute(text("INSERT INTO kv (k,v) VALUES (:k,:v) ON CONFLICT (k) DO UPDATE SET v=:v"), {"k":k,"v":v})
    session.commit()

def kv_get(session, k, default=None):
    row = session.execute(text("SELECT v FROM kv WHERE k=:k"), {"k":k}).fetchone()
    return row[0] if row else default

def load_prompt(path: Path) -> Dict[str, Any]:
    """Carrega o prompt mestre YAML que define o comportamento do agente."""
    with path.open("r", encoding="utf-8") as f:
        return yaml.safe_load(f)

class TaskExecutor:
    """Orquestra a execução declarada no prompt e registra progresso no banco."""

    def __init__(self, session, config: Dict[str, Any]):
        self.session = session; self.config = config

    def _import_callable(self, dotted: str):
        if not dotted or "." not in dotted:
            raise ValueError(f"Formato de módulo inválido: '{dotted}'. Use pacote.funcao")
        mod_name, func_name = dotted.split(".", 1)
        try:
            mod = importlib.import_module(f"modules.{mod_name}")
        except ImportError as exc:
            raise ImportError(f"Não foi possível importar modules.{mod_name}") from exc
        if not hasattr(mod, func_name):
            raise AttributeError(f"modules.{mod_name} não possui '{func_name}'")
        func = getattr(mod, func_name)
        if not callable(func):
            raise TypeError(f"'{dotted}' não é uma função executável")
        return func
    def _insert_task(self, name, module, status):
        row = self.session.execute(text(
            "INSERT INTO tasks (name,module,status,started_at) VALUES (:n,:m,:s,:t) RETURNING id"
        ), {"n":name,"m":module,"s":status,"t":datetime.utcnow().isoformat()}).fetchone()
        self.session.commit(); return row[0]
    def _finish_task(self, task_id, status, result=None, error=None):
        self.session.execute(text(
            "UPDATE tasks SET status=:st, finished_at=:ft, result=:rs, error=:er WHERE id=:id"
        ), {"st":status,"ft":datetime.utcnow().isoformat(),"rs":result,"er":error,"id":task_id})
        self.session.commit()
    def run_pipeline(self):
        pipeline = self.config.get("pipeline_execucao") or []
        if not pipeline:
            logger.warning("⚠️ pipeline_execucao vazio em agent_gpt_prompt.yaml — nada a executar."); return
        total = len(pipeline)
        logger.info("🧠 Executando pipeline com %s etapas.", total)
        for idx, step in enumerate(pipeline, 1):
            name = step.get("tarefa") or f"etapa_{idx}"
            module = step.get("modulo")
            if not module:
                logger.warning("⚠️ Etapa '%s' sem campo 'modulo' — ignorada.", name)
                continue
            responsible = step.get("responsável") or "Agente GPT"
            logger.info("🚀 [%s/%s] %s — responsável: %s — módulo: %s", idx, total, name, responsible, module)
            tid = self._insert_task(name, module, "running")
            try:
                fn = self._import_callable(module)
                result = fn(self.session, self.config)
            except Exception as e:
                logger.exception("❌ Falha durante a tarefa '%s' (%s)", name, module)
                self._finish_task(tid, "error", error=str(e))
                continue
            self._finish_task(tid, "done", result=str(result))
            logger.info("✅ Tarefa '%s' concluída.", name)
    def run_task(self, module_path: str):
        logger.info("⚙️ Execução manual solicitada para %s", module_path)
        tid = self._insert_task(f"manual:{module_path}", module_path, "running")
        try:
            fn = self._import_callable(module_path)
            result = fn(self.session, self.config)
            self._finish_task(tid, "done", result=str(result))
            logger.info("✅ Execução manual finalizada para %s", module_path)
            return {"status":"ok","result":result}
        except Exception as e:
            logger.exception("❌ Erro em execução manual %s", module_path)
            self._finish_task(tid, "error", error=str(e))
            raise

app = FastAPI(
    title="Agente GPT — EXTRAORDINARI.A",
    version="1.0.0",
    description="IA Geral Autônoma • Multicanal • Multi-Empresas • Multi-Tenant",
)

class RunTaskIn(BaseModel):
    module: str

class AffiliateIn(BaseModel):
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    sponsor_id: Optional[int] = None
    tenant_id: Optional[str] = "default"

class SubscriptionIn(BaseModel):
    affiliate_id: int
    amount: float = 197.0
    period: str = "monthly"
    tenant_id: Optional[str] = "default"

class DemandIn(BaseModel):
    client_id: str
    title: str
    description: str
    channels: List[str]
    to_map: Optional[Union[str, Dict[str, str]]] = None

class WhatsAppMsgIn(BaseModel):
    channel: str
    destination: str
    message: str

class SheetAppendIn(BaseModel):
    worksheet: Optional[str] = None
    values: list

class SocialSingleIn(BaseModel):
    channel: ChannelName
    message: str
    to: Optional[str] = None

class SocialBroadcastIn(BaseModel):
    channels: List[ChannelName]
    message: str
    to_map: Optional[Dict[ChannelName, str]] = None

class DemandOut(BaseModel):
    id: int
    client_id: Optional[str]
    title: str
    description: str
    channels: List[str]
    to_map: Dict[str, str]
    status: str
    created_at: str
    processed_at: Optional[str] = None

@app.get("/health")
def health():
    return {
        "status": "ok",
        "time": datetime.utcnow().isoformat(),
        "service": "Agente GPT — FULL VERSION",
    }

@app.post("/run/pipeline")
def run_pipeline():
    with SessionLocal() as session:
        config = load_prompt(PROMPT_PATH)
        executor = TaskExecutor(session, config)
        executor.run_pipeline()
    return {"status":"pipeline_executado"}

@app.post("/run/task")
def run_task(payload: RunTaskIn):
    with SessionLocal() as session:
        config = load_prompt(PROMPT_PATH)
        executor = TaskExecutor(session, config)
        try:
            return executor.run_task(payload.module)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

@app.get("/tasks")
def list_tasks():
    with SessionLocal() as s:
        rows = s.execute(text("""
            SELECT id,name,module,status,started_at,finished_at
            FROM tasks ORDER BY id DESC LIMIT 200
        """)).fetchall()
        return [dict(r._mapping) for r in rows]

@app.get("/tasks/{task_id}")
def get_task(task_id: int):
    with SessionLocal() as s:
        row = s.execute(text("SELECT * FROM tasks WHERE id=:id"), {"id":task_id}).fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Task não encontrada")
        return dict(row._mapping)

def get_sponsor(session, affiliate_id):
    """Retorna o ID do patrocinador direto do afiliado."""
    row = session.execute(
        text("SELECT sponsor_id FROM affiliates WHERE id=:id"),
        {"id": affiliate_id},
    ).fetchone()
    return row[0] if row else None

def distribute_commissions(session, payer_affiliate_id: int, base_amount: float, tenant_id: str):
    """Distribui comissões 25/10/5 para até três níveis ascendentes."""
    percentages = {1: 0.25, 2: 0.10, 3: 0.05}
    current = get_sponsor(session, payer_affiliate_id)
    level = 1
    while level <= 3 and current:
        commission_value = round(base_amount * percentages[level], 2)
        session.execute(text("""
            INSERT INTO commissions (
                payer_affiliate_id,
                beneficiary_affiliate_id,
                level,
                base_amount,
                percent,
                commission_value,
                tenant_id,
                created_at
            ) VALUES (:p,:b,:l,:ba,:pc,:cv,:t,:ts)
        """), {
            "p": payer_affiliate_id,
            "b": current,
            "l": level,
            "ba": base_amount,
            "pc": percentages[level] * 100,
            "cv": commission_value,
            "t": tenant_id,
            "ts": datetime.utcnow().isoformat(),
        })
        session.commit()
        current = get_sponsor(session, current)
        level += 1

@app.post("/aliancia/register")
def register_affiliate(inp: AffiliateIn):
    with SessionLocal() as s:
        row = s.execute(text("""
            INSERT INTO affiliates (
                name,email,phone,sponsor_id,tenant_id,created_at
            ) VALUES (:n,:e,:p,:s,:t,:ts)
            RETURNING id
        """), {
            "n": inp.name,
            "e": inp.email,
            "p": inp.phone,
            "s": inp.sponsor_id,
            "t": inp.tenant_id,
            "ts": datetime.utcnow().isoformat(),
        }).fetchone()
        s.commit()
        return {
            "id": row[0],
            "name": inp.name,
            "tenant_id": inp.tenant_id,
            "message": "Afiliado cadastrado com sucesso. Bem-vindo à ALIANCI.A!",
        }

@app.post("/aliancia/subscribe")
def register_subscription(inp: SubscriptionIn):
    with SessionLocal() as s:
        s.execute(text("""
            INSERT INTO subscriptions (
                affiliate_id,
                amount,
                period,
                tenant_id,
                created_at
            ) VALUES (:a,:m,:p,:t,:ts)
        """), {
            "a": inp.affiliate_id,
            "m": inp.amount,
            "p": inp.period,
            "t": inp.tenant_id,
            "ts": datetime.utcnow().isoformat(),
        })
        s.commit()
        distribute_commissions(
            session=s,
            payer_affiliate_id=inp.affiliate_id,
            base_amount=inp.amount,
            tenant_id=inp.tenant_id,
        )
        return {
            "status": "ok",
            "mensagem": "Assinatura registrada e comissões distribuídas (25/10/5).",
        }

@app.get("/aliancia/commissions/{affiliate_id}")
def list_commissions(affiliate_id: int):
    with SessionLocal() as s:
        rows = s.execute(text("""
          SELECT id, payer_affiliate_id, level, base_amount, percent, commission_value, tenant_id, created_at
          FROM commissions WHERE beneficiary_affiliate_id=:id ORDER BY id DESC
        """), {"id":affiliate_id}).fetchall()
        return [dict(r._mapping) for r in rows]

@app.post("/notify/whatsapp")
def whatsapp_send(inp: WhatsAppMsgIn):
    allowed = {"whatsapp_360", "whatsapp_cloud"}
    if inp.channel not in allowed:
        raise HTTPException(status_code=400, detail="Canal inválido para esta rota.")
    try:
        result = send_to_channel(inp.channel, inp.message, to=inp.destination)
        return {"status": "sent", "channel": inp.channel, "result": result}
    except SocialChannelError as se:
        raise HTTPException(status_code=400, detail=str(se))
    except Exception as e:
        logger.exception("Erro ao enviar WhatsApp")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/sheets/append")
def sheets_append(inp: SheetAppendIn):
    try:
        from modules.integrations.sheets import append_values
        worksheet = inp.worksheet or os.getenv("GOOGLE_SHEETS_WORKSHEET","Afiliados")
        append_values(worksheet, inp.values)
        return {"status":"ok","worksheet":worksheet,"rows":len(inp.values)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/notify/channel")
def notify_channel(payload: SocialSingleIn):
    try:
        result = send_to_channel(
            channel=payload.channel,
            message=payload.message,
            to=payload.to,
        )
        return {"status":"ok","channel":payload.channel,"result":result}
    except SocialChannelError as se:
        raise HTTPException(status_code=400, detail=str(se))
    except Exception as e:
        logger.exception("Erro em /notify/channel")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/notify/broadcast")
def notify_broadcast(payload: SocialBroadcastIn):
    try:
        result = broadcast(
            channels=payload.channels,
            message=payload.message,
            to_map=payload.to_map or {},
        )
        return {"status":"ok","result":result}
    except Exception as e:
        logger.exception("Erro em /notify/broadcast")
        raise HTTPException(status_code=500, detail=str(e))

def _normalize_to_map(raw: Optional[Union[str, Dict[str, str]]]) -> Dict[str, str]:
    if not raw:
        return {}
    data: Any = raw
    if isinstance(raw, str):
        try:
            data = json.loads(raw)
        except json.JSONDecodeError:
            logger.warning("to_map inválido recebido: %s", raw)
            return {}
    if not isinstance(data, dict):
        logger.warning("to_map ignorado (formato não suportado): %s", type(data))
        return {}
    return {str(k): str(v) for k, v in data.items()}

@app.post("/business/demands", response_model=DemandOut)
def create_demand(inp: DemandIn):
    now = datetime.utcnow().isoformat()
    channels = inp.channels or []
    to_map = _normalize_to_map(inp.to_map)
    message = f"{inp.title}\n\n{inp.description}".strip()
    with SessionLocal() as s:
        row = s.execute(text("""
          INSERT INTO business_demands (client_id,title,description,channels,to_map,status,created_at)
          VALUES (:client_id,:title,:description,:channels,:to_map,:status,:created_at)
          RETURNING id
        """), {
          "client_id":inp.client_id,
          "title":inp.title,
          "description":inp.description,
          "channels":json.dumps(channels),
          "to_map":json.dumps(to_map),
          "status":"queued",
          "created_at":now
        }).fetchone()
        demand_id = row[0]
        s.commit()
        try:
            result = broadcast(
                channels=channels,  # type: ignore[arg-type]
                message=message,
                to_map=to_map,
            )
            status = "sent"
            processed_at = datetime.utcnow().isoformat()
            logger.info("Demanda %s enviada com resultado: %s", demand_id, result)
        except Exception as e:
            logger.exception("Erro ao enviar broadcast demanda.")
            status = "error"
            processed_at = datetime.utcnow().isoformat()
        s.execute(text("""
          UPDATE business_demands
          SET status=:status, processed_at=:processed_at
          WHERE id=:id
        """), {"status":status,"processed_at":processed_at,"id":demand_id})
        s.commit()
        return DemandOut(
            id=demand_id,
            client_id=inp.client_id,
            title=inp.title,
            description=inp.description,
            channels=channels,
            to_map=to_map,
            status=status,
            created_at=now,
            processed_at=processed_at,
        )

@app.get("/business/demands", response_model=List[DemandOut])
def list_demands(limit: int = 100, client_id: Optional[str] = None):
    query = """
      SELECT id,client_id,title,description,channels,to_map,status,created_at,processed_at
      FROM business_demands
    """
    params: Dict[str, Any] = {}
    if client_id:
        query += " WHERE client_id = :client_id"
        params["client_id"] = client_id
    query += " ORDER BY id DESC LIMIT :limit"
    params["limit"] = limit
    with SessionLocal() as s:
        rows = s.execute(text(query), params).fetchall()
    demands: List[DemandOut] = []
    for r in rows:
        channels = json.loads(r.channels) if r.channels else []
        to_map = json.loads(r.to_map) if r.to_map else {}
        demands.append(DemandOut(
            id=r.id,
            client_id=r.client_id,
            title=r.title,
            description=r.description,
            channels=channels,
            to_map=to_map,
            status=r.status,
            created_at=r.created_at,
            processed_at=r.processed_at,
        ))
    return demands

DASHBOARD_HTML = """<!doctype html><html><head><meta charset="utf-8"/><title>Agente GPT — Dashboard</title>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<style>body{font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;margin:24px;max-width:1100px}
header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
h1{font-size:1.6rem;margin:0}.card{border:1px solid #ddd;border-radius:12px;padding:16px;margin-bottom:16px}
table{width:100%;border-collapse:collapse}th,td{border-bottom:1px solid #eee;padding:8px;text-align:left;font-size:14px}
.btn{padding:8px 12px;border-radius:8px;border:1px solid #333;background:#111;color:#fff;cursor:pointer}</style></head>
<body><header><h1>Agente GPT — Dashboard</h1><button class="btn" onclick="runPipeline()">Executar Pipeline</button></header>
<section class="card"><h3>Tarefas recentes</h3><table id="tasks"><thead><tr><th>ID</th><th>Nome</th><th>Módulo</th><th>Status</th><th>Início</th><th>Fim</th></tr></thead><tbody></tbody></table></section>
<section class="card"><h3>Comissões (beneficiário)</h3><div><input id="benef" placeholder="ID do afiliado"/><button class="btn" onclick="loadCommissions()">Buscar</button></div>
<table id="comms"><thead><tr><th>ID</th><th>Pagador</th><th>Nível</th><th>Base</th><th>%</th><th>Comissão</th><th>Quando</th></tr></thead><tbody></tbody></table></section>
<script>
async function runPipeline(){await fetch('/run/pipeline',{method:'POST'});await loadTasks();}
async function loadTasks(){const r=await fetch('/tasks');const d=await r.json();const tb=document.querySelector('#tasks tbody');tb.innerHTML='';
d.forEach(x=>{const tr=document.createElement('tr');tr.innerHTML=`<td>${x.id}</td><td>${x.name}</td><td>${x.module}</td><td>${x.status}</td><td>${x.started_at??''}</td><td>${x.finished_at??''}</td>`;tb.appendChild(tr);});}
async function loadCommissions(){const id=document.getElementById('benef').value;const r=await fetch('/aliancia/commissions/'+id);const d=await r.json();const tb=document.querySelector('#comms tbody');tb.innerHTML='';
d.forEach(x=>{const tr=document.createElement('tr');tr.innerHTML=`<td>${x.id}</td><td>${x.payer_affiliate_id}</td><td>${x.level}</td><td>${x.base_amount}</td><td>${x.percent}</td><td>${x.commission_value}</td><td>${x.created_at}</td>`;tb.appendChild(tr);});}
loadTasks();</script></body></html>"""

@app.get("/", response_class=HTMLResponse)
def dashboard():
    return DASHBOARD_HTML

def run_cycle():
    try:
        logger.info("Scheduler: executando ciclo do pipeline…")
        cfg = load_prompt(PROMPT_PATH)
        with SessionLocal() as s:
            TaskExecutor(s, cfg).run_pipeline()
            kv_set(s, "last_cycle", datetime.utcnow().isoformat())
    except Exception:
        logger.exception("Erro no ciclo programado:")

def start_scheduler():
    seconds = int(os.getenv("AGENT_CYCLE_SECONDS","120"))
    sched = BackgroundScheduler(daemon=True)
    sched.add_job(run_cycle, "interval", seconds=seconds, id="agent_cycle", replace_existing=True)
    sched.start()
    logger.info(f"Scheduler iniciado: a cada {seconds}s")

def start_uvicorn():
    import uvicorn
    host = os.getenv("FASTAPI_HOST","0.0.0.0")
    port = int(os.getenv("FASTAPI_PORT","8080"))
    uvicorn.run(app, host=host, port=port, log_level="info")

def main():
    logger.info("Agente GPT – Inicializando…")
    init_db()
    start_scheduler()
    api_thread = threading.Thread(target=start_uvicorn, daemon=True)
    api_thread.start()
    try:
        while True:
            time.sleep(3600)
    except KeyboardInterrupt:
        logger.info("Encerrado.")

if __name__ == "__main__":
    sys.exit(main())
