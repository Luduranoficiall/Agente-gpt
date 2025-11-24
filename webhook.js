import express from "express";
import { responderIA } from "./ai.js";
import { templates } from "./templates.js";

const router = express.Router();

router.get("/", (req, res) => {
  const verifyToken = process.env.VERIFY_TOKEN || "agente_token";
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token && mode === "subscribe" && token === verifyToken) {
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
});

router.post("/", async (req, res) => {
  try {
    const entry = req.body.entry?.[0];
    const changes = entry?.changes?.[0];
    const message = changes?.value?.messages?.[0];
    if (!message) return res.sendStatus(200);
    const from = message.from;
    const text = message.text?.body || "";
    const resposta = await responderIA(text, from);
    // Aqui você pode integrar com o envio real para WhatsApp
    // await enviarMensagemWhatsApp(from, resposta);
    return res.sendStatus(200);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
});

export default router;
