
from .auriar import run_auditoria
from .utils import emit_humanized

def deploy_end_to_end(session, cfg):
    audit = run_auditoria(session, cfg)
    return emit_humanized("MENTORI.A", f"Mentoria criada com base no diagnóstico: {audit}")
