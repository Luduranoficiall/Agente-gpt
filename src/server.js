import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8000;

// Apenas inicia o servidor se não estiver rodando na Vercel (Serverless)
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🔥 Servidor rodando http://localhost:${PORT}`);
  });
}

// Exporta o app para a Vercel (Serverless Function)
export default app;
