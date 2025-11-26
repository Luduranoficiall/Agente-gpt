import requests
import os
from datetime import datetime

# ============================
# CONFIGURAÇÕES
# ============================
ASAAS_KEY = os.getenv("ASAAS_KEY")
ASAAS_URL = "https://www.asaas.com/api/v3"

MP_TOKEN = os.getenv("MERCADOPAGO_TOKEN")
MP_URL = "https://api.mercadopago.com/v1/payments"

STRIPE_SECRET = os.getenv("STRIPE_SECRET")
STRIPE_URL = "https://api.stripe.com/v1/payment_links"

# ============================
# GERAR COBRANÇA VIA PIX
# ============================
def gerar_pix(nome: str, valor: float, email: str):
    if not ASAAS_KEY:
        return {"erro": "ASAAS_KEY não configurada."}

    payload = {
        "name": nome,
        "email": email
    }

    h = {"access_token": ASAAS_KEY}

    # 1) Criar cliente
    c = requests.post(f"{ASAAS_URL}/customers", json=payload, headers=h).json()
    cliente_id = c["id"]

    # 2) Criar cobrança PIX
    cobranca = requests.post(f"{ASAAS_URL}/payments", json={
        "customer": cliente_id,
        "billingType": "PIX",
        "value": valor,
        "dueDate": datetime.utcnow().strftime("%Y-%m-%d")
    }, headers=h).json()

    return cobranca

# ============================
# GERAR COBRANÇA CARTÃO (Stripe)
# ============================
def gerar_cartao(valor: float, descricao: str):
    if not STRIPE_SECRET:
        return {"erro": "STRIPE_SECRET não configurada."}

    data = {
        "line_items[0][price_data][currency]": "brl",
        "line_items[0][price_data][product_data][name]": descricao,
        "line_items[0][price_data][unit_amount]": int(valor * 100),
        "line_items[0][quantity]": 1
    }

    r = requests.post(
        STRIPE_URL,
        data=data,
        auth=(STRIPE_SECRET, "")
    )

    return r.json()
