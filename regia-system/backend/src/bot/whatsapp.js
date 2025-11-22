import axios from "axios";
import pRetry from "p-retry";

const url = (id) => `https://graph.facebook.com/v21.0/${id}/messages`;

async function send(payload) {
  const headers = {
    Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
    "Content-Type": "application/json",
  };

  return pRetry(
    async () => {
      const { data } = await axios.post(
        url(process.env.PHONE_NUMBER_ID),
        payload,
        { headers }
      );
      return data;
    },
    { retries: 3 }
  );
}

export function sendText(to, body) {
  return send({
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: { body },
  });
}

export function sendList(to, header, body, sections) {
  return send({
    messaging_product: "whatsapp",
    to,
    type: "interactive",
    interactive: {
      type: "list",
      header: { type: "text", text: header },
      body: { text: body },
      action: { button: "Ver opções", sections },
    },
  });
}

export function sendButtons(to, body, buttons) {
  return send({
    messaging_product: "whatsapp",
    to,
    type: "interactive",
    interactive: {
      type: "button",
      body: { text: body },
      action: {
        buttons: buttons.map((b) => ({
          type: "reply",
          reply: { id: b.id, title: b.title },
        })),
      },
    },
  });
}

export function sendImage(to, link, caption = "") {
  return send({
    messaging_product: "whatsapp",
    to,
    type: "image",
    image: { link, caption },
  });
}
