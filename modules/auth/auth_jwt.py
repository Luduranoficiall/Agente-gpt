import datetime
import os

import jwt
from fastapi import HTTPException

SECRET = os.getenv("JWT_SECRET", "EXTRAORDINARIA_SECRET_2025")


def gerar_token(empresa_id: str):
    payload = {
        "empresa_id": empresa_id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=90),
    }
    return jwt.encode(payload, SECRET, algorithm="HS256")


def validar_token(token: str):
    try:
        data = jwt.decode(token, SECRET, algorithms=["HS256"])
        return data["empresa_id"]
    except Exception:
        raise HTTPException(
            status_code=401, detail="token inválido ou expirado")
