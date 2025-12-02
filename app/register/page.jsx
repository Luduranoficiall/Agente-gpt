"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const register = async () => {
    try {
      await axios.post("/auth/register", { nome, email, senha });
      alert("Registrado com sucesso! Faça login.");
      router.push("/login");
    } catch (e) {
      alert("Erro ao registrar");
    }
  };

  return (
    <div style={{ padding: 40, background: "#000", color: "white", minHeight: "100vh" }}>
      <h1>Registrar</h1>
      <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} style={{ display: "block", margin: "10px 0", padding: 10 }} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ display: "block", margin: "10px 0", padding: 10 }} />
      <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} style={{ display: "block", margin: "10px 0", padding: 10 }} />
      <button onClick={register} style={{ padding: 10 }}>Criar Conta</button>
    </div>
  );
}