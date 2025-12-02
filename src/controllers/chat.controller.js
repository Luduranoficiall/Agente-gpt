import { askHybrid } from "../services/ai.engine.js";
import { db } from "../db/index.js";
import { PERSONALIDADE_MASTER } from "../utils/formatter.js";

export const chatController = async (req, res) => {
  try {
    const { prompt, agent_id = 1 } = req.body;

    const finalPrompt = `${PERSONALIDADE_MASTER}\n\nPergunta: ${prompt}`;
    const resposta = await askHybrid(finalPrompt);

    await db.query(
      "INSERT INTO logs(agent_id, usuario, mensagem, resposta) VALUES ($1, $2, $3, $4)",
      [agent_id, req.user.email, prompt, resposta]
    );

    res.json({ resposta });
  } catch (err) {
    res.status(500).json({ error: "Erro interno" });
  }
};
