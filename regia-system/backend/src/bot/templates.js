export const copy = {
  greeting: (name) =>
    `Oi${name ? `, ${name}` : ""}! Eu sou a *REGI.A* 💙\n` +
    `Sou a assistente oficial da EXTRAORDINÁRI.A.\n\n` +
    `Estou aqui pra facilitar sua vida.\n` +
    `Digite *menu* para começar.`,

  menuHeader: "Menu Principal",
  menuBody: "Escolha como posso te ajudar:",
  menuSections: [
    {
      title: "Atendimento",
      rows: [
        { id: "faq", title: "❓ Dúvidas Frequentes" },
        { id: "economia", title: "💰 ECONOMI.A" },
        { id: "cadastro", title: "📝 Completar Cadastro" },
        { id: "humano", title: "👤 Falar com Humano" },
      ],
    },
  ],

  faqGreeting: "Claro! Aqui vão respostas rápidas:",
  faqList:
    "1️⃣ O que é a ALIANCI.A?\n" +
    "2️⃣ Como funciona a ECONOMI.A?\n" +
    "3️⃣ Como participar dos eventos?\n" +
    "\nMe diga sua dúvida com suas palavras.",

  economiaIntro:
    "A *ECONOMI.A* é seu sistema de descontos reais + cashback.\n" +
    "Quer receber o passo a passo oficial? (responda *sim*)",

  askName: "Perfeito! Como posso te chamar?",
  askEmail: "E qual seu melhor e-mail? (não enviamos spam)",
  emailInvalid: "Esse e-mail não parece correto. Pode tentar novamente?",
  profileOk: "Cadastro atualizado com sucesso! 🙌",

  handoffStart:
    "Certo! Vou te conectar com uma pessoa da equipe EXTRAORDINÁRI.A.\n" +
    "Mas antes, me diga rapidamente qual é sua necessidade.",

  handoffConfirm:
    "Anotado! Já encaminhei para o time. Em instantes alguém fala com você. 💙",

  fallback:
    "Não entendi totalmente. Pode reformular? Ou digite *menu* para opções.",
};
