"use client";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Bem-vindo, {user?.email || "Membro"} 👋
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <a className="p-6 bg-white shadow rounded-lg" href="/membros">
          Gestão de Membros
        </a>

        <a className="p-6 bg-white shadow rounded-lg" href="/network">
          Rede & Níveis
        </a>

        <a className="p-6 bg-white shadow rounded-lg" href="/economia">
          ECONOMI.A
        </a>

        <a className="p-6 bg-white shadow rounded-lg" href="/auriar">
          AURI.A – Avaliação
        </a>

        <a className="p-6 bg-white shadow rounded-lg" href="/inteligencia">
          Inteligência / Teste de Aptidão
        </a>

      </div>
    </div>
  );
}
