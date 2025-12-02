# 📘 DOCUMENTAÇÃO OFICIAL — AGENTE GPT MASTER OURO

**Desenvolvido por:** [www.luduranoficiall.com](http://www.luduranoficiall.com)  
**Plataforma da:** EXTRAORDINÁRI.A · ALIANCI.A  
**Tecnologia:** IA Híbrida (Node.js + Ollama + Gemini 1.5 Flash + Next.js)

---

## 🧠 1. VISÃO GERAL DO PROJETO

O **Agente GPT Master Ouro** é uma plataforma completa de Inteligência Artificial Comercial, construída para empreendedores, empresas e membros da ALIANCIA.

O sistema opera como um SaaS completo, possuindo:

*   Backend Node.js
*   Frontend Next.js
*   IA híbrida (Ollama local + Gemini Cloud)
*   Painel administrativo
*   Painel do cliente
*   Sistema de assinatura
*   Pagamentos via PIX com QRCode
*   Webhook automático de confirmação
*   Logs, telemetria e administração de usuários
*   Página de vendas já pronta
*   Pronto para deploy no Vercel

Este agente foi projetado para ser:

*   ✔ Rápido
*   ✔ Estável
*   ✔ Escalável
*   ✔ Lucrativo
*   ✔ Simples de vender
*   ✔ Profissional e elegante

---

## 🔧 2. TECNOLOGIAS UTILIZADAS

### Backend (Node.js)
*   Express.js
*   JWT Authentication
*   Mercado Pago (PIX)
*   Axios
*   Postgres (Vercel Database)
*   Ollama Local API
*   Gemini 1.5 Flash
*   QRCODE Generator

### Frontend (Next.js 14)
*   React Server Components
*   Chakra-like UI simples (CSS próprio)
*   Painel Admin
*   Painel Cliente
*   Página de vendas

### Infraestrutura
*   Deploy na Vercel
*   Banco de dados Vercel Postgres
*   Webhook PIX (https)
*   IA híbrida como fallback inteligente

---

## 🏛 3. ARQUITETURA DO PROJETO

```text
Agente-gpt/
│
├── package.json
├── vercel.json
├── next.config.js
├── .env (local)
│
├── src/                ← BACKEND COMPLETO
│   ├── app.js
│   ├── server.js
│   ├── db/
│   ├── routes/
│   ├── controllers/
│   ├── middlewares/
│   ├── services/
│   └── utils/
│
├── app/                ← FRONTEND COMPLETO (Next.js)
│   ├── page.jsx
│   ├── login/
│   ├── register/
│   ├── cliente/
│   ├── admin/
│   ├── vendas/
│   └── chat/
│
└── public/
```

---

## 🔐 4. SISTEMA DE AUTENTICAÇÃO

O sistema usa **JWT (JSON Web Tokens)** com:

*   Registro de cliente
*   Login
*   Autenticação por token
*   Middleware de autorização
*   Sessões com expiração
*   Controle de acesso (admin / cliente)

**Fluxo padrão:**
1.  Usuário cria conta
2.  Faz login e recebe token
3.  Token identifica permissões
4.  Cliente acessa painel ou chat
5.  Admin acessa dashboards

---

## 💳 5. PAGAMENTOS (PIX + QRCODE)

O sistema usa **Mercado Pago** para gerar:

*   QRCode em base64
*   Código copiar/colar
*   Registro da cobrança
*   Webhook automático para aprovação

**Após aprovado:**
👉 A conta do cliente passa de **pendente → ativa**  
👉 O cliente passa a acessar o agente

---

## 🧠 6. INTELIGÊNCIA ARTIFICIAL HÍBRIDA

A IA usa dois motores:

### 🔹 1º Motor (Preferencial) — OLLAMA LOCAL
**Modelo:** Gemma:2B (leve, rápido, não trava sua máquina)  
**Chamadas a:** `http://127.0.0.1:11434/api/generate`

**Vantagens:**
*   Zero custo
*   Autonomia
*   Respostas rápidas
*   Rodando na sua máquina ou servidor dedicado

### 🔹 2º Motor (Fallback) — GEMINI 1.5 FLASH
Chamadas oficiais Google Generative Language API.

**Usado quando:**
*   Ollama está desligado
*   Computador está lento
*   Precisa resposta mais completa
*   Usuário está no Vercel

**Resultado:** O sistema nunca falha. Sempre responde.

---

## ✨ 7. PERSONALIDADE DO AGENTE

**Nome:** Agente GPT Master Ouro  
**Estilo:**
*   Profissional
*   Claro
*   Direto
*   Inspirador
*   Didático
*   Comercial quando necessário
*   Foco em transformação do usuário

**Ele sempre responde seguindo:**
1.  Abertura forte
2.  Explicação objetiva
3.  Passo a passo claro
4.  Conclusão premium

---

## 📊 8. PAINEL ADMINISTRATIVO

**Funções:**
*   Listar usuários
*   Listar agentes
*   Listar logs
*   Visualizar conversas
*   Filtrar planos ativos/pendentes
*   Painéis com gráficos (modelo básico incluso)

**Dashboard inclui:**
*   Número de usuários ativos
*   Volume de mensagens
*   Monitoramento de crescimento
*   Status de assinaturas

---

## 👤 9. PAINEL DO CLIENTE

**O cliente vê:**
*   Nome
*   Status da assinatura
*   Plano
*   Botão “Gerar PIX”
*   QRCode da cobrança
*   Botão “Acessar meu agente”

**Quando ativo:**
👉 Ele acessa o chat profissional do agente.

---

## 💬 10. CHAT DO AGENTE

**O chat:**
*   Guarda histórico
*   Envia para IA híbrida
*   Registra logs no banco
*   Retorna no estilo MASTER OURO

---

## 💰 11. PÁGINA DE VENDAS PROFISSIONAL

**Inclui:**
*   Headline forte
*   Copywriting comercial
*   Explicação do agente
*   Planos (197 / 297)
*   CTA direto para cadastro

---

## 🗄 12. BANCO DE DADOS — ESTRUTURA

### Tabela users
*   id
*   nome
*   email
*   senha hash
*   plano
*   ativo (bool)
*   admin (bool)

### Tabela pagamentos
*   id
*   user_id
*   valor
*   metodo
*   status
*   referencia

### Tabela logs
*   id
*   user_id
*   mensagem
*   resposta
*   data

---

## 💻 13. COMO RODAR LOCALMENTE

1.  **Clone o repositório**
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Configure o arquivo `.env`** (use o `.env.example` como base)
4.  **Inicie o ambiente de desenvolvimento:**
    ```bash
    npm run dev
    ```
    Isso iniciará tanto o Frontend (Next.js na porta 3000) quanto o Backend (Express na porta 8000) simultaneamente.

## 🚀 14. COMO SUBIR NO VERCEL

1.  **Push para o GitHub:**
    O projeto está configurado para deploy automático. Basta fazer um push para a branch `main`.
    ```bash
    git push origin main
    ```

2.  **Configuração na Vercel:**
    *   Importe o projeto do GitHub.
    *   **Framework Preset:** Next.js
    *   **Root Directory:** `./` (Raiz)
    *   **Environment Variables:** Adicione as variáveis do seu `.env` (DATABASE_URL, JWT_SECRET, etc).

3.  **Banco de Dados:**
    *   Crie um banco Postgres na aba "Storage" da Vercel.
    *   Conecte ao projeto.
    *   Execute o script `database/schema.sql` no "Query Runner" do banco para criar as tabelas.

**Tudo vai subir automaticamente:**
*   Backend (Serverless Functions)
*   Frontend (Next.js App Router)
*   API Integrada
*   Painel Admin & Cliente
*   Página de Vendas

---

## 🔥 15. COMO VENDER O AGENTE

**Você pode vender:**
*   Para membros ALIANCI.A por **R$ 197**
*   Para clientes externos por **R$ 297**
*   Com reativação mensal
*   Com ganhos automáticos via ALIANCIA

---

## 📌 15. LICENÇA E DIREITOS

Este software é:
*   ✔ de propriedade da **EXTRAORDINÁRI.A / ALIANCI.A**
*   ✔ desenvolvido por **www.luduranoficiall.com**
*   ✔ licenciado como SaaS de uso comercial

---

## 🏆 16. CONCLUSÃO

Esta documentação descreve todo o ecossistema do **Agente GPT Master Ouro**:
*   Como funciona
*   Como vende
*   Como escala
*   Como faturar com ele
*   Como manter no ar
*   Como administrar clientes

**Você agora tem um produto REAL, profissional, escalável, pronto para monetizar.**
