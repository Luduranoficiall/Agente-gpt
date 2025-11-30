dotenv.config();
import express from "express";
import dotenv from "dotenv";
import webhook from "./webhook.js";
import adminRoutes from "./src/routes/admin.routes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Rotas administrativas (painel admin Next.js)
app.use("/api/admin", adminRoutes);

// Página principal
app.use(express.static(path.join(__dirname, "public")));

// Painel de mensagens
app.use("/dashboard", express.static(path.join(__dirname, "dashboard")));

let logs = [];
app.post("/webhook", (req, res, next) => {
  logs.push({
    data: req.body,
    hora: new Date().toISOString()
  });
  if (logs.length > 200) logs.shift();
  next();
});

app.get("/api/logs", (req, res) => {
  res.json(logs);
});

app.use("/webhook", webhook);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(process.env.PORT || 4000, () => {
  console.log("🚀 Servidor do Agente rodando na porta " + (process.env.PORT || 4000));
});
