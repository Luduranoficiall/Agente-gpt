# 🔐 Guia de Segurança - Agente GPT Master Premium

## Configuração de Variáveis de Ambiente

### ⚠️ NUNCA faça commit de chaves reais no repositório!

### Desenvolvimento Local
1. Copie `.env.example` para `.env`
2. Adicione suas chaves no `.env` local
3. O arquivo `.env` está no `.gitignore` e não será enviado ao GitHub

### Produção (Vercel)
Configure as variáveis no [Vercel Dashboard](https://vercel.com):
1. Acesse seu projeto → Settings → Environment Variables
2. Adicione cada variável necessária:

| Variável | Descrição | Obrigatória |
|----------|-----------|-------------|
| `GEMINI_API_KEY` | Chave da API Gemini (Google AI Studio) | ✅ Sim |
| `JWT_SECRET` | Segredo para tokens JWT (mínimo 32 caracteres) | ✅ Sim |
| `POSTGRES_URL` | URL de conexão PostgreSQL | Opcional |
| `MP_ACCESS_TOKEN` | Token Mercado Pago (produção) | Para pagamentos |

### Onde Obter as Chaves

- **Gemini API Key**: [Google AI Studio](https://aistudio.google.com/app/apikey)
- **Mercado Pago**: [Developers MP](https://www.mercadopago.com.br/developers/panel/credentials)

---

## Boas Práticas de Segurança

### ✅ O que FAZER:
- Usar variáveis de ambiente (`process.env.VARIAVEL`)
- Rotacionar chaves periodicamente
- Manter repositório PRIVADO
- Usar chaves diferentes para dev/produção

### ❌ O que NÃO FAZER:
- Hardcodar chaves no código
- Commitar arquivos `.env`
- Compartilhar chaves em chats/emails
- Usar mesma chave em dev e produção

---

## Em Caso de Vazamento

Se uma chave for exposta:
1. **REVOGUE IMEDIATAMENTE** no painel do serviço
2. Crie uma nova chave
3. Atualize no Vercel Dashboard
4. Verifique logs de uso suspeito

---

## Arquivos Protegidos pelo .gitignore

```
.env
.env.local
.env.production
credentials/
*.sqlite3
```

Última atualização: Dezembro 2025
