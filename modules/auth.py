# ============================================================
# AUTH — JWT com Refresh, RBAC e multi-tenant
# ============================================================

import os
import time
import jwt
from fastapi import HTTPException

JWT_SECRET = os.getenv("JWT_SECRET", "EXTRAORDINARIA_SUPER_KEY")
JWT_REFRESH_SECRET = os.getenv("JWT_REFRESH_SECRET", "REFRESH_KEY")

def create_access_token(user_id: int, role: str, tenant: str):
    payload = {
        "sub": user_id,
        "role": role,
        "tenant": tenant,
        "exp": int(time.time()) + 60 * 60,     # 1 hora
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")

def create_refresh_token(user_id: int):
    payload = {
        "sub": user_id,
        "exp": int(time.time()) + 60 * 60 * 24 * 30  # 30 dias
    }
    return jwt.encode(payload, JWT_REFRESH_SECRET, algorithm="HS256")

def decode_access(token: str):
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
    except Exception:
        raise HTTPException(status_code=401, detail="Token inválido.")

def decode_refresh(token: str):
    try:
        return jwt.decode(token, JWT_REFRESH_SECRET, algorithms=["HS256"])
    except Exception:
        raise HTTPException(status_code=401, detail="Refresh token inválido.")

# RBAC
def allow(roles: list, claim: dict):
    if claim["role"] not in roles:
        raise HTTPException(status_code=403, detail="Acesso negado.")
