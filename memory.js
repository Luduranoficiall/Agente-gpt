import { db } from "./db.js";

export async function registrarMensagem(telefone, texto, resposta, origem = "user") {
  let usuario = await db.query("SELECT * FROM usuarios WHERE telefone=$1", [telefone]);

  if (usuario.rows.length === 0) {
    await db.query("INSERT INTO usuarios (telefone) VALUES ($1)", [telefone]);
    usuario = await db.query("SELECT * FROM usuarios WHERE telefone=$1", [telefone]);
  }

  const userId = usuario.rows[0].id;

  await db.query(
    "INSERT INTO mensagens (usuario_id, mensagem, resposta, origem) VALUES ($1, $2, $3, $4)",
    [userId, texto, resposta, origem]
  );

  return usuario.rows[0];
}
