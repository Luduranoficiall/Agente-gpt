import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../db/index.js";

export const registerController = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const hash = bcrypt.hashSync(senha, 10);

    await db.query(
      "INSERT INTO users (nome, email, senha, plano, ativo) VALUES ($1, $2, $3, $4, $5)",
      [nome, email, hash, "pendente", false]
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const { rows } = await db.query("SELECT * FROM users WHERE email=$1", [email]);
    const user = rows[0];

    if (!user) return res.status(400).json({ error: "Usuário não encontrado" });

    const ok = bcrypt.compareSync(senha, user.senha);
    if (!ok) return res.status(400).json({ error: "Senha incorreta" });

    const token = jwt.sign(
      { id: user.id, email: user.email, admin: user.admin },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: "Erro ao fazer login" });
  }
};

export const meController = async (req, res) => {
  res.json({ user: req.user });
};