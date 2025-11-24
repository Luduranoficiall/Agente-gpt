from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from workflows.router import router as chat_router
from workflows.whatsapp_webhook import router as whatsapp_router
from dashboard.router import router as admin_router

app = FastAPI(
    title="AGENTE.GPT – ULTRA ENTERPRISE",
    version="1.0.0"
)

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
