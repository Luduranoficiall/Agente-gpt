import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { query } from "../db/postgres.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const rows = await query("SELECT * FROM attendants WHERE email = $1", [
    email,
  ]);

  if (rows.length === 0)
    return res.status(404).json({ error: "Atendente não encontrado" });

  const user = rows[0];

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: "Senha incorreta" });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    "REGIA_SUPER_SECRET",
    { expiresIn: "1d" }
  );

  return res.json({ token });
});

export default router;
