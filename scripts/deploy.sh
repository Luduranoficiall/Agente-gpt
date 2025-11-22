#!/bin/bash
# Deploy automatizado do agente GPT
cd /media/luduranoficiall/LINUX MINT/TRABALHOS DA EXTRAORDINARIA.AI/AGENTE GPT
git pull
sudo docker compose down
sudo docker compose up -d --build
echo "Deploy realizado com sucesso!"