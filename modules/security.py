# ============================================================
# MELHORIAS DE SEGURANÇA — AGENTE GPT
# ============================================================

import time

from fastapi import HTTPException

# Rate-limit simples
rate_limit_store = {}


def rate_limit(client_id, max_calls=100, window=60):
    now = int(time.time())
    window_start = now - window
    calls = [t for t in rate_limit_store.get(
        client_id, []) if t > window_start]
    if len(calls) >= max_calls:
        raise HTTPException(429, "Limite de chamadas atingido")
    calls.append(now)
    rate_limit_store[client_id] = calls


# Registro de chamadas
call_log = []


def log_call(client_id, endpoint):
    call_log.append(
        {"client_id": client_id, "endpoint": endpoint, "ts": time.time()})


# Permissões por tenant
permissions = {"default": ["read", "write"]}


def check_permission(tenant, action):
    if action not in permissions.get(tenant, []):
        raise HTTPException(403, "Permissão negada")
