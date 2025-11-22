export function detectIntent(txt = "") {
  const t = txt.toLowerCase();

  if (["menu", "opções", "opcoes"].some((x) => t.includes(x))) return "menu";
  if (["faq", "duvida", "dúvida"].some((x) => t.includes(x))) return "faq";
  if (["economia", "cashback", "desconto"].some((x) => t.includes(x)))
    return "economia";
  if (["cadastro", "perfil"].some((x) => t.includes(x))) return "cadastro";
  if (["humano", "pessoa", "atendente", "suporte"].some((x) => t.includes(x)))
    return "handoff";

  return "free";
}
