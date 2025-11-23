# ============================================================
# PIX — Gerar QR CODE, Webhook e Confirmar Pagamento
# ============================================================

import os

import requests

PIX_KEY = os.getenv("PIX_KEY")
PIX_CLIENT_ID = os.getenv("PIX_CLIENT_ID")
PIX_CLIENT_SECRET = os.getenv("PIX_CLIENT_SECRET")
PIX_WEBHOOK_URL = os.getenv("PIX_WEBHOOK_URL")


def generate_pix(amount: float, txid: str):
    url = "https://api-pix.yourbank.com/v2/cob"
    payload = {
        "calendario": {"expiracao": 3600},
        "valor": {"original": f"{amount:.2f}"},
        "chave": PIX_KEY,
        "solicitacaoPagador": "Pagamento ALIANCI.A",
        "txid": txid,
    }
    r = requests.put(
        url + f"/{txid}", json=payload, auth=(PIX_CLIENT_ID, PIX_CLIENT_SECRET)
    )
    return r.json()


def handle_pix_webhook(data: dict):
    return {"status": "ok", "mensagem": "Pagamento PIX recebido", "dados": data}
