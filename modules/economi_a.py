import json
import os
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List

from .utils import emit_humanized

STORAGE = Path(__file__).resolve().parents[1] / "storage"
STORAGE.mkdir(exist_ok=True)

CONNECTORS = [
    {
        "name": "Supermercados",
        "env": "ECONOMIA_SUPERMARKET_API_KEY",
        "categoria": "supermercados",
    },
    {
        "name": "Postos de combustível",
        "env": "ECONOMIA_GAS_API_KEY",
        "categoria": "postos",
    },
    {"name": "Farmácias", "env": "ECONOMIA_PHARMA_API_KEY", "categoria": "farmacias"},
]


def _map_connectors() -> List[Dict[str, Any]]:
    mapped = []
    for item in CONNECTORS:
        token = os.getenv(item["env"])
        status = "operacional" if token else "pendente_credencial"
        mapped.append(
            {
                "fonte": item["name"],
                "categoria": item["categoria"],
                "variavel": item["env"],
                "status": status,
                "observacao": (
                    "Token válido" if token else "Informe o token/API key no .env"
                ),
            }
        )
    return mapped


def _persist_status(payload: Dict[str, Any]):
    path = STORAGE / "economi_a_status.json"
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=False))


def _top_priorities(config: Dict[str, Any]) -> List[str]:
    raw = config.get("prioridades_maximas") or []
    if isinstance(raw, dict):
        ordered = [raw[key] for key in sorted(raw.keys())]
    else:
        ordered = list(raw)
    return ordered[:3]


def integrate_cashback_apis(session, config: Dict[str, Any]):
    """Mapeia conectores de cashback e gera snapshot operacional."""
    connectors = _map_connectors()
    pronto = sum(1 for c in connectors if c["status"] == "operacional")
    payload = {
        "at": datetime.utcnow().isoformat(),
        "connectores": connectors,
        "prioridades": _top_priorities(config),
    }
    _persist_status(payload)
    return emit_humanized(
        "ECONOMI.A",
        f"{pronto}/{len(connectors)} conectores com credenciais prontas para cashback/NFC-e.",
    )
