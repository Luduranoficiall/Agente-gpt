import os
import requests

def send_telegram(chat_id: str, message: str):
    token = os.getenv("TELEGRAM_BOT_TOKEN")
    if not token:
        return {"error": "TELEGRAM_BOT_TOKEN não configurado."}

    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = {"chat_id": chat_id, "text": message}

    r = requests.post(url, json=payload)
    return r.json()
