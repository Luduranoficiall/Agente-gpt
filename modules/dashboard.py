from fastapi import APIRouter, Depends, HTTPException, Header
from fastapi.responses import HTMLResponse
from sqlalchemy import text
from agent_gpt import SessionLocal
import os, json

router = APIRouter()

# ==============================
# 🔐 VALIDAÇÃO DE TOKEN
# ==============================
def validar_token(x_token: str = Header(None)):
    expected = os.getenv("PUBLIC_AGENT_SECRET")
    if not x_token or x_token != expected:
        raise HTTPException(status_code=401, detail="Token inválido.")
    return True

# ==============================
# 📊 HTML DO PAINEL
# ==============================
PANEL_HTML = """
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Agente GPT — Dashboard Profissional</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body{
    margin:0;
    background:#f3f4f6;
    font-family:Arial, Helvetica, sans-serif;
}
header{
    background:#111827;
    color:white;
    padding:20px;
    font-size:22px;
}
section{
    padding:20px;
}
.card{
    background:white;
    padding:20px;
    border-radius:14px;
    margin-bottom:20px;
    box-shadow:0 4px 8px rgba(0,0,0,0.05);
}
.card h2{
    margin-top:0;
    font-size:20px;
}
table{
    width:100%;
    border-collapse:collapse;
}
th,td{
    padding:10px;
    border-bottom:1px solid #ddd;
    font-size:14px;
}
.btn{
    background:#111827;
    color:white;
    padding:10px 16px;
    border-radius:8px;
    cursor:pointer;
    border:none;
}
</style>
</head>
<body>

<header>⚡ Painel Profissional — Agente GPT (Multi-Empresas)</header>

<section>

<div class="card">
    <h2>📌 Execução do Agente</h2>
    <button class="btn" onclick="runPipeline()">Executar Pipeline</button>
</div>

<div class="card">
    <h2>🧠 Últimas Tarefas</h2>
    <table id="tasks-table">
        <thead><tr><th>ID</th><th>Tarefa</th><th>Módulo</th><th>Status</th><th>Início</th><th>Fim</th></tr></thead>
        <tbody></tbody>
    </table>
</div>

<div class="card">
    <h2>👥 Afiliados ALIANCI.A</h2>
    <table id="affiliates-table">
        <thead><tr><th>ID</th><th>Nome</th><th>Email</th><th>Telefone</th><th>Patrocinador</th><th>Data</th></tr></thead>
        <tbody></tbody>
    </table>
</div>

<div class="card">
    <h2>💰 Comissões Recentes</h2>
    <table id="comm-table">
        <thead><tr><th>ID</th><th>Pagador</th><th>Beneficiário</th><th>Nível</th><th>Base</th><th>%</th><th>Comissão</th><th>Data</th></tr></thead>
        <tbody></tbody>
    </table>
</div>

<div class="card">
    <h2>📚 Documentação Automática</h2>
    <button class="btn" onclick="loadDocs()">Gerar Documentação</button>
    <pre id="docs-box" style="margin-top:10px; white-space:pre-wrap;"></pre>
</div>

</section>


<script>
async function runPipeline(){
    await fetch('/run/pipeline', {method:'POST', headers:{'x-token':'""" + os.getenv("PUBLIC_AGENT_SECRET", "") + """'}})
    loadTasks();
}

async function loadTasks(){
    const r = await fetch('/tasks', {headers:{'x-token':'""" + os.getenv("PUBLIC_AGENT_SECRET", "") + """'}});
    const data = await r.json();
    const tbody = document.querySelector("#tasks-table tbody");
    tbody.innerHTML="";
    data.forEach(t=>{
        tbody.innerHTML += `<tr><td>${t.id}</td><td>${t.name}</td><td>${t.module}</td><td>${t.status}</td><td>${t.started_at}</td><td>${t.finished_at}</td></tr>`;
    })
}

async function loadAffiliates(){
    const r = await fetch('/internal/affiliates', {headers:{'x-token':'""" + os.getenv("PUBLIC_AGENT_SECRET", "") + """'}});
    const data = await r.json();
    const tbody = document.querySelector("#affiliates-table tbody");
    tbody.innerHTML="";
    data.forEach(a=>{
        tbody.innerHTML += `<tr><td>${a.id}</td><td>${a.name}</td><td>${a.email}</td><td>${a.phone}</td><td>${a.sponsor_id}</td><td>${a.created_at}</td></tr>`;
    })
}

async function loadCommissions(){
    const r = await fetch('/internal/commissions', {headers:{'x-token':'""" + os.getenv("PUBLIC_AGENT_SECRET", "") + """'}});
    const data = await r.json();
    const tbody = document.querySelector("#comm-table tbody");
    tbody.innerHTML="";
    data.forEach(c=>{
        tbody.innerHTML += `<tr><td>${c.id}</td><td>${c.payer_affiliate_id}</td><td>${c.beneficiary_affiliate_id}</td><td>${c.level}</td><td>${c.base_amount}</td><td>${c.percent}</td><td>${c.commission_value}</td><td>${c.created_at}</td></tr>`;
    })
}

async function loadDocs(){
    const r = await fetch('/docs/generate', {headers:{'x-token':'""" + os.getenv("PUBLIC_AGENT_SECRET", "") + """'}});
    const data = await r.json();
    document.getElementById("docs-box").textContent = data.documentation;
}

loadTasks();
loadAffiliates();
loadCommissions();
</script>

</body>
</html>
"""

# ==============================
# 📌 ROTAS DO PAINEL
# ==============================

@router.get("/panel", response_class=HTMLResponse)
def open_panel(token: bool = Depends(validar_token)):
    return PANEL_HTML

@router.get("/internal/affiliates")
def get_affiliates(token: bool = Depends(validar_token)):
    with SessionLocal() as s:
        rows = s.execute(text("SELECT * FROM affiliates ORDER BY id DESC")).fetchall()
        return [dict(r._mapping) for r in rows]

@router.get("/internal/commissions")
def get_comms(token: bool = Depends(validar_token)):
    with SessionLocal() as s:
        rows = s.execute(text("SELECT * FROM commissions ORDER BY id DESC")).fetchall()
        return [dict(r._mapping) for r in rows]

@router.get("/docs/generate")
def generate_docs(token: bool = Depends(validar_token)):
    """
    🔥 Cria automaticamente a documentação interna do ecossistema.
    """
    docs = {
        "AURI.A": "Sistema de avaliação baseado nas 12 Peneiras...",
        "PREDITIVI.A": "Diagnóstico preditivo usando IA...",
        "MENTORI.A": "Ciclos de acompanhamento humanizado...",
        "ALIANCIA": "Plano 25/10/5 com assinatura 197...",
        "ECONOMI.A": "Cashback e APIs de consumo...",
        "BOTGPT": "Bots e automações white-label...",
        "MARI.A": "Conteúdo, marketing e campanhas...",
        "VERIDI.A": "Verificação e checagem...",
    }

    return {"documentation": json.dumps(docs, indent=4, ensure_ascii=False)}
