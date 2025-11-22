import pkg from "pg";
const { Pool } = pkg;

export const db = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
  max: 20,
  idleTimeoutMillis: 30000,
});

db.connect()
  .then(() => console.log("🟦 PostgreSQL conectado com sucesso"))
  .catch((err) => console.error("Erro ao conectar no PostgreSQL:", err));

/* ========================================================
   FUNÇÃO PADRÃO DE CONSULTA
======================================================== */
export async function query(sql, params = []) {
  try {
    const res = await db.query(sql, params);
    return res.rows;
  } catch (err) {
    console.error("Erro no SQL:", err);
    throw err;
  }
}
