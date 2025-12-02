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

app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);
app.use("/admin", adminRoutes);
app.use("/pagamento", pagamentoRoutes);
app.use("/webhook", webhookRoutes);

export default app;
