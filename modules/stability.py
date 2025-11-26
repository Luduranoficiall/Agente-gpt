# ============================================================
# MELHORIAS DE ESTABILIDADE — AGENTE GPT
# ============================================================

import time
import random

# Tratamento de exceções

def safe_run(fn, *args, **kwargs):
    try:
        return fn(*args, **kwargs)
    except Exception as e:
        return {"erro": str(e)}

# Retry automático

def retry(fn, retries=3, delay=1):
    for i in range(retries):
        try:
            return fn()
        except Exception:
            time.sleep(delay)
    return {"erro": "Falha após retries"}

# Circuit breaker (stub)
circuit_breaker_state = "closed"
def circuit_breaker():
    global circuit_breaker_state
    if random.random() < 0.1:
        circuit_breaker_state = "open"
    return circuit_breaker_state
