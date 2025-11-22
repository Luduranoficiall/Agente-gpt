"use client";

import { useState } from "react";
import axios from "axios";

export default function IA() {
  const [texto, setTexto] = useState("");
  const [report, setReport] = useState<string | null>(null);

  async function gerar() {
    const res = await axios.post("http://localhost:4000/api/inteligencia/aptidao", {
      texto,
    });

    setReport(res.data);
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Teste de Aptidão (IA)</h1>

      <textarea
        className="w-full h-40 border p-3 rounded"
        placeholder="Digite suas respostas..."
        onChange={(e) => setTexto(e.target.value)}
      />

      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={gerar}
      >
        Gerar Relatório
      </button>

      {report && (
        <div className="mt-6 p-6 bg-white rounded shadow">
          <pre>{report}</pre>
        </div>
      )}
    </div>
  );
}
