import mercadopago from "mercadopago";
import QRCode from "qrcode";
import { db } from "../db/index.js";

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN
});

export const gerarPix = async (req, res) => {
  try {
    const { id } = req.user;

    const pg = await mercadopago.payment.create({
      transaction_amount: 197,
      description: "Assinatura Agente GPT Master Ouro",
      payment_method_id: "pix",
      payer: { email: req.user.email }
    });

    const qrBase64 = await QRCode.toDataURL(pg.body.point_of_interaction.transaction_data.qr_code);

    await db.query(
      "INSERT INTO pagamentos(user_id, valor, metodo, status, referencia) VALUES ($1, $2, $3, $4, $5)",
      [id, 197, "pix", "pendente", pg.body.id]
    );

    res.json({
      qrcode: qrBase64,
      copiarColar: pg.body.point_of_interaction.transaction_data.qr_code,
      referencia: pg.body.id
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao gerar PIX" });
  }
};