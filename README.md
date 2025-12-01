# 🚀 Agente Premium Master Ouro (ATUALIZADO)

> **DOCUMENTAÇÃO OFICIAL VERCEL - VERSÃO 2.0**
> *Última atualização: 01/12/2025*

Sistema FULL STACK unificado (Next.js + Node.js/Express) pronto para Vercel.

## Tecnologias

- **Frontend:** Next.js 14 (App Router), TailwindCSS, React
- **Backend:** Node.js / Express (Integrado via `vercel.json`)
- **Banco de Dados:** PostgreSQL
- **IA:** OpenAI GPT-4o-mini

## Estrutura do Projeto

O projeto foi unificado para facilitar o deploy:

- `/app` - Páginas e rotas do Next.js
- `/components` - Componentes React
- `/public` - Arquivos estáticos
- `server.js` - Backend Express (API)
- `vercel.json` - Configuração de roteamento Vercel

## Configuração de Ambiente (.env)

Crie um arquivo `.env` na raiz com as seguintes variáveis:

```env
DATABASE_URL=postgres://usuario:senha@host:porta/banco
OPENAI_KEY=sk-...
```

## Deploy (Vercel)

Este projeto está 100% configurado para a Vercel.

1. Importe o repositório na Vercel.
2. O framework **Next.js** será detectado automaticamente.
3. Configure as variáveis de ambiente.
4. Clique em **Deploy**.

## Endpoints da API

- `/api/chat` - Chat com IA
- `/webhook` - Integração WhatsApp
