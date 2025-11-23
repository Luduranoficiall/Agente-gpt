import json
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List

from agent_runtime import text

from .auriar import run_auditoria
from .core import score_12_peneiras
from .utils import emit_humanized

STORAGE = Path(__file__).resolve().parents[1] / "storage"


def _priority_list(config: Dict[str, Any]) -> List[str]:
    priorities = config.get("prioridades_maximas") or []
    if isinstance(priorities, dict):
        return [priorities[key] for key in sorted(priorities.keys())]
    return list(priorities)


def _persist_plan(session, plan: Dict[str, Any]):
    STORAGE.mkdir(exist_ok=True)
    path = STORAGE / "mentori_a_plan.json"
    payload = {**plan, "saved_at": datetime.utcnow().isoformat()}
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=False))
    session.execute(
        text("INSERT INTO kv (k,v) VALUES (:k,:v) ON CONFLICT (k) DO UPDATE SET v=:v"),
        {"k": "mentori_a:last_plan", "v": json.dumps(
            payload, ensure_ascii=False)},
    )
    session.commit()


def deploy_end_to_end(session, config: Dict[str, Any]):
    """Executa diagnóstico, gera plano PREDITIVI.A e agenda acompanhamentos."""
    audit = run_auditoria(session, config)
    filtros = score_12_peneiras(config)
    priorities = _priority_list(config)[:3]
    passos_rotina = ((config.get("rotina") or {}).get("passos") or [])[:5]
    plan = {
        "diagnostico": audit["message"],
        "pilares": [
            {"nome": nome, "score": score, "nota": nota}
            for nome, score, nota in filtros
        ],
        "acoes_prioritarias": priorities,
        "rotina_prox_passos": passos_rotina,
    }
    _persist_plan(session, plan)
    return emit_humanized(
        "MENTORI.A",
        f"Plano contínuo gerado com {len(priorities)} prioridades e 12 pilares avaliados.",
    )
