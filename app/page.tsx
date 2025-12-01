"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Bot, Phone, Cpu, Smartphone, BarChart3, Zap, ShieldCheck, Plug, 
  MessageSquare
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen text-white font-sans selection:bg-[#00A8FF] selection:text-white">
      
      <section className="animate-fade-up">
        {/* Hero */}
        <div className="min-h-[95vh] flex items-center relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 py-24 w-full">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              {/* Left */}
              <div className="space-y-10">
                <div className="inline-flex items-center gap-3 px-5 py-2.5 glass rounded-full animate-fade-up" style={{animationDelay: '0.1s'}}>
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-sm font-medium text-gray-300">ULTRA ENTERPRISE • v2.0 Online</span>
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight animate-fade-up" style={{animationDelay: '0.2s'}}>
                  <span className="text-white">Conheça o</span><br />
                  <span className="text-gradient glow-text">agente.gpt</span>
                </h1>

                <p className="text-xl text-gray-400 leading-relaxed max-w-xl animate-fade-up" style={{animationDelay: '0.3s'}}>
                  Plataforma de <strong className="text-white">Inteligência Artificial Conversacional</strong> com 
                  <strong className="text-white">Analytics Avançado</strong> do ecossistema 
                  <span className="text-shimmer font-semibold">EXTRAORDINÁRI.A • ALIANCI.A</span>
                </p>

                <div className="flex flex-wrap gap-6 animate-fade-up" style={{animationDelay: '0.4s'}}>
                  <Link href="/agente" className="btn-primary px-10 py-5 rounded-2xl text-lg flex items-center gap-3 hover:scale-105 transition-transform">
                    <Bot className="w-6 h-6" />
                    Falar com Agente
                  </Link>
                  <a href="https://wa.me/5512996341928" target="_blank" className="btn-secondary px-10 py-5 rounded-2xl text-lg flex items-center gap-3 hover:scale-105 transition-transform">
                    <Phone className="w-6 h-6" />
                    WhatsApp Direto
                  </a>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-8 pt-10 animate-fade-up" style={{animationDelay: '0.5s'}}>
                  <div className="text-center">
                    <h3 className="text-3xl font-black text-white">99.9%</h3>
                    <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider">Uptime SLA</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-3xl font-black text-white">&lt;1s</h3>
                    <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider">Resposta</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-3xl font-black text-white">500+</h3>
                    <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider">Empresas</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-3xl font-black text-white">24/7</h3>
                    <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider">Disponível</p>
                  </div>
                </div>
              </div>

              {/* Right - Visual */}
              <div className="relative hidden lg:block">
                <div className="relative w-full aspect-square max-w-lg mx-auto">
                  {/* Orb Central */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-72 h-72 rounded-full bg-gradient-radial opacity-30 blur-3xl" style={{background: 'radial-gradient(circle, rgba(0,168,255,0.4) 0%, transparent 70%)'}}></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center animate-float">
                    <div className="w-44 h-44 rounded-full orb animate-pulse-glow flex items-center justify-center">
                      <span className="text-5xl font-black text-white drop-shadow-2xl logo-text">GPT</span>
                    </div>
                  </div>

                  {/* Orbiting Elements */}
                  <div className="absolute w-full h-full animate-rotate-slow">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 glass rounded-2xl p-4">
                      <Cpu className="w-8 h-8 text-[#00A8FF]" />
                    </div>
                  </div>
                  <div className="absolute w-full h-full animate-rotate-slow" style={{animationDuration: '25s', animationDirection: 'reverse'}}>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 glass rounded-2xl p-4">
                      <MessageSquare className="w-8 h-8 text-[#7C3AED]" />
                    </div>
                  </div>
                  <div className="absolute w-full h-full animate-rotate-slow" style={{animationDuration: '30s'}}>
                    <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 glass rounded-2xl p-4">
                      <BarChart3 className="w-8 h-8 text-[#10B981]" />
                    </div>
                  </div>

                  {/* Rings */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                    <circle cx="200" cy="200" r="140" fill="none" stroke="rgba(0,168,255,0.1)" strokeWidth="1"/>
                    <circle cx="200" cy="200" r="170" fill="none" stroke="rgba(124,58,237,0.08)" strokeWidth="1" strokeDasharray="8 8"/>
                    <circle cx="200" cy="200" r="195" fill="none" stroke="rgba(0,168,255,0.05)" strokeWidth="1" strokeDasharray="4 12"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-24">
              <span className="inline-block px-4 py-2 glass rounded-full text-sm text-[#00A8FF] mb-6">RECURSOS ENTERPRISE</span>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Por que empresas escolhem <span className="text-gradient">agente.gpt</span>?
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Tecnologia de ponta + Analytics avançado = Resultados extraordinários
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                { icon: Cpu, color: '#00A8FF', title: 'GPT-4o Turbo', desc: 'IA mais avançada do mercado. Respostas contextuais, precisas e humanizadas em milissegundos.' },
                { icon: Smartphone, color: '#7C3AED', title: 'WhatsApp Cloud API', desc: 'Integração oficial Meta. Atenda milhares de clientes simultaneamente no app que eles usam.' },
                { icon: BarChart3, color: '#10B981', title: 'Analytics Avançado', desc: 'Dashboard com métricas em tempo real. Integração Power BI. KPIs que impulsionam decisões.' },
                { icon: Zap, color: '#F59E0B', title: 'Resposta Instantânea', desc: 'Infraestrutura edge otimizada. Latência sub-segundo garantida em qualquer escala.' },
                { icon: ShieldCheck, color: '#EF4444', title: 'Segurança Enterprise', desc: 'Criptografia E2E, LGPD compliant, SOC 2 Type II. Seus dados blindados.' },
                { icon: Plug, color: '#00A8FF', title: 'API RESTful', desc: 'Documentação completa. SDKs Python, Node, Go. Integre em minutos.' },
              ].map((feature, i) => (
                <div key={i} className="card card-glow p-10 group hover:scale-105 transition-transform duration-300">
                  <div className="feature-icon w-16 h-16 rounded-2xl flex items-center justify-center mb-8">
                    <feature.icon className="w-8 h-8" style={{color: feature.color}} />
                  </div>
                  <h3 className="text-2xl font-bold mb-6">{feature.title}</h3>
                  <p className="text-gray-400 text-lg">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="py-24 glass-strong">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-gray-400 mb-12 text-sm uppercase tracking-widest">Powered by</p>
            <div className="flex flex-wrap justify-center items-center gap-16 opacity-50">
              {['OpenAI', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Fly.io', 'Power BI'].map(tech => (
                <span key={tech} className="text-2xl font-bold">{tech}</span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-32">
          <div className="max-w-4xl mx-auto px-6">
            <div className="card p-12 md:p-16 text-center relative overflow-hidden glow-box">
              <div className="absolute inset-0 opacity-30" style={{background: 'radial-gradient(ellipse at center, rgba(0,168,255,0.3) 0%, transparent 70%)'}}></div>
              <div className="relative z-10">
                <h2 className="text-4xl sm:text-5xl font-bold mb-8">
                  Pronto para <span className="text-gradient">revolucionar</span>?
                </h2>
                <p className="text-xl text-gray-400 mb-12 max-w-xl mx-auto">
                  Junte-se a 500+ empresas que transformaram seu atendimento com IA.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  <a href="https://wa.me/5512996341928?text=Quero%20conhecer%20o%20agente.gpt" target="_blank" className="btn-whatsapp px-10 py-5 rounded-2xl text-lg flex items-center gap-3 hover:scale-105 transition-transform">
                    <Phone className="w-6 h-6" />
                    Começar Agora
                  </a>
                  <Link href="/planos" className="btn-secondary px-10 py-5 rounded-2xl text-lg hover:scale-105 transition-transform">
                    Ver Planos
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

