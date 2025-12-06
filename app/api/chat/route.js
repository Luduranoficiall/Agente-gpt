/**
 * 🔐 API Route: Chat com IA
 * Motor Híbrido: Ollama (local) + Gemini 1.5 Flash (cloud)
 * Endpoint seguro - chave NUNCA exposta ao cliente
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

// ============================================
// CONFIGURAÇÃO DOS MODELOS
// ============================================
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://127.0.0.1:11434/api/generate';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'gemma:2b';
const OLLAMA_TIMEOUT = 6000; // 6 segundos

// Personalidade do Agente
const SYSTEM_PROMPT = `Você é o Agente GPT Master Premium, um assistente de IA sofisticado e profissional.
Características:
- Respostas claras, objetivas e bem estruturadas
- Tom profissional mas amigável
- Expertise em negócios, tecnologia e produtividade
- Sempre oferece soluções práticas
- Usa emojis com moderação para tornar a comunicação mais leve
- Responde em português brasileiro`;

// ============================================
// OLLAMA (IA LOCAL)
// ============================================
async function tryOllama(message) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), OLLAMA_TIMEOUT);
    
    const response = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt: `${SYSTEM_PROMPT}\n\nUsuário: ${message}\n\nAssistente:`,
        stream: false
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      const data = await response.json();
      if (data?.response) {
        console.log('✅ Resposta via Ollama (local)');
        return data.response;
      }
    }
  } catch (err) {
    // Ollama não disponível, vai para Gemini
    console.log('ℹ️ Ollama indisponível, usando Gemini Cloud');
  }
  return null;
}

// ============================================
// GEMINI 1.5 FLASH (CLOUD)
// ============================================
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY não configurada');
  }
  
  if (!apiKey.startsWith('AIzaSy')) {
    throw new Error('GEMINI_API_KEY com formato inválido');
  }
  
  return new GoogleGenerativeAI(apiKey);
}

async function tryGemini(message, history = []) {
  const genAI = getGeminiClient();
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
    }
  });
  
  const chat = model.startChat({
    history: [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
      { role: 'model', parts: [{ text: 'Entendido! Sou o Agente GPT Master Premium, pronto para ajudar com excelência. 🚀' }] },
      ...history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }))
    ]
  });
  
  const result = await chat.sendMessage(message);
  console.log('✅ Resposta via Gemini 1.5 Flash (cloud)');
  return result.response.text();
}

// ============================================
// API ROUTE - POST /api/chat
// ============================================
export async function POST(request) {
  try {
    const { message, history = [] } = await request.json();
    
    if (!message || typeof message !== 'string') {
      return Response.json(
        { error: 'Mensagem inválida' },
        { status: 400 }
      );
    }
    
    // Limite de tamanho para segurança
    if (message.length > 10000) {
      return Response.json(
        { error: 'Mensagem muito longa' },
        { status: 400 }
      );
    }
    
    // MOTOR HÍBRIDO: Tenta Ollama primeiro, depois Gemini
    let response = await tryOllama(message);
    
    if (!response) {
      response = await tryGemini(message, history);
    }
    
    return Response.json({ 
      response,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Erro na API de chat:', error.message);
    
    // Nunca expõe detalhes internos ao cliente
    const isConfigError = error.message.includes('GEMINI_API_KEY');
    
    return Response.json(
      { 
        error: isConfigError 
          ? 'Serviço temporariamente indisponível' 
          : 'Erro ao processar sua mensagem',
        code: isConfigError ? 'CONFIG_ERROR' : 'PROCESSING_ERROR'
      },
      { status: isConfigError ? 503 : 500 }
    );
  }
}

// ============================================
// API ROUTE - GET /api/chat (Health Check)
// ============================================
export async function GET() {
  const hasGeminiKey = !!process.env.GEMINI_API_KEY;
  const ollamaConfigured = !!process.env.OLLAMA_URL;
  
  return Response.json({
    status: hasGeminiKey ? 'ready' : 'configuration_required',
    service: 'Agente GPT Master Premium',
    version: '7.0',
    engines: {
      ollama: {
        enabled: ollamaConfigured,
        model: OLLAMA_MODEL,
        priority: 1,
        description: 'IA Local (mais rápido)'
      },
      gemini: {
        enabled: hasGeminiKey,
        model: 'gemini-1.5-flash',
        priority: 2,
        description: 'IA Cloud (fallback)'
      }
    }
  });
}
