from starlette.middleware.base import BaseHTTPMiddleware
from core.logger import logger

class MonitorMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        logger.info({
            "path": request.url.path,
            "method": request.method,
            "status": response.status_code
        })
        return response
