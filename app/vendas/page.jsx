export default function Vendas() {
  return (
    <div className="min-h-screen bg-black text-white p-10 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div className="z-10 text-center max-w-4xl w-full">
        <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#FFD700]">
          🚀 Agente GPT Master Ouro
        </h1>
        <p className="text-xl text-gray-300 mb-12">O assistente de IA definitivo para empreendedores e empresas.</p>

        <h2 className="text-3xl font-semibold mb-8 text-[#FFD700]">Escolha seu Plano</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Plano Profissional */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl hover:border-[#FFD700] transition-all duration-300 transform hover:-translate-y-2">
            <h3 className="text-2xl font-bold text-white mb-2">Membros ALIANCI.A</h3>
            <div className="text-4xl font-bold text-[#FFD700] mb-4">R$ 197<span className="text-lg text-gray-400">/mês</span></div>
            <ul className="text-left text-gray-300 mb-8 space-y-2">
              <li>✅ Acesso ao Agente Premium</li>
              <li>✅ Painel do Cliente</li>
              <li>✅ Suporte Prioritário</li>
              <li>✅ Integrações Básicas</li>
            </ul>
            <a href="/register?plano=profissional" className="block w-full py-3 px-6 bg-gradient-to-r from-[#FFD700] to-[#FDB931] text-black font-bold rounded-lg hover:opacity-90 transition-opacity">
              Assinar Agora
            </a>
          </div>

          {/* Plano Empresarial */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl hover:border-[#FFD700] transition-all duration-300 transform hover:-translate-y-2 relative">
            <div className="absolute top-0 right-0 bg-[#FFD700] text-black text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">MAIS POPULAR</div>
            <h3 className="text-2xl font-bold text-white mb-2">Clientes Externos</h3>
            <div className="text-4xl font-bold text-[#FFD700] mb-4">R$ 297<span className="text-lg text-gray-400">/mês</span></div>
            <ul className="text-left text-gray-300 mb-8 space-y-2">
              <li>✅ Tudo do plano anterior</li>
              <li>✅ IA Comercial Premium</li>
              <li>✅ Dashboard Avançado</li>
              <li>✅ API Completa</li>
            </ul>
            <a href="/register?plano=empresarial" className="block w-full py-3 px-6 bg-gradient-to-r from-[#FFD700] to-[#FDB931] text-black font-bold rounded-lg hover:opacity-90 transition-opacity">
              Assinar Agora
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}