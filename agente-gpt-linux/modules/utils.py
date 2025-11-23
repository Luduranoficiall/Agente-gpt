import logging

logger = logging.getLogger("AgenteGPT")


def emit_humanized(area, msg):
    logger.info(f"[{area}] {msg}")
    return {"area": area, "mensagem": msg}
