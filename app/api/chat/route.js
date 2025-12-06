/**
 * 🔐 API Route: Chat com IA
 * Endpoint seguro que nunca expõe a chave API ao cliente
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

// Validação de chave no lado do servidor (NUNCA exposta ao cliente)
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
    
    // Contexto do sistema - personalidade Master Premium
    const systemPrompt = `Você é o Agente GPT Master Premium, um assistente de IA sofisticado e profissional.
Características:
- Respostas claras, objetivas e bem estruturadas
- Tom profissional mas amigável
- Expertise em negócios, tecnologia e produtividade
- Sempre oferece soluções práticas
- Usa emojis com moderação para tornar a comunicação mais leve
- Responde em português brasileiro`;

    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'model', parts: [{ text: 'Entendido! Sou o Agente GPT Master Premium, pronto para ajudar com excelência. 🚀' }] },
        ...history.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }))
      ]
    });
    
    const result = await chat.sendMessage(message);
    const response = result.response.text();
    
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

export async function GET() {
  // Health check - nunca expõe informações sensíveis
  const hasKey = !!process.env.GEMINI_API_KEY;
  
  return Response.json({
    status: hasKey ? 'ready' : 'configuration_required',
    service: 'Agente GPT Master Premium',
    version: '6.0'
  });
}
