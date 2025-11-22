import os
from fastapi import APIRouter, Request, HTTPException

router = APIRouter()

VERIFY_TOKEN = os.getenv("WABA_VERIFY_TOKEN", "EXTRAORDINARIA_VERIFIED")
WABA_TOKEN = os.getenv("WABA_TOKEN")

@router.get("/webhook")
async def verify(mode: str = None, challenge: str = None, token: str = None):
    if mode == "subscribe" and token == VERIFY_TOKEN:
        return int(challenge)
    raise HTTPException(status_code=403, detail="Unauthorized")

@router.post("/webhook")
async def webhook_handler(request: Request):
    data = await request.json()
    try:
        entry = data["entry"][0]["changes"][0]["value"]

        if "messages" in entry:
            message = entry["messages"][0]
            phone = message["from"]
            msg_text = message.get("text", {}).get("body", "")

            # Aqui chamamos o AGENTE GPT
            response = process_message(phone, msg_text)
            return {"status": "sent", "response": response}

    except Exception as e:
        return {"error": str(e)}

    return {"status": "ignored"}

# Lógica principal do WhatsApp Bot
from .whatsapp_ai import ask_gpt
from .whatsapp import send_whatsapp  # envia mensagens

def process_message(phone, msg_text):
    # 1. Responde via IA
    resposta = ask_gpt(msg_text)
    # 2. Envia pelo WhatsApp oficial
    send_whatsapp(phone, resposta)
    return resposta
