import axios from 'axios';
import pRetry from 'p-retry';

const graphUrl = (phoneId) => `https://graph.facebook.com/v21.0/${phoneId}/messages`;

export async function sendText(to, body) {
  return sendPayload({
    messaging_product: 'whatsapp',
    to,
    type: 'text',
    text: { body }
  });
}

export async function sendInteractiveList(to, header, body, footer, sections) {
  // sections: [{title, rows:[{id,title,description}]}]
  return sendPayload({
    messaging_product: 'whatsapp',
    to,
    type: 'interactive',
    interactive: {
      type: 'list',
      header: { type: 'text', text: header },
      body: { text: body },
      footer: { text: footer || 'Escolha uma opção abaixo.' },
      action: { button: 'Ver opções', sections }
    }
  });
}

export async function sendTemplate(to, templateName, language = 'pt_BR', components = []) {
  return sendPayload({
    messaging_product: 'whatsapp',
    to,
    type: 'template',
    template: { name: templateName, language: { code: language }, components }
  });
}

export async function sendPayload(payload) {
  const url = graphUrl(process.env.PHONE_NUMBER_ID);
  const headers = { Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}` };

  return pRetry(
    async () => {
      const { data } = await axios.post(url, payload, { headers });
      return data;
    },
    { retries: 3 }
  );
}
