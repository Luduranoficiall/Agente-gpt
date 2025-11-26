"""Runtime utilities shared entre FastAPI e execuções off-line."""

from __future__ import annotations

import json
import logging
import importlib
import os
import sys
import sqlite3
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, Optional, Sequence

import yaml
# dotenv é opcional para execução local
try:
    from dotenv import load_dotenv
except ModuleNotFoundError:  # pragma: no cover
    def load_dotenv(*_, **__):  # type: ignore[override]
        return False
try:  # pragma: no cover - optional dependency
    from sqlalchemy import create_engine, text
    from sqlalchemy.orm import sessionmaker
    _HAS_SQLALCHEMY = True
except ModuleNotFoundError:  # pragma: no cover
    _HAS_SQLALCHEMY = False

    def text(query: str) -> str:  # type: ignore[override]
        return query

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

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///storage/agent.sqlite3")
IS_SQLITE = DATABASE_URL.startswith("sqlite")

if IS_SQLITE:
    SQLITE_PATH = DATABASE_URL.replace("sqlite:///", "", 1)
else:
    SQLITE_PATH = DATABASE_URL

if _HAS_SQLALCHEMY:
    engine = create_engine(DATABASE_URL, echo=False, future=True)
    SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)
else:  # Fallback simples baseado em sqlite3

    class SimpleRow:
        def __init__(self, row: sqlite3.Row):
            self._row = row
            self._mapping = dict(row)

        def __getitem__(self, key):
            if isinstance(key, int):
                return list(self._mapping.values())[key]
            return self._mapping[key]

        def __getattr__(self, item):
            try:
                return self._mapping[item]
            except KeyError as exc:  # pragma: no cover
                raise AttributeError(item) from exc


    class SimpleResult:
        def __init__(self, cursor: sqlite3.Cursor):
            self._cursor = cursor

        def fetchone(self) -> Optional[SimpleRow]:
            row = self._cursor.fetchone()
            return SimpleRow(row) if row is not None else None

        def fetchall(self) -> Sequence[SimpleRow]:
            return [SimpleRow(row) for row in self._cursor.fetchall()]

        def scalar_one(self):
            row = self.fetchone()
            if row is None:
                raise RuntimeError("Nenhum resultado disponível para scalar_one().")
            return list(row._mapping.values())[0]


    class SimpleSession:
        def __init__(self, path: str):
            self._conn = sqlite3.connect(path)
            self._conn.row_factory = sqlite3.Row

        def execute(self, query: str, params: Optional[Dict[str, Any]] = None) -> SimpleResult:
            cursor = self._conn.execute(query, params or {})
            return SimpleResult(cursor)

        def commit(self):
            self._conn.commit()

        def rollback(self):
            self._conn.rollback()

        def close(self):
            self._conn.close()

        def __enter__(self):
            return self

        def __exit__(self, exc_type, exc, tb):
            if exc_type:
                self.rollback()
            else:
                self.commit()
            self.close()


    class SimpleSessionFactory:
        def __init__(self, path: str):
            self._path = path

        def __call__(self):
            return SimpleSession(self._path)


    engine = None  # type: ignore[assignment]
    SessionLocal = SimpleSessionFactory(SQLITE_PATH)  # type: ignore[assignment]


def init_db():
        ddl_sql = [
                """
                CREATE TABLE IF NOT EXISTS tasks (
                    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                    name TEXT, module TEXT, status TEXT,
                    started_at TEXT, finished_at TEXT, result TEXT, error TEXT
                )
                """,
                """CREATE TABLE IF NOT EXISTS kv (k TEXT PRIMARY KEY, v TEXT)""",
                """
                CREATE TABLE IF NOT EXISTS affiliates (
                    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                    name TEXT, email TEXT, phone TEXT,
                    sponsor_id INTEGER, tenant_id TEXT, created_at TEXT
                )
                """,
                """
                CREATE TABLE IF NOT EXISTS subscriptions (
                    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                    affiliate_id INTEGER, amount REAL, period TEXT,
                    tenant_id TEXT, created_at TEXT
                )
                """,
                """
                CREATE TABLE IF NOT EXISTS commissions (
                    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                    payer_affiliate_id INTEGER, beneficiary_affiliate_id INTEGER,
                    level INTEGER, base_amount REAL, percent REAL, commission_value REAL,
                    tenant_id TEXT, created_at TEXT
                )
                """,
                """
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
                )
                """,
        ]
        ddl_sqlite = """
                CREATE TABLE IF NOT EXISTS tasks (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT, module TEXT, status TEXT,
                    started_at TEXT, finished_at TEXT, result TEXT, error TEXT
                );
                CREATE TABLE IF NOT EXISTS kv (k TEXT PRIMARY KEY, v TEXT);
                CREATE TABLE IF NOT EXISTS affiliates (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT, email TEXT, phone TEXT,
                    sponsor_id INTEGER, tenant_id TEXT, created_at TEXT
                );
                CREATE TABLE IF NOT EXISTS subscriptions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    affiliate_id INTEGER, amount REAL, period TEXT,
                    tenant_id TEXT, created_at TEXT
                );
                CREATE TABLE IF NOT EXISTS commissions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    payer_affiliate_id INTEGER, beneficiary_affiliate_id INTEGER,
                    level INTEGER, base_amount REAL, percent REAL, commission_value REAL,
                    tenant_id TEXT, created_at TEXT
                );
                CREATE TABLE IF NOT EXISTS business_demands (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    client_id TEXT,
                    title TEXT,
                    description TEXT,
                    channels TEXT,
                    to_map TEXT,
                    status TEXT,
                    created_at TEXT,
                    processed_at TEXT
                );
        """
        if IS_SQLITE:
            sqlite3_conn = sqlite3.connect(SQLITE_PATH)
            try:
                sqlite3_conn.executescript(ddl_sqlite)
                sqlite3_conn.commit()
            finally:
                sqlite3_conn.close()
            return

        if not _HAS_SQLALCHEMY:
            raise RuntimeError("SQLAlchemy é necessário para DATABASE_URL não SQLite.")

        with engine.begin() as conn:  # type: ignore[union-attr]
            for statement in ddl_sql:
                conn.execute(text(statement))


def kv_set(session, k: str, v: str):
    session.execute(
        text("INSERT INTO kv (k,v) VALUES (:k,:v) ON CONFLICT (k) DO UPDATE SET v=:v"),
        {"k": k, "v": v},
    )
    session.commit()


def kv_get(session, k: str, default=None):
    row = session.execute(text("SELECT v FROM kv WHERE k=:k"), {"k": k}).fetchone()
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
                    rows = session.execute(text(f"SELECT COUNT(*) FROM {table}"))
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
        row = self.session.execute(
            text(
                "INSERT INTO tasks (name,module,status,started_at) VALUES (:n,:m,:s,:t) RETURNING id"
            ),
            {"n": name, "m": module, "s": status, "t": datetime.utcnow().isoformat()},
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
            logger.warning("⚠️ pipeline_execucao vazio em agent_gpt_prompt.yaml — nada a executar.")
            return
        total = len(pipeline)
        logger.info("🧠 Executando pipeline com %s etapas.", total)
        for idx, step in enumerate(pipeline, 1):
            name = step.get("tarefa") or f"etapa_{idx}"
            module = step.get("modulo")
            if not module:
                logger.warning("⚠️ Etapa '%s' sem campo 'modulo' — ignorada.", name)
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
                logger.exception("❌ Falha durante a tarefa '%s' (%s)", name, module)
                self._finish_task(tid, "error", error=str(exc))
                continue
            self._finish_task(tid, "done", result=str(result))
            logger.info("✅ Tarefa '%s' concluída.", name)

    def run_task(self, module_path: str):
        logger.info("⚙️ Execução manual solicitada para %s", module_path)
        tid = self._insert_task(f"manual:{module_path}", module_path, "running")
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
