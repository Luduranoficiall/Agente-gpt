"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const login = async () => {
    try {
      const r = await axios.post("/api/auth/login", { email, senha });
      localStorage.setItem("token", r.data.token);
      router.push("/cliente");
    } catch (e) {
      alert("Erro ao logar");
    }
  };

  return (
    <div style={{ padding: 40, background: "#000", color: "white", minHeight: "100vh" }}>
      <h1>Login</h1>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ display: "block", margin: "10px 0", padding: 10 }} />
      <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} style={{ display: "block", margin: "10px 0", padding: 10 }} />
      <button onClick={login} style={{ padding: 10 }}>Entrar</button>
    </div>
  );
}