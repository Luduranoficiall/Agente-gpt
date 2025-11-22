import express from "express";
import bcrypt from "bcryptjs";
import { query } from "../db/postgres.js";

const router = express.Router();

router.get("/", async (_, res) => {
  const rows = await query("SELECT id, name, email FROM attendants");
  return res.json(rows);
});

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const result = await query(
    "INSERT INTO attendants (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email",
    [name, email, hash]
  );

  return res.json(result[0]);
});

export default router;
