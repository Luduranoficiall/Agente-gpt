# 🤖 REGI.A – Chatbot Oficial da EXTRAORDINÁRI.A / ALIANCI.A / ECONOMI.A

> Versão: 1.0  
> Data: Novembro/2025  
> Stack: Node.js + Express + WhatsApp Cloud API + IA (OpenAI opcional)

A **REGI.A** é a assistente virtual oficial da EXTRAORDINÁRI.A, desenhada para ser:

- Altamente **humanizada** (tom de voz próximo, caloroso e direto)
- **Rápida** de manter e evoluir
- Integrada à **API oficial do WhatsApp (Cloud API)**  
- Capaz de fazer:
  - Onboarding de novos membros
  - Atendimentos e dúvidas frequentes (FAQ)
  - Explicação e ativação de benefícios da **ECONOMI.A**
  - Coleta de dados (nome, e-mail, cidade, etc.)
  - Handoff suave para humanos (time de atendimento)
  - Respostas com **IA generativa** (opcional)

---

## 📂 1. Estrutura do Projeto

Estrutura sugerida de pastas:

```bash
regia-bot/
  ├─ package.json
  ├─ server.js
  ├─ .env.example
  └─ src/
       ├─ router.js
       ├─ whatsapp.js
       ├─ templates.js
       ├─ nlu.js
       ├─ sessionStore.js
       └─ ai.js
```

### 1.1 Principais arquivos

**server.js**
Sobe o servidor Express, aplica rate-limit no webhook e registra as rotas.

**src/router.js**
Coração do bot: recebe eventos do WhatsApp, interpreta mensagens, consulta NLU, session, templates e decide o fluxo (menu, FAQ, ECONOMI.A, cadastro, IA, handoff…).

**src/whatsapp.js**
Funções utilitárias para enviar mensagens via WhatsApp Cloud API: texto, listas, botões, templates.

**src/templates.js**
Biblioteca de textos humanizados (saudações, menus, mensagens de erro, tom de voz padrão da REGI.A).

**src/nlu.js**
“Cérebro simples” que transforma texto do usuário em intenções (menu, faq, economia, cadastro, handoff, etc).

**src/sessionStore.js**
Armazena o contexto/sessão do usuário (etapas, perfil, estado de handoff), hoje em memória. Em produção, o ideal é usar Redis/DB.

---

## ⚙️ 2. Instalação e Configuração
### 2.1 Requisitos
- Node.js 18+
- Conta Meta/WhatsApp Cloud API configurada
- (Opcional) Conta OpenAI para IA

### 2.2 Instalação
```bash
git clone https://seu-repo.git regia-bot
cd regia-bot
npm install
cp .env.example .env
```

### 2.3 Variáveis de Ambiente
Edite o arquivo .env:
```
PORT=3000                         # Porta HTTP
VERIFY_TOKEN=regia_verify_token   # Usado na verificação com a Meta
WHATSAPP_TOKEN=SEU_TOKEN_OFICIAL  # Token de acesso da WhatsApp Cloud API
PHONE_NUMBER_ID=SEU_PHONE_NUMBER_ID   # ID do número do WhatsApp Cloud

# IA (opcional)
OPENAI_API_KEY=sua_key
OPENAI_MODEL=gpt-4o-mini
```
Importante: nunca commitar o .env em repositório público.

### 2.4 Subindo o servidor (dev)
```bash
npm run dev
# ou
node server.js
```

---

## 🌐 3. Configuração do Webhook (WhatsApp Cloud API)
No painel Meta Developers → WhatsApp:
- Vá em Configuration
- Em Webhook URL, coloque: https://SEUDOMINIO.com/webhook
- Em Verify Token, coloque exatamente o valor de VERIFY_TOKEN do .env.
- Selecione os eventos: messages, message_status, message_template_status_update (opcional)
- Salve e teste a verificação (GET /webhook).

---

## 🔁 4. Fluxo de Conversa (Lógica do Bot)
### 4.1 Visão geral
```
flowchart TD
    A[Usuário envia mensagem] --> B[Webhook /webhook (router.js)]
    B --> C[Carrega/Cria sessão (sessionStore)]
    C --> D[Detecta intenção (nlu.js)]
    D -->|menu| E[Envia lista interativa]
    D -->|faq| F[FAQ básico + opções]
    D -->|economia| G[Fluxo ECONOMI.A.]
    D -->|cadastro| H[Coleta nome/e-mail]
    D -->|handoff| I[Inicia handoff humano]
    D -->|free_text| J[IA (OpenAI) ou fallback humanizado]
    H --> C
    G --> C
    J --> C
```

### 4.2 Intenções suportadas
O arquivo src/nlu.js mapeia texto → intenção:

| Intenção    | Palavras-chave / situação | Ação principal |
|-------------|--------------------------|----------------|
| menu        | "menu", "opções", "opcao" | Envia lista interativa com seções |
| faq         | "faq", "dúvida", "duvida", "perguntas" | Envia FAQ rápido |
| economia    | "economia", "cashback", "desconto", "descontos" | Explica ECONOMI.A. e pergunta se quer passo a passo |
| cadastro    | "cadastro", "perfil" | Fluxo de coleta de nome e email |
| handoff     | "humano", "atendente", "pessoa", "suporte" | Inicia transferência para humano |
| saudacao    | "oi", "olá", "ola", "bom dia", "boa tarde", etc | Saudação humanizada + sugestão de menu |
| free_text   | qualquer outra mensagem | IA (se habilitada) ou fallback empático |

### 4.3 Estados de sessão
Estrutura da sessão (ver sessionStore.js):
```js
{
  stage: "onboarding" | "menu" | "faq" | "handoff" |
         "collect_name" | "collect_email" | "economia" | "ai",
  profile: {
    nome: "string",
    email: "string",
    // pode crescer: cidade, cargo, etc.
  },
  lastIntent: "string",
  human: {
    active: boolean,
    notes: "resumo do problema para o humano"
  }
}
```
A cada mensagem do usuário, o bot:
- Recupera a sessão (getSession(phone)).
- Atualiza stage, profile, lastIntent conforme o fluxo.
- Responde com o texto/estrutura apropriados.
- (Opcional) Gera resumo para time humano em caso de handoff.

---

## 📡 5. Referência de API Interna
### 5.1 GET /webhook
Usado apenas pela Meta para verificação de webhook.
Query params esperados: hub.mode, hub.verify_token, hub.challenge
Se o verify_token
---

## 💬 8. Humanização (Templates)
Exemplo do tom adotado (src/templates.js):
```js
greeting: (firstName) =>
  `Oi${firstName ? `, ${firstName}` : ''}! Eu sou a *REGI.A.*, ` +
  `assistente da EXTRAORDINÁRI.A. 💙\n\n` +
  `Tô aqui pra facilitar sua vida. ` +
  `Escreva *menu* ou me diga o que você precisa.`,

fallbackEmpathy:
  'Quero muito te ajudar, mas entendi só parcialmente. ' +
  'Pode resumir em 1 frase? Ou se preferir te conecto com um humano.',
```

---

## 📡 9. Endpoints Disponíveis
- POST /webhook — Recebe eventos do WhatsApp
- GET /webhook — Verificação (Verify Token)

---

## 🧠 10. Modo IA (opcional)
- Integrado via OpenAI
- Modelo padrão: gpt-4o-mini
- IA só responde quando texto livre não bate com nenhuma intenção

---

## 🔒 11. Segurança
- Rate limit de 100 req/min por IP
- Sanitização de entrada
- Controle de sessão
- Tokens somente em .env
- HTTPS obrigatório
- Em produção: NGINX, Redis, Firewall L7 (Cloudflare)

---

## 🚀 12. Deploy
- Local: `npm run dev`
- Produção: `pm2 start server.js --name regia-bot`
- Docker:
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
```

---

## 📈 13. Roadmap de Evolução
| Prioridade | Funcionalidade                        | Status    |
|------------|---------------------------------------|-----------|
| Alta       | Integração ECONOMI.A. (saldo, QR)     | pendente  |
| Alta       | Handoff humano com painel interno     | pendente  |
| Média      | Modo vendedor para parceiros          | pendente  |
| Média      | Treinamento automático via IA         | pendente  |
| Baixa      | Dashboard KPI (retenção/conversão)    | pendente  |

---

## 🧪 14. Testes e QA
- Enviar “oi”
- Enviar “menu”
- Enviar “faq”
- Enviar “economia”
- Enviar “humano”
- Enviar e-mail inválido
- Interações rápidas (<1s)

---

## 👥 15. Créditos
Projeto criado para EXTRAORDINÁRI.A. / ALIANCI.A. / ECONOMI.A.
Arquitetura, design e engenharia de IA: ChatGPT (BotGPT)
Humanização: estilo exclusivo REGI.A.
