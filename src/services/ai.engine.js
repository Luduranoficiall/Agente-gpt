import axios from "axios";

/**
 * IA híbrida: escolhe automaticamente entre Gemini 1.5 Flash e Ollama (gemma:2b)
 * para cada prompt, de acordo com o contexto e tipo de pergunta.
 * Gemini: melhor para perguntas abertas, criatividade, contexto longo.
 * Ollama: melhor para respostas rápidas, instruções diretas, baixo custo.
 */
export const askHybrid = async prompt => {
  // Heurística simples: se prompt for muito longo ou pedir criatividade, prioriza Gemini
  const isLong = prompt.length > 400;
  const isCreative = /escreva|crie|imagine|história|roteiro|poema|criativo|resuma|resumo|analise|analise/i.test(prompt);

  // 1) Gemini 1.5 Flash
  if (isLong || isCreative) {
    try {
      const payload = { contents: [{ parts: [{ text: prompt }] }] };
      const r2 = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        payload,
        { timeout: 8000 }
      );
      const resposta = r2.data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (resposta) return resposta;
    } catch (e) {
      // fallback para Ollama
    }
  }

  // 2) Ollama (gemma:2b)
  try {
    const r1 = await axios.post(
      process.env.OLLAMA_URL,
      { model: process.env.OLLAMA_MODEL, prompt, stream: false },
      { timeout: 8000 }
    );
    if (r1.data?.response) return r1.data.response;
  } catch {}

  // fallback final: Gemini
  try {
    const payload = { contents: [{ parts: [{ text: prompt }] }] };
    const r2 = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      payload,
      { timeout: 8000 }
    );
    return r2.data.candidates?.[0]?.content?.parts?.[0]?.text || "Não consegui responder agora.";
  } catch {}

  return "Não consegui responder agora.";
};
