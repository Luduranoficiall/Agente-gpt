#!/bin/bash
# Backup automático do banco PostgreSQL
DATA=$(date +%Y-%m-%d_%H-%M-%S)
BACKUP_DIR="/media/luduranoficiall/LINUX MINT/TRABALHOS DA EXTRAORDINARIA.AI/AGENTE GPT/backups"
mkdir -p "$BACKUP_DIR"
docker exec agente-gpt-db pg_dump -U postgres agent > "$BACKUP_DIR/agent_backup_$DATA.sql"
echo "Backup realizado em $BACKUP_DIR/agent_backup_$DATA.sql"