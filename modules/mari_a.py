import json
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List

from agent_runtime import text

from .utils import emit_humanized

STORAGE = Path(__file__).resolve().parents[1] / "storage"


def _priority_list(config: Dict[str, Any]) -> List[str]:
    priorities = config.get("prioridades_maximas") or []
    if isinstance(priorities, dict):
        return [priorities[key] for key in sorted(priorities.keys())]
    return list(priorities)


def _execution_channels(config: Dict[str, Any]) -> List[str]:
    ambiente = config.get("ambiente") or {}
    execucao = ambiente.get("execução") or ambiente.get("execucao") or []
    return list(execucao)


def _build_campaign_payload(
    priorities: List[str], channels: List[str]
) -> List[Dict[str, Any]]:
    base_channels = (
        channels[:4] if channels else [
            "WhatsApp", "Telegram", "Instagram", "LinkedIn"]
    )
    campaigns = []
    for idx, prioridade in enumerate(priorities[:3], 1):
        title = f"Campanha {idx}: {prioridade.split(' — ')[0]}"
        campaigns.append(
            {
                "title": title,
                "description": prioridade,
                "channels": base_channels,
                "status": "queued",
            }
        )
    return campaigns


def _persist_campaigns_file(campaigns: List[Dict[str, Any]]):
    STORAGE.mkdir(exist_ok=True)
    path = STORAGE / "mari_a_campaigns.json"
    path.write_text(
        json.dumps(
            {"campaigns": campaigns, "at": datetime.utcnow().isoformat()},
            indent=2,
            ensure_ascii=False,
        )
    )


def _upsert_business_demand(session, camp: Dict[str, Any]):
    existing = session.execute(
        text("SELECT id FROM business_demands WHERE title=:title"),
        {"title": camp["title"]},
    ).fetchone()
    if existing:
        return False
    session.execute(
        text(
            """
      INSERT INTO business_demands (client_id,title,description,channels,to_map,status,created_at)
      VALUES (:client_id,:title,:description,:channels,:to_map,'queued',:ts)
      """
        ),
        {
            "client_id": "extraordinari.a",
            "title": camp["title"],
            "description": camp["description"],
            "channels": ", ".join(camp["channels"]),
            "to_map": json.dumps({"channels": camp["channels"]}, ensure_ascii=False),
            "ts": datetime.utcnow().isoformat(),
        },
    )
    session.commit()
    return True


def schedule_campaigns(session, config: Dict[str, Any]):
    """Gera plano de campanhas MARI.A e grava demandas multicanais."""
    priorities = _priority_list(config)
    channels = _execution_channels(config)
    campaigns = _build_campaign_payload(priorities, channels)
    created = sum(
        1 for camp in campaigns if _upsert_business_demand(session, camp))
    _persist_campaigns_file(campaigns)
    return emit_humanized(
        "MARI.A",
        f"{created} novas campanhas multicanais prontas no pipeline de demands.",
    )
