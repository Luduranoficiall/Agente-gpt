
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from workflows.router import router as chat_router
from workflows.whatsapp_webhook import router as whatsapp_router
from dashboard.router import router as admin_router


app = FastAPI(
    title="AGENTE.GPT – ULTRA ENTERPRISE",
    version="1.0.0"
)


# Servir arquivos estáticos do Next.js (.next/static e public)
import os
from fastapi.responses import FileResponse, JSONResponse
static_dir = os.path.join(os.path.dirname(__file__), '../static')
app.mount("/static", StaticFiles(directory=static_dir), name="static")
public_dir = os.path.join(static_dir)
app.mount("/public", StaticFiles(directory=public_dir), name="public")

# Fallback para SPA: serve index.html do frontend para rotas desconhecidas (exceto API)
@app.get("/{full_path:path}")
async def spa_fallback(full_path: str):
    if full_path.startswith("api") or full_path.startswith("docs") or full_path.startswith("redoc") or full_path.startswith("health"):
        return JSONResponse({"detail": "Not Found"}, status_code=404)
    index_path = os.path.join(static_dir, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return JSONResponse({"detail": "index.html não encontrado"}, status_code=500)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(chat_router)
app.include_router(whatsapp_router)
app.include_router(admin_router)

# Rota personalizada para a raiz
from fastapi.responses import RedirectResponse, JSONResponse

@app.get("/")
def root():
    return JSONResponse({
        "message": "Bem-vindo à API AGENTE.GPT! Acesse /docs para a documentação interativa.",
        "docs": "/docs",
        "status": "ok"
    })

@app.get("/health")
def health():
    return {"status": "ok", "ultra": True}
