"""Runtime utilities shared entre FastAPI e execuções off-line."""

from __future__ import annotations

import importlib
import json
import logging
import os
import sys
from pathlib import Path

import yaml

# dotenv é opcional para execução local
try:
    from dotenv import load_dotenv
except ModuleNotFoundError:

    def load_dotenv(*_, **__):
        return False


load_dotenv()

ROOT = Path(__file__).resolve().parent
STORAGE = ROOT / "storage"
LOGS = STORAGE / "logs"
PROMPT_PATH = ROOT / "agent_gpt_prompt.yaml"
STORAGE.mkdir(exist_ok=True)
LOGS.mkdir(exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler(LOGS / "agent.log", encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ],
)
logger = logging.getLogger("AgenteGPT")


def kv_set(session, k: str, v: str):
    session.execute(
        text("INSERT INTO kv (k,v) VALUES (:k,:v) ON CONFLICT (k) DO UPDATE SET v=:v"),
        {"k": k, "v": v},
    )
    session.commit()


def kv_get(session, k: str, default=None):
    row = session.execute(
        text("SELECT v FROM kv WHERE k=:k"), {"k": k}).fetchone()
    return row[0] if row else default


def load_prompt(path: Path) -> Dict[str, Any]:
    with path.open("r", encoding="utf-8") as handler:
        return yaml.safe_load(handler)


def collect_system_status():
    """Gera snapshot operacional para health dashboards."""
    summary: Dict[str, Any] = {
        "database": {"url": DATABASE_URL, "ok": False},
        "prompt_path": str(PROMPT_PATH),
        "storage": str(STORAGE),
        "logs": str(LOGS),
        "counts": {},
    }
    try:
        with SessionLocal() as session:  # type: ignore[misc]
            session.execute(text("SELECT 1"))
            summary["database"]["ok"] = True
            counts = {}
            for table in ("affiliates", "subscriptions", "business_demands", "tasks"):
                try:
                    rows = session.execute(
                        text(f"SELECT COUNT(*) FROM {table}"))
                    counts[table] = rows.fetchone()[0]
                except Exception as exc:  # noqa: BLE001
                    counts[table] = f"erro: {exc}"  # pragma: no cover
            summary["counts"] = counts
            summary["kv_last_cycle"] = kv_get(session, "last_cycle")
    except Exception as exc:  # noqa: BLE001
        summary["database"]["error"] = str(exc)
    summary["prompt_exists"] = PROMPT_PATH.exists()
    summary["storage_exists"] = STORAGE.exists()
    summary["logs_exists"] = LOGS.exists()
    return summary


class TaskExecutor:
    """Orquestra pipeline_execucao e registra status no banco."""

    def __init__(self, session, config: Dict[str, Any]):
        self.session = session
        self.config = config

    def _import_callable(self, dotted: str):
        if not dotted or "." not in dotted:
            raise ValueError(
                f"Formato de módulo inválido: '{dotted}'. Use pacote.funcao"
            )
        mod_name, func_name = dotted.split(".", 1)
        try:
            mod = importlib.import_module(f"modules.{mod_name}")
        except ImportError as exc:
            raise ImportError(
                f"Não foi possível importar modules.{mod_name}") from exc
        if not hasattr(mod, func_name):
            raise AttributeError(
                f"modules.{mod_name} não possui '{func_name}'")
        func = getattr(mod, func_name)
        if not callable(func):
            raise TypeError(f"'{dotted}' não é uma função executável")
        return func

    def _insert_task(self, name, module, status):
        row = self.session.execute(
            text(
                "INSERT INTO tasks (name,module,status,started_at) VALUES (:n,:m,:s,:t) RETURNING id"
            ),
            {"n": name, "m": module, "s": status,
                "t": datetime.utcnow().isoformat()},
        ).fetchone()
        self.session.commit()
        return row[0]

    def _finish_task(self, task_id, status, result=None, error=None):
        self.session.execute(
            text(
                "UPDATE tasks SET status=:st, finished_at=:ft, result=:rs, error=:er WHERE id=:id"
            ),
            {
                "st": status,
                "ft": datetime.utcnow().isoformat(),
                "rs": result,
                "er": error,
                "id": task_id,
            },
        )
        self.session.commit()

    def run_pipeline(self):
        pipeline = self.config.get("pipeline_execucao") or []
        if not pipeline:
            logger.warning(
                "⚠️ pipeline_execucao vazio em agent_gpt_prompt.yaml — nada a executar."
            )
            return
        total = len(pipeline)
        logger.info("🧠 Executando pipeline com %s etapas.", total)
        for idx, step in enumerate(pipeline, 1):
            name = step.get("tarefa") or f"etapa_{idx}"
            module = step.get("modulo")
            if not module:
                logger.warning(
                    "⚠️ Etapa '%s' sem campo 'modulo' — ignorada.", name)
                continue
            responsible = step.get("responsável") or "Agente GPT"
            logger.info(
                "🚀 [%s/%s] %s — responsável: %s — módulo: %s",
                idx,
                total,
                name,
                responsible,
                module,
            )
            tid = self._insert_task(name, module, "running")
            try:
                fn = self._import_callable(module)
                result = fn(self.session, self.config)
            except Exception as exc:  # noqa: BLE001
                logger.exception(
                    "❌ Falha durante a tarefa '%s' (%s)", name, module)
                self._finish_task(tid, "error", error=str(exc))
                continue
            self._finish_task(tid, "done", result=str(result))
            logger.info("✅ Tarefa '%s' concluída.", name)

    def run_task(self, module_path: str):
        logger.info("⚙️ Execução manual solicitada para %s", module_path)
        tid = self._insert_task(
            f"manual:{module_path}", module_path, "running")
        try:
            func = self._import_callable(module_path)
            result = func(self.session, self.config)
            self._finish_task(tid, "done", result=str(result))
            logger.info("✅ Execução manual finalizada para %s", module_path)
            return {"status": "ok", "result": result}
        except Exception as exc:  # noqa: BLE001
            logger.exception("❌ Erro em execução manual %s", module_path)
            self._finish_task(tid, "error", error=str(exc))
            raise


__all__ = [
    "SessionLocal",
    "TaskExecutor",
    "PROMPT_PATH",
    "init_db",
    "load_prompt",
    "logger",
    "kv_set",
    "kv_get",
    "text",
    "collect_system_status",
]
