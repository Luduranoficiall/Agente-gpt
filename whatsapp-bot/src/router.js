import express from 'express';
import { v4 as uuid } from 'uuid';
import { sendText, sendInteractiveList } from './whatsapp.js';
import { getSession, updateSession } from './sessionStore.js';
import { detectIntent } from './nlu.js';
import { copy } from './templates.js';
import axios from 'axios';

const router = express.Router();

// Verificação do webhook (Meta → "Verify Token")
router.get('/', (req, res) => {
  const verifyToken = process.env.VERIFY_TOKEN;
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === verifyToken) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

// Recebimento de eventos
router.post('/', async (req, res) => {
  try {
    const entry = req.body?.entry?.[0];
    const change = entry?.changes?.[0];
    const message = change?.value?.messages?.[0];

    if (!message) {
      return res.status(200).send('no-message');
    }

    const from = message.from; // número do usuário
    const session = getSession(from);

    // Pega nome do perfil, se vier
    const profileName = change?.value?.contacts?.[0]?.profile?.name;

    // Tratamento por tipo
    const type = message.type;
    let text = '';

    if (type === 'text') text = message.text.body;
    if (type === 'interactive') {
      // Resposta de lista/botão
      const sel = message.interactive?.list_reply || message.interactive?.button_reply;
      text = sel?.id || sel?.title || '';
    }

    // Onboarding inicial
    if (session.stage === 'onboarding') {
      await sendText(from, copy.greeting(profileName));
      session.stage = 'menu';
      return res.status(200).send('onboarded');
    }

    // Intenção
    const intent = detectIntent(text);
    session.lastIntent = intent;

    switch (intent) {
      case 'menu': {
        await sendInteractiveList(
          from,
          'Menu principal',
          'Escolha uma das opções ou escreva livremente.',
          copy.menuFooter,
          copy.menuSections
        );
        session.stage = 'menu';
        break;
      }
      case 'faq': {
        const intro = copy.faqIntro + '\n\n' +
          copy.faqList.map(([q], i) => `${i + 1}) ${q}`).join('\n') +
          '\n\nSe preferir, mande o número ou descreva sua dúvida.';

        await sendText(from, intro);
        session.stage = 'faq';
        break;
      }
      case 'economia': {
        await sendText(from,
          'Na *ECONOMI.A.* você economiza de verdade com descontos e cashback. 💸\n' +
          'Quer receber o passo a passo de como aproveitar os benefícios no seu dia a dia? (responda *sim*).'
        );
        session.stage = 'economia';
        break;
      }
      case 'cadastro': {
        if (!session.profile.nome) {
          await sendText(from, copy.askName);
          session.stage = 'collect_name';
        } else if (!session.profile.email) {
          await sendText(from, copy.askEmail);
          session.stage = 'collect_email';
        } else {
          await sendText(from, copy.thanksProfile);
          session.stage = 'menu';
        }
        break;
      }
      case 'handoff': {
        await sendText(from, copy.handoffStart);
        session.stage = 'handoff_collect';
        session.human = { active: true, notes: '' };
        break;
      }
      case 'saudacao': {
        await sendText(from, `Oi, ${session.profile?.nome || profileName || 'tudo bem'}? Digite *menu* pra começar 😉`);
        break;
      }
      case 'free_text': {
        // Estados especiais:
        if (session.stage === 'collect_name') {
          session.profile.nome = text.replace(/\s+/g, ' ').trim().slice(0, 60);
          await sendText(from, copy.askEmail);
          session.stage = 'collect_email';
          break;
        }

        if (session.stage === 'collect_email') {
          const email = (text || '').toLowerCase().trim();
          const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
          if (!ok) {
            await sendText(from, 'Hmm, esse e-mail parece inválido. Pode tentar no formato nome@dominio.com?');
            break;
          }
          session.profile.email = email;
          await sendText(from, copy.thanksProfile);
          session.stage = 'menu';
          break;
        }

        if (session.stage === 'handoff_collect') {
          session.human.notes = text.slice(0, 500);
          await sendText(from, copy.handoffConfirm);
          // Aqui você pode notificar seu time (e-mail/Slack/CRM)
          break;
        }

        if (session.stage === 'economia') {
          if (['sim', 'claro', 'ok', 'quero'].includes(text.toLowerCase())) {
            await sendText(from,
              'Perfeito! 1) Baixe/acesse o app, 2) Busque parceiros próximos, 3) Mostre o QR/receba o cashback. ' +
              'Qual sua cidade/bairro? Posso sugerir locais perto de você.'
            );
          } else {
            await sendText(from, copy.fallbackEmpathy);
          }
          break;
        }

        // Tentativa de IA (se habilitada), senão fallback empático
        if (process.env.OPENAI_API_KEY) {
          const reply = await askAI(session, text);
          await sendText(from, reply);
        } else {
          await sendText(from, copy.fallbackEmpathy);
        }
        break;
      }
      default: {
        await sendText(from, copy.fallbackEmpathy);
      }
    }

    return res.status(200).send('ok');
  } catch (err) {
    console.error('Webhook error', err?.response?.data || err);
    return res.sendStatus(200);
  }
});

export default router;

// ======= IA opcional (OpenAI) =======
async function askAI(session, userText) {
  try {
    const prompt = [
      {
        role: 'system',
        content:
          'Você é a REGI.A., assistente da EXTRAORDINÁRI.A.. Seja empática, clara e objetiva. ' +
          'Seja breve e prática. Quando não souber, sugira falar com humano. ' +
          'Contexto do usuário (se houver): ' + JSON.stringify(session?.profile || {})
      },
      { role: 'user', content: userText }
    ];

    const { data } = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      { model: process.env.OPENAI_MODEL || 'gpt-4o-mini', messages: prompt },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );

    return data.choices?.[0]?.message?.content?.trim() || 'Certo! Como posso ajudar mais?';
  } catch (e) {
    console.error('AI error', e?.response?.data || e);
    return 'Tive um deslize aqui com a IA. Quer que eu te conecte com um humano agora?';
  }
}
