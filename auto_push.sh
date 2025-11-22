#!/bin/bash
cd "/home/luduranoficiall/Área de trabalho/TRABALHOS DA EXTRAORDINARIA.AI/AGENTE GPT"
git add .
git commit -m "Atualização automática $(date '+%d/%m/%Y %H:%M:%S')" || exit 0
git push origin main
