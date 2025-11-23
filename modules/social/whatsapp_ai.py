import os

import requests


def ask_gpt(user_message: str):
    """
    resposta humanizada da IA no WhatsApp
    """
    OPENAI_KEY = os.getenv("OPENAI_KEY")
    if not OPENAI_KEY:
        return "❌ Erro: OPENAI_KEY não configurada."

    url = "https://api.openai.com/v1/chat/completions"

    payload = {
        "model": "gpt-4o-mini",
        "messages": [
            {
                "role": "system",
                "content": "Você é o AGENTE GPT — educado, humano, rápido e cordial.",
            },
            {"role": "user", "content": user_message},
        ],
    }

    head = {"Authorization": f"Bearer {OPENAI_KEY}",
            "Content-Type": "application/json"}

    r = requests.post(url, json=payload, headers=head)

    try:
        return r.json()["choices"][0]["message"]["content"]
    except:
        return "Tive um erro momentâneo, pode tentar novamente?"
