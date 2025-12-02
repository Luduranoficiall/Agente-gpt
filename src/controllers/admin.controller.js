import { db } from "../db/index.js";

export const getUsers = async (req, res) => {
  const { rows } = await db.query("SELECT * FROM users ORDER BY id DESC");
  res.json({ users: rows });
};

export const getAgents = async (req, res) => {
  const { rows } = await db.query("SELECT * FROM agents ORDER BY id DESC");
  res.json({ agents: rows });
};

export const getLogs = async (req, res) => {
  const { rows } = await db.query("SELECT * FROM logs ORDER BY id DESC LIMIT 200");
  res.json({ logs: rows });
};
