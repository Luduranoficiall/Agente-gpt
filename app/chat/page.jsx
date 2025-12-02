"use client";
import { useState } from "react";
import axios from "axios";

export default function Chat() {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState([]);

  const send = async () => {
    if (!input) return;
    const userMsg = { role: "user", content: input };
    setMsgs(m => [...m, userMsg]);

    const r = await axios.post("/chat", { prompt: input }, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });

    setMsgs(m => [...m, { role: "assistant", content: r.data.resposta }]);
    setInput("");
  };

  return (
    <div style={{ padding: 20, background: "#000", minHeight: "100vh", color: "white" }}>
      <h1>🤖 Agente GPT — Master Ouro</h1>

      <div>
        {msgs.map((m, i) => (
          <div key={i} style={{
            padding: 12,
            background: m.role === "user" ? "#1e1e1e" : "#252525",
            marginTop: 10
          }}>
            <b>{m.role}:</b> {m.content}
          </div>
        ))}
      </div>

      <input
        style={{ marginTop: 20, width: "80%", padding: 10 }}
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={send} style={{ padding: 10, marginLeft: 10 }}>
        Enviar
      </button>
    </div>
  );
}