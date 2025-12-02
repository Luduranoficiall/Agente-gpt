import { db } from "../db/index.js";

export const pixWebhook = async (req, res) => {
  try {
    const { data } = req.body;

    const referencia = data.id;

    const { rows } = await db.query(
      "UPDATE pagamentos SET status='aprovado' WHERE referencia=$1 RETURNING user_id",
      [referencia]
    );

    if (!rows.length) return res.sendStatus(200);

    const user_id = rows[0].user_id;

    await db.query("UPDATE users SET plano='197', ativo=true WHERE id=$1", [user_id]);

    res.sendStatus(200);

  } catch (err) {
    res.sendStatus(500);
  }
};