import os

import requests


def send_instagram(user_id: str, message: str):
    token = os.getenv("IG_TOKEN")
    if not token:
        return {"error": "IG_TOKEN não configurado."}

    url = f"https://graph.facebook.com/v18.0/{user_id}/messages"

    payload = {"recipient": {"id": user_id}, "message": {"text": message}}

    headers = {"Authorization": f"Bearer {token}"}

    r = requests.post(url, json=payload, headers=headers)
    return r.json()
