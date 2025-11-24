import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold text-blueenergy drop-shadow-xl">agente.gpt</h1>
      <p className="mt-4 text-lg text-gray-300 max-w-xl">
        Seu agente oficial da EXTRAORDINÁRI.A — humanizado, premium, inteligente e integrado ao WhatsApp Cloud API.
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/agente" className="px-8 py-3 bg-blueenergy text-black rounded-xl font-bold shadow-lg hover:bg-[#36bbff] transition">Acessar agente.gpt</Link>
        <Link href="/admin" className="px-8 py-3 bg-white/10 backdrop-blur-sm rounded-xl font-bold hover:bg-white/20 transition">Dashboard Admin</Link>
      </div>
    </main>
  );
}
