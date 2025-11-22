"use client";

import { useState } from "react";

export default function Auriar() {
  const [score, setScore] = useState<any>(null);

  function avaliar() {
    const valores = Array(12).fill(8);
    const media = valores.reduce((a, b) => a + b) / 12;
    setScore(media);
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">AURI.A – 12 Peneiras</h1>

      <button
        className="px-5 py-2 bg-green-600 text-white rounded"
        onClick={avaliar}
      >
        Avaliar Exemplo
      </button>

      {score && <p className="mt-4">Score final: {score.toFixed(2)}</p>}
    </div>
  );
}
