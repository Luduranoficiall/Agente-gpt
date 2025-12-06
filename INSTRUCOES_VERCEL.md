# 🚀 INSTRUÇÕES COMPLETAS - VERCEL + DOMÍNIO

## Olá Luduran! Siga estes passos quando parar:

---

# PARTE 1: CONFIGURAR CHAVE API (2 min)

## Passo 1.1: Acessar Vercel
```
https://vercel.com/dashboard
```
Faça login com sua conta.

## Passo 1.2: Ir nas configurações do projeto
1. Clique no projeto **agente-gpt**
2. Clique em **Settings** (ícone ⚙️ no topo)
3. No menu lateral, clique em **Environment Variables**

## Passo 1.3: Adicionar a chave Gemini

Clique em **Add New** e preencha:

| Campo | Valor |
|-------|-------|
| **Key** | `GEMINI_API_KEY` |
| **Value** | `AIzaSyClE_Mib9QWWhJUGN0wso7IPzYXhsogTBk` |

✅ Marque: **Production**, **Preview**, **Development**

Clique em **Save**

## Passo 1.4: Fazer Redeploy
1. Clique em **Deployments** (menu do topo)
2. No deploy mais recente, clique nos **⋯** (3 pontinhos)
3. Clique em **Redeploy**
4. Clique em **Redeploy** novamente para confirmar

⏳ Aguarde ~1 minuto para o deploy completar.

---

# PARTE 2: VERIFICAR/CONFIGURAR DOMÍNIO (3 min)

## Seu domínio atual:
```
https://agente-gpt-oficial.vercel.app ✅ Funcionando!
```

## Para adicionar domínio personalizado (ex: agentegpt.com.br):

### Passo 2.1: Ir nas configurações de domínio
1. No projeto, clique em **Settings**
2. Clique em **Domains** no menu lateral

### Passo 2.2: Adicionar seu domínio
1. Digite seu domínio (ex: `agentegpt.com.br`)
2. Clique em **Add**

### Passo 2.3: Configurar DNS
A Vercel vai mostrar registros DNS para configurar:

**Se seu domínio está no Registro.br:**
1. Acesse https://registro.br
2. Vá em Meus Domínios → seu domínio → DNS
3. Adicione os registros que a Vercel mostrar

**Registros típicos:**
| Tipo | Nome | Valor |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

### Passo 2.4: Aguardar propagação
⏳ DNS pode levar até 24h para propagar (geralmente 5-30 min)

---

# PARTE 3: TESTAR TUDO (1 min)

## Acesse seu site:
```
https://agente-gpt-oficial.vercel.app
```

## Teste o chat:
1. Digite uma mensagem qualquer
2. Veja se a IA responde (Gemini 1.5 Flash)

## Se funcionar: 🎉 PRONTO PARA VENDER!

---

# ❓ PROBLEMAS COMUNS

## "API não responde"
→ Verifique se a chave foi salva corretamente
→ Faça redeploy novamente

## "Domínio não funciona"
→ Aguarde propagação do DNS (até 24h)
→ Verifique registros no Registro.br

## "Erro 500"
→ Verifique logs em Vercel → Deployments → Functions

---

# 📋 RESUMO RÁPIDO

| Tarefa | Tempo |
|--------|-------|
| 1. Adicionar `GEMINI_API_KEY` no Vercel | 1 min |
| 2. Fazer Redeploy | 1 min |
| 3. Testar chat | 1 min |
| 4. Configurar domínio (opcional) | 5 min |

**Total: ~5 minutos e seu agente está no ar!**

---

**Criado em:** 6 de dezembro de 2025
**Por:** GitHub Copilot 🤖
