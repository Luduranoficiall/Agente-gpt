#!/bin/bash

cloudflared tunnel create agente

TUNNEL_ID=$(cloudflared tunnel list | grep agente | awk '{print $1}')

mkdir -p ~/.cloudflared

cat > ~/.cloudflared/agente.yml <<EOF
tunnel: $TUNNEL_ID
credentials-file: /root/.cloudflared/$TUNNEL_ID.json

ingress:
  - hostname: agente.extraordinaria.ai
    service: http://localhost:4000
  - service: http_status:404
EOF

cloudflared tunnel route dns agente agente.extraordinaria.ai

cloudflared tunnel run agente
