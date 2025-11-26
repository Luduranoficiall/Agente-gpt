import os
import requests

def send_facebook(page_id: str, message: str):
    token = os.getenv("FB_PAGE_TOKEN")
    if not token:
        return {"error": "FB_PAGE_TOKEN não configurado."}

    url = f"https://graph.facebook.com/v18.0/{page_id}/messages"

    payload = {
        "recipient": {"id": page_id},
        "message": {"text": message}
    }

    headers = {"Authorization": f"Bearer {token}"}

    r = requests.post(url, json=payload, headers=headers)
    return r.json()
