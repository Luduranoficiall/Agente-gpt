import requests
import os
import base64

OPENAI_KEY = os.getenv("OPENAI_KEY")

def audio_to_text(file_bytes: bytes):
    url = "https://api.openai.com/v1/audio/transcriptions"

    files = {
        "file": ("audio.ogg", file_bytes, "audio/ogg"),
        "model": (None, "gpt-4o-mini-tts"),
    }

    h = {"Authorization": f"Bearer {OPENAI_KEY}"}

    r = requests.post(url, files=files, headers=h)
    return r.json()["text"]

def text_to_audio(text: str):
    url = "https://api.openai.com/v1/audio/speech"

    payload = {
        "model": "gpt-4o-mini-tts",
        "input": text,
        "voice": "alloy"
    }

    h = {"Authorization": f"Bearer {OPENAI_KEY}"}

    r = requests.post(url, json=payload, headers=h)

    audio = base64.b64encode(r.content).decode()
    return audio
