/**
 * 🤖 AI Engine - Agente GPT Master Premium
 * Motor de IA híbrido com proteção de chaves
 */

import axios from "axios";
import { maskApiKey, validateKeyFormat } from "../lib/crypto.js";

// Cache seguro da chave (em memória, nunca em logs)
let _secureKeyCache = null;

/**
 * Obtém a chave API de forma segura
 * Nunca loga a chave completa
 */
function getSecureApiKey() {
  if (_secureKeyCache) return _secureKeyCache;
  
  const key = process.env.GEMINI_API_KEY;
  
  if (!key) {
    console.error("❌ GEMINI_API_KEY não configurada!");
    return null;
  }
  
  if (!validateKeyFormat(key)) {
    console.error("❌ GEMINI_API_KEY com formato inválido!");
    return null;
  }
  
  // Log seguro - mostra apenas versão mascarada
  console.log(`✅ Gemini API configurada: ${maskApiKey(key)}`);
  
  _secureKeyCache = key;
  return key;
}

/**
 * Motor híbrido: tenta Ollama local, fallback para Gemini Cloud
 */
export const askHybrid = async prompt => {
  // Tenta IA local primeiro (Ollama)
  try {
    const r1 = await axios.post(
      process.env.OLLAMA_URL,
      { model: process.env.OLLAMA_MODEL, prompt, stream: false },
      { timeout: 6000 }
    );
    if (r1.data?.response) return r1.data.response;
  } catch {
    // Ollama indisponível, usa cloud
  }

  // Fallback para Gemini Cloud
  try {
    const apiKey = getSecureApiKey();
    if (!apiKey) {
      return "⚠️ Configuração de IA pendente. Contate o administrador.";
    }
    
    const payload = { contents: [{ parts: [{ text: prompt }] }] };
    const r2 = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      payload,
      { 
        timeout: 30000,
        headers: { 'Content-Type': 'application/json' }
      }
    );
    return r2.data.candidates?.[0]?.content?.parts?.[0]?.text;
  } catch (error) {
    // Log seguro - nunca expõe a chave
    console.error("❌ Erro Gemini:", error.message);
    return "Não consegui responder agora. Tente novamente.";
  }
};

/**
 * Verifica status da configuração de IA
 */
export const checkAIStatus = () => {
  const geminiKey = process.env.GEMINI_API_KEY;
  const ollamaUrl = process.env.OLLAMA_URL;
  
  return {
    gemini: {
      configured: !!geminiKey && validateKeyFormat(geminiKey),
      masked: maskApiKey(geminiKey || '')
    },
    ollama: {
      configured: !!ollamaUrl,
      url: ollamaUrl ? ollamaUrl.replace(/\/api.*/, '/...') : null
    }
  };
};

export default { askHybrid, checkAIStatus };
