"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Cliente() {
  const [user, setUser] = useState(null);
  const [pix, setPix] = useState(null);

  useEffect(() => {
    axios.get("/auth/me", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    }).then(res => setUser(res.data.user));
  }, []);

  if (!user) return <p>Carregando...</p>;

  const gerarPix = async () => {
    const r = await axios.post("/pagamento/gerar", {}, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
    setPix(r.data);
  };

  return (
    <div style={{ padding: 20, background: "#111", color: "white", minHeight: "100vh" }}>
      <h1>👤 Área do Cliente</h1>

      <p>Nome: {user.nome}</p>
      <p>Email: {user.email}</p>
      <p>Plano: {user.plano}</p>
      <p>Status: {user.ativo ? "Ativo" : "Pendente"}</p>

      {!user.ativo && (
        <>
          <button onClick={gerarPix}>Gerar PIX</button>
          {pix && (
            <>
              <img src={pix.qrcode} width="250" />
              <textarea style={{ width: "100%" }}>{pix.copiarColar}</textarea>
            </>
          )}
        </>
      )}

      {user.ativo && (
        <a href="/chat">Acessar Agente</a>
      )}
    </div>
  );
}