"use client";
import { useState } from "react";

export default function AgentChat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: "web-user", message: input }),
    });
    const data = await res.json();
    const agentMsg = { role: "assistant", content: data.reply };
    setMessages((prev) => [...prev, agentMsg]);
    setInput("");
  }

  return (
    <div className="p-4 bg-black/30 rounded-xl border border-white/10">
      <div className="h-[450px] overflow-y-auto space-y-3 p-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg max-w-[80%] ${
              msg.role === "user"
                ? "bg-blueenergy text-black ml-auto"
                : "bg-white/10 text-gray-100"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1 p-3 rounded-lg bg-black/40 border border-white/10 focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="px-6 bg-blueenergy text-black rounded-lg font-bold hover:bg-[#37bcff]"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
