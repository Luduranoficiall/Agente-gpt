import os
import requests

def send_twitter(username: str, message: str):
    token = os.getenv("X_BEARER_TOKEN")
    if not token:
        return {"error": "X_BEARER_TOKEN não configurado."}

    url = "https://api.twitter.com/2/tweets"

    payload = {"text": f"@{username} {message}"}

    headers = {"Authorization": f"Bearer {token}"}

    r = requests.post(url, json=payload, headers=headers)
    return r.json()
