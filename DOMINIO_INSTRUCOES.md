# 🚀 Instruções de Domínio e Deploy (Vercel)

## 1. Deploy na Vercel

Este projeto foi modernizado para rodar 100% na infraestrutura da Vercel.

1. Acesse [vercel.com](https://vercel.com).
2. Clique em **Add New > Project**.
3. Importe o repositório `Agente-gpt`.
4. O framework **Next.js** será detectado automaticamente.
5. Clique em **Deploy**.

## 2. Configuração de Domínio

Após o deploy ficar verde (Sucesso):

1. Vá na aba **Settings > Domains**.
2. Digite seu domínio (ex: `agente-gpt.com.br`).
3. Siga as instruções de DNS (CNAME/A Record) que a Vercel mostrar.

## 3. Variáveis de Ambiente

Não esqueça de configurar em **Settings > Environment Variables**:

- `DATABASE_URL`: Sua conexão PostgreSQL.
- `OPENAI_KEY`: Sua chave da API OpenAI.
