import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function detectarIntencao(texto) {
  const r = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `\nVocê é um classificador de intenções.\n\nIntenções possíveis:\n- saudacao\n- interesse\n- duvida\n- reclamacao\n- elogio\n- humano\n- economia\n- aliancia\n- cadastro\n- financeiro\n- irritado\n- urgente\n- adeus\n`
        },
        { role: "user", content: texto }
      ]
    },
    {
      headers: { Authorization: `Bearer ${process.env.OPENAI_KEY}` }
    }
  );
  return r.data.choices[0].message.content.trim();
}
