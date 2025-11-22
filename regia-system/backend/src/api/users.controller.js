import express from "express";
import { query } from "../db/postgres.js";

const router = express.Router();

router.get("/", async (_, res) => {
  const users = await query("SELECT * FROM users ORDER BY id DESC");
  return res.json(users);
});

router.post("/", async (req, res) => {
  const { name, email, phone } = req.body;
  const result = await query(
    "INSERT INTO users (name, email, phone) VALUES ($1, $2, $3) RETURNING *",
    [name, email, phone]
  );
  return res.json(result[0]);
});

export default router;
