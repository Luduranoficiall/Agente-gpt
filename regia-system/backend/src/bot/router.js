import express from "express";
import { getSession, updateSession } from "./sessionStore.js";
import { detectIntent } from "./nlu.js";
import { copy } from "./templates.js";
import { sendText, sendList, sendButtons, sendImage } from "./whatsapp.js";
import { askAI } from "./ai.js";

const router = express.Router();

/* ============================
   VERIFICAÇÃO DO WEBHOOK
================================ */
router.get("/", (req, res) => {
  try {
    if (req.query["hub.verify_token"] === process.env.VERIFY_TOKEN)
      return res.send(req.query["hub.challenge"]);

    return res.sendStatus(403);
  } catch (err) {
    return res.sendStatus(403);
  }
});

/* ============================
   RECEBIMENTO DE MENSAGENS
================================ */
router.post("/", async (req, res) => {
  try {
    const entry = req.body.entry?.[0];
    const change = entry?.changes?.[0];
    const msg = change?.value?.messages?.[0];

    if (!msg) return res.sendStatus(200);

    const from = msg.from;
    const profileName = change?.value?.contacts?.[0]?.profile?.name?.split(" ")[0];

    let text = "";
    if (msg.type === "text") text = msg.text.body;
    if (msg.type === "interactive") {
      const inter = msg.interactive.list_reply || msg.interactive.button_reply;
      text = inter.id || inter.title;
    }

    /* ======================================================
       CONTROLE DE SESSÃO
    ======================================================= */
    let session = getSession(from);

    /* ======================================================
       ONBOARDING
    ======================================================= */
    if (session.stage === "onboarding") {
      await sendText(from, copy.greeting(profileName));
      session.stage = "menu";
      return res.sendStatus(200);
    }

    /* ======================================================
       DETECÇÃO DE INTENÇÃO
    ======================================================= */
    const intent = detectIntent(text);
    session.lastIntent = intent;

    /* ======================================================
       FLUXO PRINCIPAL DO BOT
    ======================================================= */
    switch (intent) {
      /* ========= MENU ========= */
      case "menu":
        await sendList(from, copy.menuHeader, copy.menuBody, copy.menuSections);
        session.stage = "menu";
        break;

      /* ========= FAQ ========= */
      case "faq":
        await sendText(from, copy.faqGreeting);
        await sendText(from, copy.faqList);
        session.stage = "faq";
        break;

      /* ========= ECONOMIA ========= */
      case "economia":
        await sendText(from, copy.economiaIntro);
        session.stage = "economia";
        break;

      /* ========= CADASTRO ========= */
      case "cadastro":
        await sendText(from, copy.askName);
        session.stage = "collect_name";
        break;

      /* ========= HUMANO ========= */
      case "handoff":
        session.human.active = true;
        await sendText(from, copy.handoffStart);
        session.stage = "handoff_collect";
        break;

      /* ========= TEXTO LIVRE / IA ========= */
      default:
        /* COLETA DE NOME */
        if (session.stage === "collect_name") {
          session.profile.nome = text;
          await sendText(from, copy.askEmail);
          session.stage = "collect_email";
          break;
        }

        /* COLETA DE EMAIL */
        if (session.stage === "collect_email") {
          const valid = text.includes("@") && text.includes(".");
          if (!valid) {
            await sendText(from, copy.emailInvalid);
            break;
          }
          session.profile.email = text;
          await sendText(from, copy.profileOk);
          session.stage = "menu";
          break;
        }

        /* HANDOFF */
        if (session.stage === "handoff_collect") {
          session.human.notes = text;
          await sendText(from, copy.handoffConfirm);
          break;
        }

        /* IA GENERATIVA */
        const aiResponse = await askAI(text, session);
        await sendText(from, aiResponse);
        break;
    }

    return res.sendStatus(200);
  } catch (err) {
    console.error("Webhook ERROR:", err?.response?.data || err);
    return res.sendStatus(200);
  }
});

export default router;
