import { MercadoPagoConfig, Payment } from "mercadopago";
import QRCode from "qrcode";
import { db } from "../db/index.js";

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
const payment = new Payment(client);

export const gerarPix = async (req, res) => {
  try {
    const { id } = req.user;

    const pg = await payment.create({
      body: {
        transaction_amount: 197,
        description: "Assinatura Agente GPT Master Ouro",
        payment_method_id: "pix",
        payer: { email: req.user.email },
        notification_url: "https://agente-gpt-oficial.vercel.app/api/webhook/pix"
      }
    });

    const qrCode = pg.point_of_interaction.transaction_data.qr_code;
    const qrBase64 = await QRCode.toDataURL(qrCode);

    await db.query(
      "INSERT INTO pagamentos(user_id, valor, metodo, status, referencia) VALUES ($1, $2, $3, $4, $5)",
      [id, 197, "pix", "pendente", pg.id]
    );

    res.json({
      qrcode: qrBase64,
      copiarColar: qrCode,
      referencia: pg.body.id
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao gerar PIX" });
  }
};