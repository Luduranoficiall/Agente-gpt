from fastapi import APIRouter, Request
from services.ai_service import AIService
from services.whatsapp_cloud import wa_cloud
from core.config import settings

router = APIRouter()
ai = AIService()

@router.get("/webhook")
def verify(mode, challenge, token):
    if token == settings.VERIFY_TOKEN:
        return int(challenge)
    return "Token inválido"

@router.post("/webhook")
async def receive(request: Request):
    body = await request.json()
    try:
        entry = body["entry"][0]["changes"][0]["value"]
        msgs = entry.get("messages")
        if msgs:
            msg = msgs[0]
            sender = msg["from"]
            text = msg["text"]["body"]
            resp = ai.chat_whatsapp(sender, text)
            wa_cloud.send_message(sender, resp)
    except Exception as e:
        print("Erro:", e)
    return "ok"
