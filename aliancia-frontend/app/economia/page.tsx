"use client";

import { useState } from "react";

export default function Economia() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<any>(null);

  function calcular() {
    setResult(Number(value) * 0.05);
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">ECONOMI.A</h1>

      <input
        type="number"
        placeholder="Valor"
        className="border px-4 py-2 mt-6"
        onChange={(e) => setValue(e.target.value)}
      />

      <button
        onClick={calcular}
        className="ml-3 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Calcular Cashback
      </button>

      {result !== null && (
        <p className="mt-4 text-xl">Cashback: R$ {result.toFixed(2)}</p>
      )}
    </div>
  );
}
