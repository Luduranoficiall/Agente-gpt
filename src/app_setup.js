import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import webhook from "../webhook.js";
import adminRoutes from "./routes/admin.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");

const app = express();
app.use(express.json());

// Rotas administrativas
app.use("/api/admin", adminRoutes);

// Painel de mensagens (static) - Agora servido pelo Next.js via /public
// app.use("/dashboard", express.static(path.join(rootDir, "dashboard")));

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

export default app;
