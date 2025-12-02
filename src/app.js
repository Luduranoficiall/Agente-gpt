import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import pagamentoRoutes from "./routes/pagamento.routes.js";
import webhookRoutes from "./routes/webhook.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "online", agente: "Master Ouro" });
});

// Roteador unificado para suportar tanto /api (Vercel) quanto / (Local)
const router = express.Router();

// Rota de verificação de saúde do sistema
router.get("/", (req, res) => {
  res.json({
    status: "online",
    agente: "Master Ouro",
    versao: "1.0.0",
    ambiente: process.env.NODE_ENV || "desenvolvimento"
  });
});

router.use("/auth", authRoutes);
router.use("/chat", chatRoutes);
router.use("/admin", adminRoutes);
router.use("/pagamento", pagamentoRoutes);
router.use("/webhook", webhookRoutes);

// Aplica as rotas
app.use("/api", router);
app.use("/", router);

export default app;
