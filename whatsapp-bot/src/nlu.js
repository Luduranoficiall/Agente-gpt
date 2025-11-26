const has = (txt, arr) => arr.some(k => txt.includes(k));

export function detectIntent(textRaw) {
  const text = (textRaw || '').trim().toLowerCase();

  if (!text) return 'empty';
  if (has(text, ['menu', 'opções', 'opcoes'])) return 'menu';
  if (has(text, ['humano', 'atendente', 'pessoa', 'suporte'])) return 'handoff';
  if (has(text, ['cadastro', 'perfil'])) return 'cadastro';
  if (has(text, ['faq', 'duvida', 'dúvida', 'perguntas'])) return 'faq';
  if (has(text, ['economia', 'cashback', 'desconto', 'descontos'])) return 'economia';

  // palavras de onboarding
  if (has(text, ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite'])) return 'saudacao';

  // se nada bater, cai em IA (se habilitada) ou fallback
  return 'free_text';
}
