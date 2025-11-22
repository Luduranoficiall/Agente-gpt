import 'dotenv/config';
import express from 'express';
import rateLimit from 'express-rate-limit';
import router from './src/router.js';

const app = express();
app.use(express.json());

// Segurança básica: rate limit para webhook
app.use('/webhook', rateLimit({ windowMs: 60_000, max: 100 }));

app.get('/', (_, res) => res.status(200).send('OK: WhatsApp bot está rodando'));

app.use('/webhook', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`> Bot on http://localhost:${PORT}`));
