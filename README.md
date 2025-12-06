# 🤖 Agente GPT Master Ouro

**Assistente de IA Premium** desenvolvido por [Lucas Duran](https://www.luduranoficiall.com)

[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://agente-gpt-oficial.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![Gemini](https://img.shields.io/badge/Gemini-1.5_Flash-blue?logo=google)](https://ai.google.dev)

---

## 🚀 Demo

**[agente-gpt-oficial.vercel.app](https://agente-gpt-oficial.vercel.app)**

---

## ✨ Features

- 🎨 **Design Premium** - Interface estilo ChatGPT/Claude
- 🤖 **Motor Híbrido** - Ollama (local) + Gemini Cloud
- ⚡ **Performance** - Next.js 14 com otimizações
- 📱 **Responsivo** - Funciona em qualquer dispositivo
- 🔒 **Seguro** - Chaves API protegidas no servidor

---

## 🛠️ Instalação

```bash
# Clone o repositório
git clone https://github.com/Luduranoficiall/Agente-gpt.git
cd Agente-gpt

# Instale as dependências
npm install

# Configure o ambiente
cp .env.example .env
# Edite .env e adicione sua GEMINI_API_KEY

# Inicie em desenvolvimento
npm run dev
```

---

## ⚙️ Configuração

Crie um arquivo `.env` com:

```env
GEMINI_API_KEY=sua_chave_aqui
```

Obtenha sua chave em: [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

---

## 📁 Estrutura

```
├── app/
│   ├── api/chat/       # API de chat (Gemini)
│   ├── page.jsx        # Página principal
│   └── globals.css     # Estilos
├── public/             # Arquivos estáticos
└── package.json
```

---

## 🚀 Deploy na Vercel

1. Faça fork deste repositório
2. Importe no [Vercel](https://vercel.com)
3. Adicione `GEMINI_API_KEY` nas Environment Variables
4. Deploy!

---

## 👤 Autor

**Lucas Duran**
- 🌐 [luduranoficiall.com](https://www.luduranoficiall.com)
- 📧 [GitHub](https://github.com/Luduranoficiall)
- 💼 [LinkedIn](https://linkedin.com/in/luduranoficiall)

---

## 📄 Licença

MIT © 2025 Lucas Duran
