# ============================================================
# BOT WHATSAPP — Cloud API com menus e IA
# ============================================================

import os
import requests
from modules.menus import main_menu

TOKEN = os.getenv("WHATSAPP_CLOUD_TOKEN")
PHONE = os.getenv("WHATSAPP_CLOUD_PHONE_NUMBER_ID")

def wa_send(to, text):
    url = f"https://graph.facebook.com/v18.0/{PHONE}/messages"
    headers = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}
    data = {
        "messaging_product": "whatsapp",
        "to": to,
        "type": "text",
        "text": {"body": text}
    }
    return requests.post(url, json=data, headers=headers).json()

def handle_whatsapp_message(data):
    msg = data["entry"][0]["changes"][0]["value"]["messages"][0]
    phone = msg["from"]
    text = msg.get("text", {}).get("body", "").lower()

    if text == "menu":
        menu = "\n".join(main_menu()["opcoes"])
        return wa_send(phone, f"🔥 MENU:\n{menu}")

    if text == "auriar":
        return wa_send(phone, "Rodando 12 peneiras…")

    return wa_send(phone, "Digite 'menu' para começar.")
