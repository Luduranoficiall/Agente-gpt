# ============================================================
# MELHORIAS DE PERFORMANCE — AGENTE GPT
# ============================================================

import asyncio
import functools
import logging

# Caching de respostas
cache = {}


def cache_response(key, value):
    cache[key] = value
    return value


def get_cached_response(key):
    return cache.get(key)


# Lazy import de módulos


def lazy_import(module_name):
    import importlib

    return importlib.import_module(module_name)


# Logs assíncronos
async def async_log(msg):
    await asyncio.sleep(0)
    logging.info(msg)
