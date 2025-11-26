import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function responderIA(texto, numero) {
  try {
    const resposta = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content: `\nVocê é o AGENTE EXTRAORDINÁRIA.AI.\nSeu estilo é:\n- extremamente humano\n- simpático\n- organizado\n- educado\n- direto ao ponto\n- rápido na resposta\n- resolve coisas difíceis de forma simples\n- 100% focado em ajudar o usuário\n- nunca inventa informação\n- nunca promete ganhos financeiros\n\nSempre responda no máximo 3 parágrafos curtos.\n`
          },
          {
            role: "user",
            content: texto
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    return resposta.data.choices[0].message.content;
  } catch (e) {
    console.log(e?.response?.data);
    return "Estou com uma instabilidade agora, pode me repetir a mensagem?";
  }
}
