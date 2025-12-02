"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get("/admin/users").then(r => setUsers(r.data.users));
    axios.get("/admin/logs").then(r => setLogs(r.data.logs));
  }, []);

  return (
    <div style={{ padding: 30, background: "#0c0c0c", color: "white", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 32 }}>⚡ Painel Administrativo — Master Ouro</h1>

      <h2 style={{ marginTop: 40 }}>Usuários</h2>
      {users.map(u => (
        <div key={u.id} style={{ padding: 10, background: "#1e1e1e", marginTop: 10 }}>
          <b>{u.nome}</b> — {u.email} — {u.plano} — {u.ativo ? "Ativo" : "Pendente"}
        </div>
      ))}

      <h2 style={{ marginTop: 40 }}>Logs (últimos 200)</h2>
      {logs.map(l => (
        <div key={l.id} style={{ padding: 10, background: "#1e1e1e", marginTop: 10 }}>
          <b>Pergunta:</b> {l.mensagem}<br/>
          <b>Resposta:</b> {l.resposta}
        </div>
      ))}
    </div>
  );
}