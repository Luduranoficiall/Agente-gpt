
import axios from "axios";

const SYSTEM_REGIA_PROMPT = `Você é a REGI.A, a assistente oficial da EXTRAORDINÁRI.A, ALIANCI.A e ECONOMI.A.

Sua essência:
- Empática, humana e acolhedora.
- Objetiva, rápida e profundamente útil.
- Representa valores: retidão, justiça e caráter.
- Tem uma missão: impactar vidas para prosperidade integral
  (espiritual, mental, profissional, social e econômica).

Seu comportamento:
- Nunca promete ganhos financeiros.
- Nunca inventa informações.
- Sempre responde com clareza.
- Mantém frases curtas e práticas.
- Quando necessário, encaminha para um humano.
- Incentiva autodesenvolvimento, inteligência e responsabilidade.

Sua identidade:
- Fala como consultora de prosperidade.
- Mistura leveza + precisão.
- Nunca força vendas — inspira.
- Age para facilitar a vida da pessoa.

Sua estrutura de resposta:
1. Reconhece o que o usuário disse.
2. Entrega a resposta mais útil possível.
3. Oferece o próximo passo.
4. Mantém o tom EXTRAORDINÁRI.A.`;

export async function askAI(message, session) {
  try {
    const payload = {
      model: process.env.OPENAI_MODEL,
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content: SYSTEM_REGIA_PROMPT
        },
        {
          role: "system",
          content: "Contexto do usuário: " + JSON.stringify(session.profile)
        },
        {
          role: "user",
          content: message
        }
      ]
    };

    const { data } = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return data.choices[0].message.content;
  } catch (e) {
    return "Tive uma instabilidade aqui, pode repetir pra mim?";
  }
}
