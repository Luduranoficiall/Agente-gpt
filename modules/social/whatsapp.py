import os

import requests


def send_whatsapp(phone: str, message: str):
    """
    Envia mensagens via WhatsApp Business API (Meta Cloud).
    """
    token = os.getenv("WABA_TOKEN")
    phone_number_id = os.getenv("WABA_PHONE_ID")
    if not token or not phone_number_id:
        return {"error": "WABA_TOKEN ou WABA_PHONE_ID não configurados."}

    url = f"https://graph.facebook.com/v18.0/{phone_number_id}/messages"

    payload = {
        "messaging_product": "whatsapp",
        "to": phone,
        "type": "text",
        "text": {"body": message},
    }

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }

    r = requests.post(url, json=payload, headers=headers)
    return r.json()
