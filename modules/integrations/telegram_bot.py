# ============================================================
# BOT TELEGRAM — Agente GPT com menus e IA
# ============================================================

import os

import requests

TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")


def telegram_send(chat_id, text):
    url = f"https://api.telegram.org/bot{TOKEN}/sendMessage"
    return requests.post(url, json={"chat_id": chat_id, "text": text}).json()


def telegram_set_webhook(url):
    r = requests.get(
        f"https://api.telegram.org/bot{TOKEN}/setWebhook?url={url}")
    return r.json()


def handle_telegram_update(update: dict):
    chat_id = update["message"]["chat"]["id"]
    text = update["message"]["text"].lower()

    if text == "/start":
        return telegram_send(
            chat_id,
            "🔥 Bem-vindo ao Agente GPT!\n"
            "Digite:\n"
            "• afiliados\n• economi.a\n• auriar\n• social",
        )

    if text == "afiliados":
        return telegram_send(chat_id, "Gerenciar afiliados e comissões.")

    if text == "economi.a":
        return telegram_send(chat_id, "Integração com cashback e descontos.")

    if text == "auriar":
        return telegram_send(chat_id, "Analisando com as 12 peneiras…")

    if text == "social":
        return telegram_send(chat_id, "Envie: /enviar canal número mensagem")

    return telegram_send(chat_id, "Não entendi, tente outra palavra.")
