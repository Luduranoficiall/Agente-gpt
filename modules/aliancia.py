import json
from datetime import datetime, timedelta
from pathlib import Path
from typing import Any, Dict, List

from agent_runtime import text

from .utils import emit_humanized

STORAGE = Path(__file__).resolve().parents[1] / "storage"
DASHBOARD_FILE = STORAGE / "aliancia_dashboard.json"


def _fetchall(
    session, query: str, params: Dict[str, Any] | None = None
) -> List[Dict[str, Any]]:
    rows = session.execute(text(query), params or {}).fetchall()
    return [dict(row._mapping) for row in rows]


def _persist_dashboard(payload: Dict[str, Any]):
    STORAGE.mkdir(exist_ok=True)
    DASHBOARD_FILE.write_text(json.dumps(
        payload, indent=2, ensure_ascii=False))


def _build_tree(session) -> List[Dict[str, Any]]:
    rows = _fetchall(
        session,
        "SELECT id, name, sponsor_id FROM affiliates ORDER BY created_at DESC LIMIT 200",
    )
    nodes: Dict[int, Dict[str, Any]] = {}
    for row in rows:
        nodes[row["id"]] = {"id": row["id"],
                            "name": row["name"], "children": []}
    roots: List[Dict[str, Any]] = []
    for row in rows:
        node = nodes[row["id"]]
        sponsor_id = row.get("sponsor_id")
        if sponsor_id and sponsor_id in nodes:
            nodes[sponsor_id]["children"].append(node)
        else:
            roots.append(node)
    return roots[:10]


def build_affiliates_backend(session, cfg: Dict[str, Any]):
    """Computa métricas ALIANCI.A e salva dashboard JSON."""
    totals = session.execute(
        text("SELECT COUNT(*) FROM affiliates")).fetchone()
    total_affiliates = totals[0] if totals else 0

    commissions = _fetchall(
        session,
        """
        SELECT
            level,
            COUNT(*) AS qtd,
            ROUND(COALESCE(SUM(commission_value), 0)::numeric, 2) AS valor
        FROM commissions
        GROUP BY level
        ORDER BY level ASC
        """,
    )

    last_30 = session.execute(
        text(
            "SELECT COALESCE(SUM(amount),0) FROM subscriptions WHERE created_at >= :cut"
        ),
        {"cut": (datetime.utcnow() - timedelta(days=30)).isoformat()},
    ).fetchone()

    dashboard = {
        "generated_at": datetime.utcnow().isoformat(),
        "total_affiliates": total_affiliates,
        "commissions": commissions,
        "mrr_last_30_days": float(last_30[0] if last_30 else 0.0),
        "tree": _build_tree(session),
        "principios": cfg.get("principios", []),
    }
    _persist_dashboard(dashboard)

    return emit_humanized(
        "ALIANCIA",
        f"{total_affiliates} afiliados ativos e dashboard salvo em {DASHBOARD_FILE.name}",
    )
