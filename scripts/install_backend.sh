#!/bin/bash
echo "🚀 Instalando BACKEND agente.gpt..."
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r backend/requirements.txt
echo "✔ Backend instalado com sucesso!"
