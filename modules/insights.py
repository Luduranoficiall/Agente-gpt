import json
from datetime import datetime
from pathlib import Path
from typing import Any, Dict

from agent_runtime import text, kv_get

from .utils import emit_humanized

STORAGE = Path(__file__).resolve().parents[1] / "storage"
SUMMARY_FILE = STORAGE / "insights_summary.json"


def _fetch_scalar(session, query: str, params: Dict[str, Any] | None = None, default: Any = 0) -> Any:
    row = session.execute(text(query), params or {}).fetchone()
    return row[0] if row else default


def _persist_summary(payload: Dict[str, Any]):
    STORAGE.mkdir(exist_ok=True)
    SUMMARY_FILE.write_text(json.dumps(payload, indent=2, ensure_ascii=False))


def generate_universal_dashboard(session, config: Dict[str, Any]):
    """Calcula métricas principais do ecossistema e persiste como JSON."""
    TOTAL_AFILIADOS = _fetch_scalar(session, "SELECT COUNT(*) FROM affiliates")
    SUB_COUNT = _fetch_scalar(session, "SELECT COUNT(*) FROM subscriptions")
    MRR = _fetch_scalar(session, "SELECT COALESCE(SUM(amount),0) FROM subscriptions")
    DEMANDS_PENDING = _fetch_scalar(
        session,
        "SELECT COUNT(*) FROM business_demands WHERE status IN ('pending','queued')",
    )
    LAST_CYCLE = kv_get(session, "last_cycle")
    payload = {
        "generated_at": datetime.utcnow().isoformat(),
        "afiliados": int(TOTAL_AFILIADOS or 0),
        "assinaturas": {"quantidade": int(SUB_COUNT or 0), "mrr": float(MRR or 0.0)},
        "demandas_pendentes": int(DEMANDS_PENDING or 0),
        "last_cycle": LAST_CYCLE,
        "prioridades_top": list((config.get("prioridades_maximas") or {}).values())[:3]
        if isinstance(config.get("prioridades_maximas"), dict)
        else (config.get("prioridades_maximas") or [])[:3],
    }
    _persist_summary(payload)
    return emit_humanized(
        "INSIGHTS",
        "Dashboard universal atualizado com afiliados, MRR e demandas pendentes.",
    )


def load_cached_summary() -> Dict[str, Any] | None:
    if not SUMMARY_FILE.exists():
        return None
    try:
        return json.loads(SUMMARY_FILE.read_text())
    except json.JSONDecodeError:
        return None
