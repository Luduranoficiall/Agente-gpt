import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.routes.js";
import adminRoutes from "./routes/admin.routes.js";
// import authRoutes from "./routes/auth.routes.js"; // pode ser criado depois

const app = express();
app.use(cors());
app.use(express.json());

app.use("/chat", chatRoutes);
app.use("/admin", adminRoutes);
// app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ status: "online", agente: "Master Ouro" });
});

export default app;
