#!/bin/bash
# Backup automático do storage
DATA=$(date +%Y-%m-%d_%H-%M-%S)
SRC="/media/luduranoficiall/LINUX MINT/TRABALHOS DA EXTRAORDINARIA.AI/AGENTE GPT/storage"
DEST="/media/luduranoficiall/LINUX MINT/TRABALHOS DA EXTRAORDINARIA.AI/AGENTE GPT/backups/storage_$DATA"
mkdir -p "$DEST"
cp -r "$SRC"/* "$DEST"/
echo "Backup do storage realizado em $DEST"