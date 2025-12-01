"use client";

import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function PlanosPage() {
  const [pricingType, setPricingType] = useState('monthly');

  return (
    <main className="min-h-screen pt-20 pb-10 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 glass rounded-full text-sm text-[#00A8FF] mb-6">PRICING</span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Escolha o plano ideal</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Todos incluem suporte, atualizações e acesso completo.</p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="pricing-toggle flex items-center gap-2">
            <button onClick={() => setPricingType('monthly')} className={`pricing-toggle-btn ${pricingType === 'monthly' ? 'active' : ''}`}>Mensal</button>
            <button onClick={() => setPricingType('annual')} className={`pricing-toggle-btn ${pricingType === 'annual' ? 'active' : ''}`}>Anual <span className="text-emerald-400 text-xs ml-1">-20%</span></button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10 mb-24">
          {/* Profissional */}
          <div className="card p-10 flex flex-col">
            <div className="mb-10">
              <span className="text-gray-400 text-sm uppercase tracking-wider font-bold">Profissional</span>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-2xl text-gray-400 font-medium">R$</span>
                <span className="text-6xl font-black text-white">{pricingType === 'monthly' ? '197' : '158'}</span>
                <span className="text-gray-500">/mês</span>
              </div>
              <p className="text-gray-500 text-sm mt-4 leading-relaxed">Ideal para profissionais autônomos que buscam eficiência.</p>
            </div>
            <ul className="space-y-6 mb-12 flex-1">
              <li className="flex items-center gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" /><span className="text-gray-300">1.000 mensagens/mês</span></li>
              <li className="flex items-center gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" /><span className="text-gray-300">1 número WhatsApp</span></li>
              <li className="flex items-center gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" /><span className="text-gray-300">GPT-4o Mini</span></li>
              <li className="flex items-center gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" /><span className="text-gray-300">Dashboard básico</span></li>
              <li className="flex items-center gap-4 opacity-40"><XCircle className="w-6 h-6 flex-shrink-0" /><span>Analytics avançado</span></li>
              <li className="flex items-center gap-4 opacity-40"><XCircle className="w-6 h-6 flex-shrink-0" /><span>API Access</span></li>
            </ul>
            <a href="https://wa.me/5512996341928?text=Quero%20o%20plano%20Profissional" target="_blank" className="block w-full btn-secondary py-5 rounded-2xl text-center text-lg hover:scale-105 transition-transform">Começar Agora</a>
          </div>

          {/* Empresarial */}
          <div className="card card-glow p-10 border-2 border-[#00A8FF] scale-105 relative flex flex-col shadow-2xl shadow-[#00A8FF]/20">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2">
              <span className="badge-popular px-6 py-2 rounded-full text-black text-sm font-bold uppercase tracking-wide shadow-lg">⭐ Mais Popular</span>
            </div>
            <div className="mb-10">
              <span className="text-[#00A8FF] text-sm uppercase tracking-wider font-bold">Empresarial</span>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-2xl text-[#00A8FF] font-medium">R$</span>
                <span className="text-6xl font-black text-white">{pricingType === 'monthly' ? '497' : '398'}</span>
                <span className="text-gray-500">/mês</span>
              </div>
              <p className="text-gray-400 text-sm mt-4 leading-relaxed">Para empresas em crescimento que precisam de escala.</p>
            </div>
            <ul className="space-y-6 mb-12 flex-1">
              <li className="flex items-center gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" /><span className="text-white font-medium">10.000 mensagens/mês</span></li>
              <li className="flex items-center gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" /><span className="text-white font-medium">3 números WhatsApp</span></li>
              <li className="flex items-center gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" /><span className="text-white font-medium"><strong>GPT-4o Turbo</strong> (Mais Inteligente)</span></li>
              <li className="flex items-center gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" /><span className="text-white font-medium">Analytics Completo</span></li>
              <li className="flex items-center gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" /><span className="text-white font-medium">API Access</span></li>
              <li className="flex items-center gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" /><span className="text-white font-medium">Suporte Prioritário 24/7</span></li>
            </ul>
            <a href="https://wa.me/5512996341928?text=Quero%20o%20plano%20Empresarial" target="_blank" className="block w-full btn-primary py-5 rounded-2xl text-center text-lg shadow-lg hover:scale-105 transition-transform">Assinar Agora</a>
          </div>

          {/* Enterprise */}
          <div className="card p-10 flex flex-col">
            <div className="mb-10">
              <span className="text-gray-400 text-sm uppercase tracking-wider font-bold">Enterprise</span>
              <div className="mt-6">
                <span className="text-4xl font-black text-white">Sob Consulta</span>
              </div>
              <p className="text-gray-500 text-sm mt-4 leading-relaxed">Soluções customizadas para grandes operações.</p>
            </div>
            <ul className="space-y-6 mb-12 flex-1">
              <li className="flex items-center gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" /><span className="text-gray-300">Mensagens Ilimitadas</span></li>
              <li className="flex items-center gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" /><span className="text-gray-300">Números Ilimitados</span></li>
              <li className="flex items-center gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" /><span className="text-gray-300">IA Treinada Customizada</span></li>
              <li className="flex items-center gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" /><span className="text-gray-300">Integração Power BI</span></li>
              <li className="flex items-center gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" /><span className="text-gray-300">Gerente de Conta Dedicado</span></li>
              <li className="flex items-center gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" /><span className="text-gray-300">SLA 99.99% Garantido</span></li>
            </ul>
            <a href="https://wa.me/5512996341928?text=Quero%20saber%20sobre%20Enterprise" target="_blank" className="block w-full btn-secondary py-5 rounded-2xl text-center text-lg hover:scale-105 transition-transform">Falar com Consultor</a>
          </div>
        </div>
      </div>
    </main>
  );
}