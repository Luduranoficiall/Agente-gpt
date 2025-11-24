import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full bg-black/20 backdrop-blur-xl border-b border-white/10 p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-blueenergy text-2xl font-bold">agente.gpt</h1>
        <nav className="flex gap-6 text-gray-400">
          <Link href="/">Home</Link>
          <Link href="/agente">Agente</Link>
          <Link href="/admin">Admin</Link>
        </nav>
      </div>
    </header>
  );
}
