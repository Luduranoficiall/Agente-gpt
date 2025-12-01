import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * IA híbrida: escolhe automaticamente entre Gemini 1.5 Flash e Ollama
 * para cada prompt, de acordo com o contexto e tipo de pergunta.
 * Gemini: melhor para perguntas abertas, criatividade, contexto longo.
 * Ollama: melhor para respostas rápidas, instruções diretas, baixo custo (local).
 */
export const askHybrid = async prompt => {
  // Configuração do Gemini
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Heurística simples: se prompt for muito longo ou pedir criatividade, prioriza Gemini
  const isLong = prompt.length > 400;
  const isCreative = /escreva|crie|imagine|história|roteiro|poema|criativo|resuma|resumo|analise|analise/i.test(prompt);

  // 1) Tenta Gemini 1.5 Flash primeiro se for complexo
  if (isLong || isCreative) {
    try {
      const result = await model.generateContent(prompt);
      const { response } = result;
      const text = response.text();
      if (text) return text;
    } catch (e) {
      console.error("Erro no Gemini (tentativa 1), tentando Ollama...", e.message);
      // fallback para Ollama
    }
  }

  // 2) Tenta Ollama (Local)
  try {
    // Verifica se a URL do Ollama está definida, senão usa padrão
    const ollamaUrl = process.env.OLLAMA_URL || "http://localhost:11434/api/generate";
    const ollamaModel = process.env.OLLAMA_MODEL || "gemma:2b";

    const r1 = await axios.post(
      ollamaUrl,
      { model: ollamaModel, prompt, stream: false },
      { timeout: 10000 } // Timeout um pouco maior para garantir
    );
    if (r1.data?.response) return r1.data.response;
  } catch (e) {
    console.error("Erro no Ollama, tentando fallback Gemini...", e.message);
  }

  // 3) Fallback final: Gemini (se Ollama falhar ou se não foi tentado antes)
  try {
    const result = await model.generateContent(prompt);
    const { response } = result;
    const text = response.text();
    return text || "Desculpe, estou processando muitas informações agora. Tente novamente em instantes.";
  } catch (e) {
    console.error("Erro fatal no Gemini (fallback final):", e.message);
    return "Desculpe, nossos sistemas de IA estão sobrecarregados no momento. Por favor, tente novamente.";
  }
};
