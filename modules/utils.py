import logging

logger = logging.getLogger("AgenteGPT")


def emit_humanized(status: str, message: str):
    """Retorna uma resposta no padrão humanizado e registra em log."""
    logger.info(f"[{status}] {message}")
    return {"status": status, "message": message}
