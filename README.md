# Agente GPT – EXTRAORDINARIA.AI

Agente profissional, multi-plataforma, pronto para produção.

## Como rodar

1. Configure as variáveis de ambiente obrigatórias no Fly.io:
   - `DATABASE_URL`
   - `PIX_CHAVE`
   - `WHATSAPP_EMPRESA`
2. Deploy automático via Fly.io:
   - `flyctl deploy -a agente-gpt --remote-only`
3. Acesse: https://agente-gpt.fly.dev/

## Estrutura Essencial
- `agent_gpt.py` (backend FastAPI principal)
- `requirements.txt` (dependências)
- `Dockerfile`, `fly.toml` (deploy)
- `agente_gpt_mobile/` (Flutter)
- `agente_gpt_desktop/` (Electron)

---

Pronto para clientes e produção!
