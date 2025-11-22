# ============================================================
# SISTEMA DE TOKENS PROFISSIONAL — AGENTE GPT
# ============================================================

import os
import time
import jwt
from fastapi import HTTPException

TOKEN_SECRET = os.getenv("AGENT_PUBLIC_SECRET", "EXTRAORDINARIA_PUBLIC_KEY")
ALGORITHM = "HS256"

# -----------------------------
# Criar token público por cliente
# -----------------------------
def create_client_token(client_id: str, tenant: str = "default"):
    payload = {
        "client_id": client_id,
        "tenant": tenant,
        "iat": int(time.time()),
        "exp": int(time.time()) + 60 * 60 * 24 * 365,   # 1 ano
    }
    return jwt.encode(payload, TOKEN_SECRET, algorithm=ALGORITHM)

# -----------------------------
# Validar token
# -----------------------------
def validate_client_token(token: str):
    try:
        decoded = jwt.decode(token, TOKEN_SECRET, algorithms=[ALGORITHM])
        return decoded
    except jwt.ExpiredSignatureError:
        raise HTTPException(401, "Token expirado")
    except Exception:
        raise HTTPException(401, "Token inválido ou malformado")
