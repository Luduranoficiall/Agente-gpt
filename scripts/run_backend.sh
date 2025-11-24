#!/bin/bash
echo "🚀 Iniciando BACKEND agente.gpt..."
source venv/bin/activate
uvicorn backend.main:app --host 0.0.0.0 --port 8080
