# 💬 Templates Oficiais WhatsApp (HSM)

## Template 1 — Boas-vindas (UTILITY)
- Nome: registrado_boas_vindas
- Categoria: Utility
- Linguagem: pt_BR
- Texto:
  > Oi {{1}}! Seja bem-vindo(a) à EXTRAORDINÁRI.A 💙  
  > Sou a REGI.A e estou aqui para facilitar sua jornada.  
  > Quer ver o menu agora?
- Variáveis:
  - {{1}} — nome do usuário

## Template 2 — Follow-up de apresentação (MARKETING)
- Nome: convite_apresentacao
- Texto:
  > Olá {{1}}! Hoje às 19h45 teremos uma apresentação especial da ALIANCI.A.  
  > Posso te enviar o link para participar?

## Template 3 — ECONOMI.A ativação
- Nome: economia_ativacao
- Texto:
  > Oi {{1}}! Seu acesso à ECONOMI.A está pronto.  
  > Quer receber agora o passo a passo para economizar nos seus próximos gastos?

---

# 🔁 Fluxos Automáticos de Contato

## Fluxo 1 – Novo membro ALIANCI.A
- Entrou → REGI.A envia template de boas-vindas
- 30 minutos depois → convite para apresentação
- 24 horas depois → mensagem de ativação ECONOMI.A
- 72 horas depois → follow-up de participação

## Fluxo 2 – Lead que pediu informações
- REGI.A responde
- 90 minutos depois → template com CTA
- 24 horas depois → lembrete suave
- 7 dias depois → “você ainda deseja participar?”

## Fluxo 3 – Fluxo de cadastro incompleto
- REGI.A pede nome
- Se não responder → template pedindo finalização
- Se responder → REGI.A coleta email
- REGI.A confirma cadastro

---

# ⚙️ Envio de Template via API

```bash
curl -X POST "https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages" \
-H "Authorization: Bearer $WHATSAPP_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "messaging_product": "whatsapp",
  "to": "55XXXXXXXXX",
  "type": "template",
  "template": {
    "name": "registrado_boas_vindas",
    "language": { "code": "pt_BR" },
    "components": [{
      "type": "body",
      "parameters": [{ "type": "text", "text": "Humberto" }]
    }]
  }
}'
```
