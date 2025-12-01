import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-[#0a0f24] to-[#001e52] text-white">
      <h1 className="text-5xl font-bold text-[#ffd700] drop-shadow-xl">Agente Premium Master Ouro</h1>
      <p className="mt-4 text-lg text-gray-300 max-w-xl">
        Seu agente oficial de alta performance — humanizado, premium, inteligente e integrado ao WhatsApp Cloud API.
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/dashboard" className="px-8 py-3 bg-[#ffd700] text-black rounded-xl font-bold shadow-lg hover:bg-[#ffed4a] transition">Acessar Painel</Link>
        <Link href="/login" className="px-8 py-3 bg-white/10 backdrop-blur-sm rounded-xl font-bold hover:bg-white/20 transition">Login</Link>
      </div>
    </main>
  );
}
