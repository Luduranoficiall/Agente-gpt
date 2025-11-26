import uuid
from datetime import datetime
from sqlalchemy import text
from agent_gpt import SessionLocal
from .auth_jwt import gerar_token

def criar_empresa(nome: str, email: str):
    empresa_id = str(uuid.uuid4())
    created = datetime.utcnow().isoformat()

    with SessionLocal() as s:
        s.execute(text("""
            INSERT INTO tenants (id, nome, email, created_at)
            VALUES (:id, :n, :e, :c)
        """), {"id": empresa_id, "n": nome, "e": email, "c": created})
        s.commit()

    token = gerar_token(empresa_id)
    return {"empresa_id": empresa_id, "token": token}
