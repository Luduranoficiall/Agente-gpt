export const copy = {
  greeting: (firstName) =>
    `Oi${firstName ? `, ${firstName}` : ''}! Eu sou a *REGI.A.* (assistente da EXTRAORDINÁRI.A.). ` +
    `Tô aqui pra te ajudar de forma rápida e humana. 💙\n\n` +
    `Posso te apresentar o menu, responder dúvidas, te gerar benefícios na *ECONOMI.A.* ` +
    `ou te conectar com uma pessoa do time.\n\n` +
    `👉 Pra começar, escreva *menu* ou diga com suas palavras o que você precisa.`,

  menuFooter:
    'Dica: você pode escrever livremente (ex.: "quero descontos", "falar com humano", "minhas vantagens").',

  menuSections: [
    {
      title: 'Como posso te ajudar hoje?',
      rows: [
        { id: 'faq', title: 'Dúvidas rápidas (FAQ)', description: 'Pagamentos, acesso, benefícios, etc.' },
        { id: 'economia', title: 'ECONOMI.A.', description: 'Descontos, cashback e como aproveitar' },
        { id: 'cadastro', title: 'Completar meu cadastro', description: 'Deixa tudo redondinho pra te atender melhor' },
        { id: 'humano', title: 'Falar com uma pessoa', description: 'Te conecto com um atendente agora' }
      ]
    }
  ],

  askName: 'Perfeito! Pra eu personalizar sua experiência, como posso te chamar?',
  askEmail: 'Show! Qual é o seu e-mail principal? (prometo não encher sua caixa 😅)',
  thanksProfile:
    'Obrigado! Perfil atualizado ✅\n\nSe quiser, mande *menu* a qualquer momento.',

  handoffStart:
    'Entendido! Vou te conectar com alguém do time agora. ⏳\n' +
    'Enquanto isso, pode me dizer rapidamente *sobre o que é* sua necessidade? Vou repassar como resumo.',

  handoffConfirm:
    'Anotado! Um humano vai assumir a conversa. Se preferir encerrar o handoff, digite *bot*.',

  faqIntro:
    'Escolha uma dúvida comum ou escreva o que precisa, do seu jeito:',
  faqList: [
    ['O que é a ALIANCI.A.?', 'A ALIANCI.A. é um movimento de network, IA, ECONOMI.A. e prosperidade.'],
    ['Como ganho com a ECONOMI.A.?', 'Indicando, consumindo com inteligência e aproveitando descontos/cashback.'],
    ['Quais dias de apresentação?', 'Terças, 19h45, BeCooper – Sala Colmeia (SJC).']
  ],

  fallbackEmpathy:
    'Quero muito te ajudar e entendi *parcialmente* o que você disse. ' +
    'Você pode reformular em 1 frase? (Se preferir, digite *humano* que eu te conecto.)'
};
