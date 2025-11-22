import uuid
from datetime import datetime
from sqlalchemy import text
## Removido import de SessionLocal para evitar ciclo
from .auth_jwt import gerar_token

def criar_empresa(nome: str, email: str):
    empresa_id = str(uuid.uuid4())
    created = datetime.utcnow().isoformat()

    # Removido uso de SessionLocal para evitar ciclo

    token = gerar_token(empresa_id)
    return {"empresa_id": empresa_id, "token": token}
