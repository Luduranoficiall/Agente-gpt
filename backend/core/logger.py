import logging
import json
from core.config import settings

class JSONFormatter(logging.Formatter):
    def format(self, record):
        obj = {
            "level": record.levelname,
            "message": record.getMessage(),
            "time": self.formatTime(record),
        }
        return json.dumps(obj)

logger = logging.getLogger("agente_ultra")
logger.setLevel(settings.LOG_LEVEL)

handler = logging.StreamHandler()
handler.setFormatter(JSONFormatter())
logger.addHandler(handler)
