import requests
import os

from ai import gerar_resposta
from fastapi import FastAPI, Request
from memory import salvar_mensagem
from nlu import detectar_intencao

app = FastAPI()

VERIFY_TOKEN = os.getenv("VERIFY_TOKEN")


@app.get("/")
def home():
    return {"status": "Agente Extraordinaria.AI rodando!"}


@app.get("/webhook")
def verificar_webhook(mode: str = None, token: str = None, challenge: str = None):
    if mode == "subscribe" and token == VERIFY_TOKEN:
        return int(challenge)
    return "Erro de autorização"


@app.post("/webhook")
async def receber(request: Request):
    data = await request.json()

    try:
        msg = data["entry"][0]["changes"][0]["value"]["messages"][0]
        telefone = msg["from"]
        texto = msg["text"]["body"]
    except:
        return {"status": "OK"}

    intencao = await detectar_intencao(texto)

    respostas = {
        "saudacao": "Olá! Como posso ajudar hoje? 😊",
        "humano": "Claro! Vou te conectar a um humano agora mesmo.",
        "economia": "A ECONOMI.A te ajuda a economizar inteligentemente! Quer ver como funciona?",
        "aliancia": "A ALIANCI.A é nossa comunidade premium! Quer saber como entrar?",
        "reclamacao": "Sinto muito por isso. Me conta o que houve e eu resolvo agora!",
        "irritado": "Entendi! Vou tratar isso como prioridade máxima! ⚡",
        "adeus": "Até logo! 😊",
    }

    resposta = respostas.get(intencao, await gerar_resposta(texto))

    salvar_mensagem(telefone, texto, resposta)

    await enviar_msg(telefone, resposta)

    return {"status": "SUCESSO"}


async def enviar_msg(to, texto):
    url = f"https://graph.facebook.com/v18.0/{os.getenv('PHONE_NUMBER_ID')}/messages"

    requests.post(
        url,
        json={
            "messaging_product": "whatsapp",
            "to": to,
            "type": "text",
            "text": {"body": texto},
        },
        headers={
            "Authorization": f"Bearer {os.getenv('WHATSAPP_TOKEN')}",
            "Content-Type": "application/json",
        },
    )
