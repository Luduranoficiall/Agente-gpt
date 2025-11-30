export const getAnalytics = async (req, res) => {
  try {
    const users = await db.query("SELECT COUNT(*) FROM users");
    const messages = await db.query("SELECT COUNT(*) FROM logs");
    // Simulação de status, pode ser ajustado para lógica real
    const status = "online";
    res.json({
      total_users: Number(users.rows[0].count),
      total_messages: Number(messages.rows[0].count),
      status
    });
  } catch (e) {
    res.status(500).json({ error: "Erro ao buscar analytics", details: e.message });
  }
};
export const getAgents = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM agents ORDER BY id DESC");
    res.json({ agents: rows });
  } catch (e) {
    res.status(500).json({ error: "Erro ao buscar agentes", details: e.message });
  }
};

export const getLogs = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM logs ORDER BY id DESC LIMIT 100");
    res.json({ logs: rows });
  } catch (e) {
    res.status(500).json({ error: "Erro ao buscar logs", details: e.message });
  }
};
import { db } from "../db/index.js";

export const getUsers = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM users ORDER BY id DESC");
    res.json({ users: rows });
  } catch (e) {
    res.status(500).json({ error: "Erro ao buscar usuários", details: e.message });
  }
};

export const toggleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const { rows } = await db.query(
      "UPDATE users SET ativo = NOT ativo WHERE id = $1 RETURNING *",
      [id]
    );
    if (!rows[0]) return res.status(404).json({ error: "Usuário não encontrado" });
    res.json({ success: true, user: rows[0] });
  } catch (e) {
    res.status(500).json({ error: "Erro ao atualizar usuário", details: e.message });
  }
};
