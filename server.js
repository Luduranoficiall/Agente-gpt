dotenv.config();
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import next from "next";
import app from "./src/app_setup.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  // Handle all other routes with Next.js
  app.all(/(.*)/, (req, res) => {
    return handle(req, res);
  });

  // Só inicia o servidor se não estiver na Vercel (Desenvolvimento local)
  if (process.env.NODE_ENV !== 'production') {
    app.listen(process.env.PORT || 4000, () => {
      console.log("🚀 Servidor do Agente rodando na porta " + (process.env.PORT || 4000));
    });
  }
});

// Exporta o app para a Vercel (Serverless) - Legacy support, prefer api/index.js
export default app;
