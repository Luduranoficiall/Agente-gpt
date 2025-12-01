"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, Bot, Phone, Cpu, Smartphone, BarChart3, Zap, ShieldCheck, Plug, 
  Trash2, Download, Info, CreditCard, Headphones, Send, CheckCircle2, XCircle, 
  Globe, Key, Database, AlertCircle, Terminal, Building2, Package, Bell, 
  DollarSign, TrendingUp, Gift, Activity, Trophy, Users, Clock, Heart, 
  RefreshCw, Copy, Github, Linkedin 
} from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Home() {
  const [activePage, setActivePage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Chat State
  const [chatMessages, setChatMessages] = useState([
    { 
      role: 'agent', 
      content: `Olá! 👋 Sou o **agente.gpt** – versão **ULTRA ENTERPRISE**.\n\nFaço parte do ecossistema **EXTRAORDINÁRI.A • ALIANCI.A** e estou aqui para:\n\n• Tirar dúvidas sobre planos e preços\n• Oferecer suporte técnico especializado\n• Orientar sobre integrações e API\n• Apresentar o ecossistema completo\n\nComo posso ajudar você hoje? 🚀` 
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Pricing State
  const [pricingType, setPricingType] = useState('monthly');

  // Docs State
  const [docsTab, setDocsTab] = useState('quickstart');

  // Admin Stats State
  const [adminStats, setAdminStats] = useState({ users: 0, messages: 0 });

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (activePage === 'admin') {
      animateValue('users', 0, 2847, 2000);
      animateValue('messages', 0, 48291, 2500);
    }
  }, [activePage]);

  // Scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  const animateValue = (key: 'users' | 'messages', start: number, end: number, duration: number) => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setAdminStats(prev => ({
        ...prev,
        [key]: Math.floor(progress * (end - start) + start)
      }));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const formatMsg = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
      .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 bg-white/10 rounded text-[#00A8FF] text-sm">$1</code>')
      .replace(/\n/g, '<br>')
      .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" class="text-[#00A8FF] hover:underline">$1</a>');
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setChatInput('');
    setIsTyping(true);

    // Simulate response delay based on message length for realism
    const delay = 600 + Math.random() * 800 + (userMsg.length * 10);
    await new Promise(r => setTimeout(r, delay));
    
    let reply = '';
    const l = userMsg.toLowerCase();
    
    // Greetings
    if (l.match(/^(oi|olá|ola|bom dia|boa tarde|boa noite)/)) {
      const greetings = [
        `Olá! Como posso ajudar você a transformar seu atendimento hoje? 🚀`,
        `Oi! Tudo bem? Sou o **agente.gpt** e estou pronto para escalar seu negócio.`,
        `Olá! Seja bem-vindo ao futuro do atendimento. Em que posso ser útil?`
      ];
      reply = greetings[Math.floor(Math.random() * greetings.length)];
    }
    // Identity
    else if (l.includes('quem') && l.includes('você')) {
      reply = `Sou o **agente.gpt** – versão **ULTRA ENTERPRISE**! 🚀\n\nFaço parte do ecossistema **EXTRAORDINÁRI.A • ALIANCI.A** e ofereço:\n\n• 🎯 Atendimento Premium 24/7\n• ⚡ Respostas em menos de 1 segundo\n• 🔒 Segurança Enterprise (LGPD)\n• 📊 Analytics integrado\n\n**WhatsApp Oficial:** https://wa.me/5512996341928`;
    } 
    // Pricing
    else if (l.includes('plano') || l.includes('preço') || l.includes('valor') || l.includes('custo')) {
      reply = `📋 **PLANOS agente.gpt**\n\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n🔹 **PROFISSIONAL** – R$ 197/mês\n• 1.000 mensagens\n• 1 WhatsApp\n• GPT-4o Mini\n\n🔹 **EMPRESARIAL** – R$ 497/mês ⭐\n• 10.000 mensagens\n• 3 WhatsApp\n• GPT-4o Turbo\n• Analytics + API\n\n🔹 **ENTERPRISE** – Sob consulta\n• Ilimitado + Power BI\n\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n💬 **Contratar:** https://wa.me/5512996341928`;
    } 
    // Support
    else if (l.includes('suporte') || l.includes('ajuda') || l.includes('problema')) {
      reply = `🎧 **SUPORTE agente.gpt**\n\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n📱 **WhatsApp (24/7)**\nhttps://wa.me/5512996341928\n\n📊 **Status:** Todos sistemas ✅\n\n━━━━━━━━━━━━━━━━━━━━━━━━`;
    } 
    // API
    else if (l.includes('api') || l.includes('integra') || l.includes('dev')) {
      reply = `🔌 **API agente.gpt**\n\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n**Base URL:**\n\`https://api.agente-gpt.fly.dev\`\n\n**Endpoints:**\n• POST /chat\n• POST /companies\n• POST /metrics\n• POST /events\n• GET /health\n\n**Auth:** X-ADMIN-TOKEN\n\n━━━━━━━━━━━━━━━━━━━━━━━━\n\nDocumentação completa na aba API!`;
    } 
    // Default
    else {
      const defaults = [
        `Entendi! 😊\n\nPosso ajudar com:\n• 📋 **Planos** e preços\n• 🎧 **Suporte** técnico\n• 🔌 **API** e integrações\n• 📊 **Analytics** e métricas\n\n**WhatsApp direto:** https://wa.me/5512996341928`,
        `Interessante! Para te dar a melhor resposta, você poderia ser um pouco mais específico? Posso falar sobre nossos planos, API ou suporte.`,
        `Estou aqui para ajudar! Se quiser saber sobre como nossa IA pode revolucionar seu atendimento, é só perguntar.`
      ];
      reply = defaults[Math.floor(Math.random() * defaults.length)];
    }

    setIsTyping(false);
    setChatMessages(prev => [...prev, { role: 'agent', content: reply }]);
  };

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text.trim());
    // Toast could be added here
    alert('Copiado!');
  };

  const chartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [{
      label: 'Faturamento (R$)',
      data: [180000, 220000, 195000, 280000, 320000, 420000],
      backgroundColor: 'rgba(0, 168, 255, 0.5)',
      borderColor: '#00A8FF',
      borderWidth: 2,
      borderRadius: 8,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#666' } },
      x: { grid: { display: false }, ticks: { color: '#666' } }
    }
  };

  return (
    <div className="min-h-screen text-white font-sans selection:bg-[#00A8FF] selection:text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-mesh"></div>
        <div className="absolute inset-0 bg-grid"></div>
        <div className="absolute inset-0 bg-noise"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('home'); }} className="flex items-center gap-4 group">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl orb flex items-center justify-center animate-pulse-glow">
                  <span className="font-black text-white text-lg logo-text drop-shadow-lg">GPT</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#010204] status-dot"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gradient logo-text">agente.gpt</h1>
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-medium">ULTRA ENTERPRISE</p>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8"> {/* Aumentado gap para mais espaço */}
              {['home', 'agente', 'planos', 'docs', 'analytics', 'admin'].map((page) => (
                <a 
                  key={page}
                  href="#" 
                  onClick={(e) => { e.preventDefault(); setActivePage(page); }} 
                  className={`nav-item ${activePage === page ? 'active' : ''} capitalize text-sm font-medium tracking-wide transition-all duration-300 hover:text-[#00A8FF]`}
                >
                  {page === 'home' ? 'Início' : page === 'agente' ? 'Agente IA' : page === 'docs' ? 'API' : page}
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <a href="https://wa.me/5512996341928" target="_blank" className="hidden md:flex btn-whatsapp items-center gap-2 px-5 py-3 rounded-xl text-sm">
                <Phone className="w-5 h-5" />
                <span className="font-semibold">WhatsApp</span>
              </a>
              <button className="glass-button" onClick={() => window.location.href='/login'}>Login</button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-3 glass rounded-xl">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden glass-strong border-t border-white/5">
            <nav className="px-6 py-6 space-y-2">
              {['home', 'agente', 'planos', 'docs', 'analytics', 'admin'].map((page) => (
                <a 
                  key={page}
                  href="#" 
                  onClick={(e) => { e.preventDefault(); setActivePage(page); setMobileMenuOpen(false); }} 
                  className="block py-3 px-4 rounded-xl hover:bg-white/5 capitalize"
                >
                  {page === 'home' ? 'Início' : page === 'agente' ? 'Agente IA' : page === 'docs' ? 'API' : page}
                </a>
              ))}
              <a href="https://wa.me/5512996341928" target="_blank" className="flex btn-whatsapp items-center justify-center gap-2 py-4 rounded-xl mt-4">
                <Phone className="w-5 h-5" />
                Falar no WhatsApp
              </a>
            </nav>
          </div>
        )}
      </header>

      <main className="pt-20 relative z-10">
        
        {/* HOME PAGE */}
        {activePage === 'home' && (
          <section className="animate-fade-up">
            {/* Hero */}
            <div className="min-h-[95vh] flex items-center relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-6 py-20 w-full">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                  {/* Left */}
                  <div className="space-y-8">
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 glass rounded-full animate-fade-up" style={{animationDelay: '0.1s'}}>
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                      </span>
                      <span className="text-sm font-medium text-gray-300">ULTRA ENTERPRISE • v2.0 Online</span>
                    </div>

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] animate-fade-up tracking-tight" style={{animationDelay: '0.2s'}}>
                      <span className="text-white">Conheça o</span><br />
                      <span className="text-gradient glow-text">agente.gpt</span>
                    </h1>

                    <p className="text-xl text-gray-300 leading-relaxed max-w-xl animate-fade-up font-light" style={{animationDelay: '0.3s'}}>
                      Plataforma de <strong className="text-white font-semibold">Inteligência Artificial Conversacional</strong> com 
                      <strong className="text-white font-semibold"> Analytics Avançado</strong> do ecossistema 
                      <span className="text-shimmer font-medium"> EXTRAORDINÁRI.A • ALIANCI.A</span>
                    </p>

                    <div className="flex flex-wrap gap-6 animate-fade-up" style={{animationDelay: '0.4s'}}>
                      <button onClick={() => setActivePage('agente')} className="btn-primary px-10 py-5 rounded-2xl text-lg font-bold flex items-center gap-3 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all">
                        <Bot className="w-6 h-6" />
                        Falar com Agente
                      </button>
                      <a href="https://wa.me/5512996341928" target="_blank" className="btn-secondary px-10 py-5 rounded-2xl text-lg font-bold flex items-center gap-3 border border-white/10 hover:bg-white/5 transition-all">
                        <Phone className="w-6 h-6" />
                        WhatsApp Direto
                      </a>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-6 pt-8 animate-fade-up" style={{animationDelay: '0.5s'}}>
                      <div className="text-center">
                        <h3 className="text-3xl font-black text-white">99.9%</h3>
                        <p className="text-xs text-gray-500 mt-1">Uptime SLA</p>
                      </div>
                      <div className="text-center">
                        <h3 className="text-3xl font-black text-white">&lt;1s</h3>
                        <p className="text-xs text-gray-500 mt-1">Resposta</p>
                      </div>
                      <div className="text-center">
                        <h3 className="text-3xl font-black text-white">500+</h3>
                        <p className="text-xs text-gray-500 mt-1">Empresas</p>
                      </div>
                      <div className="text-center">
                        <h3 className="text-3xl font-black text-white">24/7</h3>
                        <p className="text-xs text-gray-500 mt-1">Disponível</p>
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
                          <Bot className="w-8 h-8 text-[#7C3AED]" />
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
                <div className="text-center mb-20">
                  <span className="inline-block px-4 py-2 glass rounded-full text-sm text-[#00A8FF] mb-6">RECURSOS ENTERPRISE</span>
                  <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                    Por que empresas escolhem <span className="text-gradient">agente.gpt</span>?
                  </h2>
                  <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Tecnologia de ponta + Analytics avançado = Resultados extraordinários
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    { icon: Cpu, color: '#00A8FF', title: 'GPT-4o Turbo', desc: 'IA mais avançada do mercado. Respostas contextuais, precisas e humanizadas em milissegundos.' },
                    { icon: Smartphone, color: '#7C3AED', title: 'WhatsApp Cloud API', desc: 'Integração oficial Meta. Atenda milhares de clientes simultaneamente no app que eles usam.' },
                    { icon: BarChart3, color: '#10B981', title: 'Analytics Avançado', desc: 'Dashboard com métricas em tempo real. Integração Power BI. KPIs que impulsionam decisões.' },
                    { icon: Zap, color: '#F59E0B', title: 'Resposta Instantânea', desc: 'Infraestrutura edge otimizada. Latência sub-segundo garantida em qualquer escala.' },
                    { icon: ShieldCheck, color: '#EF4444', title: 'Segurança Enterprise', desc: 'Criptografia E2E, LGPD compliant, SOC 2 Type II. Seus dados blindados.' },
                    { icon: Plug, color: '#00A8FF', title: 'API RESTful', desc: 'Documentação completa. SDKs Python, Node, Go. Integre em minutos.' },
                  ].map((feature, i) => (
                    <div key={i} className="card card-glow p-8 group">
                      <div className="feature-icon w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                        <feature.icon className="w-8 h-8" style={{color: feature.color}} />
                      </div>
                      <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                      <p className="text-gray-400">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="py-20 glass-strong">
              <div className="max-w-7xl mx-auto px-6">
                <p className="text-center text-gray-400 mb-10 text-sm uppercase tracking-widest">Powered by</p>
                <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
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
                    <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                      Pronto para <span className="text-gradient">revolucionar</span>?
                    </h2>
                    <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
                      Junte-se a 500+ empresas que transformaram seu atendimento com IA.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <a href="https://wa.me/5512996341928?text=Quero%20conhecer%20o%20agente.gpt" target="_blank" className="btn-whatsapp px-10 py-5 rounded-2xl text-lg flex items-center gap-3">
                        <Phone className="w-6 h-6" />
                        Começar Agora
                      </a>
                      <button onClick={() => setActivePage('planos')} className="btn-secondary px-10 py-5 rounded-2xl text-lg">
                        Ver Planos
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* AGENTE PAGE */}
        {activePage === 'agente' && (
          <section className="min-h-screen py-10 animate-fade-up">
            <div className="max-w-5xl mx-auto px-6">
              <div className="text-center mb-10">
                <h1 className="text-4xl font-bold"><span class="text-gradient">agente.gpt</span></h1>
                <p className="text-gray-400 mt-2">Assistente IA Ultra Enterprise • GPT-4o Turbo</p>
              </div>

              <div className="card overflow-hidden glow-box">
                {/* Chat Header */}
                <div className="glass-strong px-6 py-5 flex items-center justify-between border-b border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl orb animate-pulse-glow flex items-center justify-center">
                        <span className="font-bold text-white text-sm">GPT</span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#111] status-dot"></div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">agente.gpt</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        Online • Latência: 0.3s
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setChatMessages([])} className="p-3 glass rounded-xl hover:bg-white/10 transition-all" title="Limpar">
                      <Trash2 className="w-5 h-5 text-gray-400" />
                    </button>
                    <button className="p-3 glass rounded-xl hover:bg-white/10 transition-all" title="Exportar">
                      <Download className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div ref={chatContainerRef} className="h-[500px] overflow-y-auto p-6 space-y-6">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-fade-up`}>
                      <div className={`w-10 h-10 rounded-xl ${msg.role === 'user' ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'orb'} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
                        {msg.role === 'user' ? 'EU' : 'GPT'}
                      </div>
                      <div 
                        className={`${msg.role === 'user' ? 'bubble-user' : 'bubble-agent'} px-5 py-4 max-w-[80%]`}
                        dangerouslySetInnerHTML={{ __html: formatMsg(msg.content) }}
                      ></div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl orb flex items-center justify-center text-xs font-bold text-white flex-shrink-0">GPT</div>
                      <div className="bubble-agent px-5 py-4 flex items-center gap-3">
                        <div className="flex gap-1.5">
                          <span className="w-2 h-2 bg-[#00A8FF] rounded-full animate-bounce" style={{animationDelay: '0s'}}></span>
                          <span className="w-2 h-2 bg-[#00A8FF] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                          <span className="w-2 h-2 bg-[#00A8FF] rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                        </div>
                        <span className="text-gray-500 text-sm">processando...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="px-6 py-4 border-t border-white/5 bg-black/20 flex flex-wrap gap-2">
                  {[
                    { icon: Info, text: 'Sobre', msg: 'Quem é você e o que pode fazer?', color: '#00A8FF' },
                    { icon: CreditCard, text: 'Planos', msg: 'Quais são os planos disponíveis?', color: '#7C3AED' },
                    { icon: Headphones, text: 'Suporte', msg: 'Preciso de suporte técnico', color: '#10B981' },
                    { icon: Plug, text: 'API', msg: 'Como funciona a API e integração?', color: '#F59E0B' },
                  ].map((action, i) => (
                    <button 
                      key={i}
                      onClick={() => { setChatInput(action.msg); handleSendMessage(); }}
                      className="px-4 py-2 glass rounded-xl text-sm hover:bg-white/10 transition-all flex items-center gap-2"
                    >
                      <action.icon className="w-4 h-4" style={{color: action.color}} />
                      {action.text}
                    </button>
                  ))}
                </div>

                {/* Input */}
                <div className="px-6 py-5 border-t border-white/5 glass-strong">
                  <div className="flex gap-4">
                    <div className="flex-1 relative">
                      <input 
                        type="text" 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Digite sua mensagem..." 
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-[#00A8FF] focus:ring-2 focus:ring-[#00A8FF]/20 transition-all" 
                      />
                    </div>
                    <button onClick={handleSendMessage} className="btn-primary px-6 py-4 rounded-2xl flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      <span className="hidden sm:inline">Enviar</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="mt-10 card p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-bold mb-2">Prefere WhatsApp?</h3>
                  <p className="text-gray-400">Atendimento instantâneo 24/7</p>
                </div>
                <a href="https://wa.me/5512996341928" target="_blank" className="btn-whatsapp px-8 py-4 rounded-2xl flex items-center gap-3">
                  <Phone className="w-6 h-6" />
                  Abrir WhatsApp
                </a>
              </div>
            </div>
          </section>
        )}

        {/* PLANOS PAGE */}
        {activePage === 'planos' && (
          <section className="min-h-screen py-20 animate-fade-up">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
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
              <div className="grid md:grid-cols-3 gap-8 mb-20">
                {/* Profissional */}
                <div className="card p-8">
                  <div className="mb-8">
                    <span className="text-gray-400 text-sm uppercase tracking-wider">Profissional</span>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-5xl font-black">R$ {pricingType === 'monthly' ? '197' : '158'}</span>
                      <span className="text-gray-500">/mês</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">Para profissionais autônomos</p>
                  </div>
                  <ul className="space-y-4 mb-10">
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span className="text-gray-300">1.000 mensagens/mês</span></li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span className="text-gray-300">1 número WhatsApp</span></li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span className="text-gray-300">GPT-4o Mini</span></li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span className="text-gray-300">Dashboard básico</span></li>
                    <li className="flex items-center gap-3 opacity-40"><XCircle className="w-5 h-5" /><span>Analytics avançado</span></li>
                    <li className="flex items-center gap-3 opacity-40"><XCircle className="w-5 h-5" /><span>API Access</span></li>
                  </ul>
                  <a href="https://wa.me/5512996341928?text=Quero%20o%20plano%20Profissional" target="_blank" className="block w-full btn-secondary py-4 rounded-xl text-center">Começar</a>
                </div>

                {/* Empresarial */}
                <div className="card card-glow p-8 border-2 border-[#00A8FF] scale-105 relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="badge-popular px-4 py-1.5 rounded-full text-black text-sm font-bold">⭐ POPULAR</span>
                  </div>
                  <div className="mb-8">
                    <span className="text-[#00A8FF] text-sm uppercase tracking-wider">Empresarial</span>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-5xl font-black">R$ {pricingType === 'monthly' ? '497' : '398'}</span>
                      <span className="text-gray-500">/mês</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">Para empresas em crescimento</p>
                  </div>
                  <ul className="space-y-4 mb-10">
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span className="text-gray-300">10.000 mensagens/mês</span></li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span className="text-gray-300">3 números WhatsApp</span></li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span className="text-gray-300"><strong>GPT-4o Turbo</strong></span></li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span className="text-gray-300">Analytics completo</span></li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span className="text-gray-300">API Access</span></li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span className="text-gray-300">Suporte 24/7</span></li>
                  </ul>
                  <a href="https://wa.me/5512996341928?text=Quero%20o%20plano%20Empresarial" target="_blank" className="block w-full btn-primary py-4 rounded-xl text-center">Começar</a>
                </div>

                {/* Enterprise */}
                <div className="card p-8">
                  <div className="mb-8">
                    <span className="text-gray-400 text-sm uppercase tracking-wider">Enterprise</span>
                    <div className="mt-4">
                      <span className="text-4xl font-black">Sob consulta</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">Para grandes operações</p>
                  </div>
                  <ul className="space-y-4 mb-10">
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span className="text-gray-300">Mensagens ilimitadas</span></li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span className="text-gray-300">Números ilimitados</span></li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span className="text-gray-300">IA customizada</span></li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span className="text-gray-300">Power BI integration</span></li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span className="text-gray-300">Gerente dedicado</span></li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span className="text-gray-300">SLA 99.99%</span></li>
                  </ul>
                  <a href="https://wa.me/5512996341928?text=Quero%20saber%20sobre%20Enterprise" target="_blank" className="block w-full btn-secondary py-4 rounded-xl text-center">Falar com consultor</a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* DOCS PAGE */}
        {activePage === 'docs' && (
          <section className="min-h-screen py-20 animate-fade-up">
            <div className="max-w-6xl mx-auto px-6">
              {/* Header */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <span className="inline-block px-4 py-2 glass rounded-full text-sm text-[#00A8FF]">API DOCUMENTATION</span>
                  <span className="inline-block px-4 py-2 glass rounded-full text-sm text-emerald-400">v2.0</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold mb-6">API <span className="text-gradient">Reference</span></h1>
                <p className="text-xl text-gray-400 max-w-3xl">RESTful API completa para integração com seus sistemas. Conecte agente.gpt + ALIANCI.A Analytics ao seu ecossistema.</p>
              </div>

              {/* Navigation Tabs */}
              <div className="flex flex-wrap gap-2 mb-10">
                {['quickstart', 'endpoints', 'examples', 'sdks'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setDocsTab(tab)} 
                    className={`px-5 py-2.5 glass rounded-xl text-sm font-medium transition-all capitalize ${docsTab === tab ? 'bg-[#00A8FF] text-black' : ''}`}
                  >
                    {tab === 'quickstart' ? '🚀 Quick Start' : tab === 'endpoints' ? '📡 Endpoints' : tab === 'examples' ? '💻 Exemplos cURL' : '📦 SDKs'}
                  </button>
                ))}
              </div>

              {/* Quick Start Tab */}
              {docsTab === 'quickstart' && (
                <div className="animate-fade-up">
                  <div className="grid lg:grid-cols-2 gap-8 mb-10">
                    <div className="card p-8">
                      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#00A8FF]/20 flex items-center justify-center">
                          <Globe className="w-5 h-5 text-[#00A8FF]" />
                        </div>
                        Base URL
                      </h2>
                      <div className="code-block rounded-xl p-5 mb-4">
                        <div className="flex items-center justify-between">
                          <code className="text-[#00A8FF] text-lg">https://api.agente-gpt.fly.dev</code>
                          <button onClick={() => copyCode('https://api.agente-gpt.fly.dev')} className="p-2 hover:bg-white/10 rounded-lg transition-all">
                            <Copy className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm">Todos os endpoints utilizam esta URL base. HTTPS obrigatório.</p>
                    </div>

                    <div className="card p-8">
                      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                          <Key className="w-5 h-5 text-emerald-500" />
                        </div>
                        Autenticação
                      </h2>
                      <div className="code-block rounded-xl p-5 mb-4">
                        <code className="text-gray-400">X-ADMIN-TOKEN: <span className="text-emerald-400">seu-token-secreto</span></code>
                      </div>
                      <p className="text-gray-400 text-sm">Envie o header em todas as requisições protegidas.</p>
                    </div>
                  </div>

                  <div className="card p-8 mb-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#00A8FF]/15 flex items-center justify-center">
                          <Database className="w-5 h-5 text-[#00A8FF]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">Provisionar Banco</h3>
                          <p className="text-gray-400 text-sm">Scripts SQL para iniciar o aliancia_analytics</p>
                        </div>
                      </div>
                      <button onClick={() => copyCode("CREATE DATABASE aliancia_analytics;\nCREATE USER aliancia_user WITH PASSWORD 'sua-senha-forte';\nGRANT ALL PRIVILEGES ON DATABASE aliancia_analytics TO aliancia_user;")} className="px-3 py-1.5 glass rounded-lg text-xs flex items-center gap-2 hover:bg-white/10">
                        <Copy className="w-3 h-3" /> Copiar
                      </button>
                    </div>
                    <div className="code-block rounded-xl p-5 overflow-x-auto">
                      <pre className="text-sm text-gray-300"><code>CREATE DATABASE aliancia_analytics;
CREATE USER aliancia_user WITH PASSWORD 'sua-senha-forte';
GRANT ALL PRIVILEGES ON DATABASE aliancia_analytics TO aliancia_user;</code></pre>
                    </div>
                    <p className="text-gray-400 text-sm mt-4">Cole esses comandos diretamente no seu terminal psql para preparar o banco <span className="text-white font-semibold">aliancia_analytics</span> em segundos.</p>
                  </div>
                </div>
              )}

              {/* Endpoints Tab */}
              {docsTab === 'endpoints' && (
                <div className="animate-fade-up space-y-6">
                  {/* Section: Chat */}
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-[#00A8FF] mb-4 flex items-center gap-2">
                      <Bot className="w-5 h-5" />
                      CHAT (agente.gpt)
                    </h3>
                    
                    {/* POST /chat */}
                    <div className="card overflow-hidden mb-4">
                      <div className="glass-strong px-6 py-4 flex items-center gap-4 border-b border-white/5">
                        <span className="px-3 py-1.5 rounded-lg bg-emerald-500 text-black text-xs font-bold">POST</span>
                        <code className="text-lg font-mono">/chat</code>
                        <span className="text-gray-400 text-sm ml-auto hidden sm:inline">Enviar mensagem para o agente</span>
                      </div>
                      <div className="p-6">
                        <p className="text-gray-400 mb-4">Envia uma mensagem para o agente.gpt e recebe a resposta da IA.</p>
                        <div className="grid lg:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-300 mb-3">Request Body</h4>
                            <div className="code-block rounded-xl p-4 overflow-x-auto">
                              <pre className="text-sm"><code>{`{
  "user_id": "5512996341928",
  "message": "Quais são os planos?",
  "temperature": 0.4
}`}</code></pre>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-300 mb-3">Response</h4>
                            <div className="code-block rounded-xl p-4 overflow-x-auto">
                              <pre className="text-sm"><code>{`{
  "reply": "Olá! Temos 3 planos...",
  "tokens_used": 150,
  "response_time": 0.342
}`}</code></pre>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Examples Tab */}
              {docsTab === 'examples' && (
                <div className="animate-fade-up space-y-8">
                  <div className="card overflow-hidden">
                    <div className="glass-strong px-6 py-4 border-b border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Terminal className="w-5 h-5 text-[#00A8FF]" />
                        <span className="font-bold">Verificar Status</span>
                      </div>
                      <button onClick={() => copyCode('curl -X GET "https://api.agente-gpt.fly.dev/health"')} className="px-3 py-1.5 glass rounded-lg text-xs flex items-center gap-2 hover:bg-white/10">
                        <Copy className="w-3 h-3" /> Copiar
                      </button>
                    </div>
                    <div className="p-6">
                      <div className="code-block rounded-xl p-5 overflow-x-auto">
                        <pre className="text-sm text-gray-300"><code>curl -X GET "https://api.agente-gpt.fly.dev/health"</code></pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SDKs Tab */}
              {docsTab === 'sdks' && (
                <div className="animate-fade-up">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="card p-6">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-[#3776AB]/20 flex items-center justify-center">
                          <span className="text-2xl">🐍</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">Python</h3>
                          <p className="text-gray-400 text-sm">requests / httpx</p>
                        </div>
                      </div>
                      <div className="code-block rounded-xl p-4 overflow-x-auto mb-4">
                        <pre className="text-xs"><code>{`import requests

response = requests.post(
    "https://api.agente-gpt.fly.dev/metrics",
    headers={"X-ADMIN-TOKEN": token},
    json={
        "external_company_id": "emp-123",
        "revenue": 200000
    }
)`}</code></pre>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-10 card p-8 text-center">
                    <Package className="w-12 h-12 text-[#00A8FF] mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">SDKs Oficiais em breve</h3>
                    <p className="text-gray-400 mb-6">Estamos desenvolvendo SDKs oficiais para Python, Node.js e Go.</p>
                    <a href="https://wa.me/5512996341928?text=Quero%20saber%20quando%20os%20SDKs%20estiverem%20prontos" target="_blank" className="btn-primary px-6 py-3 rounded-xl inline-flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      Me avise quando sair
                    </a>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ANALYTICS PAGE */}
        {activePage === 'analytics' && (
          <section className="min-h-screen py-10 animate-fade-up">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
                <div>
                  <h1 className="text-3xl font-bold text-gradient">Analytics</h1>
                  <p className="text-gray-400 mt-1">ALIANCI.A Business Intelligence</p>
                </div>
                <div className="flex items-center gap-4">
                  <select className="px-4 py-3 glass rounded-xl bg-transparent border-none focus:outline-none">
                    <option value="7d">Últimos 7 dias</option>
                    <option value="30d">Últimos 30 dias</option>
                    <option value="90d">Últimos 90 dias</option>
                  </select>
                  <button className="p-3 glass rounded-xl hover:bg-white/10"><RefreshCw className="w-5 h-5" /></button>
                </div>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="stat-card card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400 text-sm">Faturamento</span>
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-emerald-500" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-black">R$ 2.4M</h2>
                  <div className="flex items-center gap-2 mt-2 text-sm">
                    <span className="text-emerald-400 flex items-center gap-1"><TrendingUp className="w-4 h-4" />+18%</span>
                    <span className="text-gray-500">vs mês anterior</span>
                  </div>
                </div>

                <div className="stat-card card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400 text-sm">Empresas Ativas</span>
                    <div className="w-10 h-10 rounded-xl bg-[#00A8FF]/10 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-[#00A8FF]" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-black">527</h2>
                  <div className="flex items-center gap-2 mt-2 text-sm">
                    <span className="text-emerald-400 flex items-center gap-1"><TrendingUp className="w-4 h-4" />+32</span>
                    <span className="text-gray-500">este mês</span>
                  </div>
                </div>

                <div className="stat-card card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400 text-sm">Cashback Dist.</span>
                    <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center">
                      <Gift className="w-5 h-5 text-[#7C3AED]" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-black">R$ 847K</h2>
                  <div className="flex items-center gap-2 mt-2 text-sm">
                    <span className="text-emerald-400 flex items-center gap-1"><TrendingUp className="w-4 h-4" />+24%</span>
                    <span className="text-gray-500">vs mês anterior</span>
                  </div>
                </div>

                <div className="stat-card card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400 text-sm">Eventos/Dia</span>
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-amber-500" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-black">12.8K</h2>
                  <div className="flex items-center gap-2 mt-2 text-sm">
                    <span className="text-emerald-400 flex items-center gap-1"><TrendingUp className="w-4 h-4" />+45%</span>
                    <span className="text-gray-500">vs mês anterior</span>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Chart */}
                <div className="lg:col-span-2 card p-6">
                  <h3 className="font-bold mb-6 flex items-center gap-3"><BarChart3 className="w-5 h-5 text-[#00A8FF]" />Faturamento Mensal</h3>
                  <div className="chart-container h-[300px]">
                    <Bar data={chartData} options={chartOptions} />
                  </div>
                </div>

                {/* Top Companies */}
                <div className="card p-6">
                  <h3 className="font-bold mb-6 flex items-center gap-3"><Trophy className="w-5 h-5 text-amber-500" />Top Empresas</h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Tech Solutions', val: 'R$ 324K', color: 'from-amber-400 to-orange-500' },
                      { name: 'Digital Corp', val: 'R$ 287K', color: 'from-gray-300 to-gray-400' },
                      { name: 'Innovate Ltd', val: 'R$ 245K', color: 'from-amber-600 to-amber-700' },
                      { name: 'Smart Systems', val: 'R$ 198K', color: 'bg-white/10' },
                      { name: 'Cloud Nine', val: 'R$ 176K', color: 'bg-white/10' },
                    ].map((c, i) => (
                      <div key={i} className="flex items-center justify-between p-3 glass rounded-xl">
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-lg ${c.color.includes('bg-') ? c.color : 'bg-gradient-to-br ' + c.color} flex items-center justify-center text-sm font-bold text-black`}>{i + 1}</span>
                          <span className="font-medium">{c.name}</span>
                        </div>
                        <span className="text-emerald-400 font-semibold">{c.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ADMIN PAGE */}
        {activePage === 'admin' && (
          <section className="min-h-screen py-10 animate-fade-up">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
                <div>
                  <h1 className="text-3xl font-bold text-gradient">Dashboard</h1>
                  <p className="text-gray-400 mt-1">agente.gpt Ultra Enterprise</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 px-5 py-3 glass rounded-xl">
                    <div className="relative w-3 h-3">
                      <span className="absolute inset-0 bg-emerald-500 rounded-full"></span>
                      <span className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75"></span>
                    </div>
                    <span className="text-sm font-medium">Sistema Operacional</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="stat-card card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400 text-sm">Usuários</span>
                    <div className="w-10 h-10 rounded-xl bg-[#00A8FF]/10 flex items-center justify-center"><Users className="w-5 h-5 text-[#00A8FF]" /></div>
                  </div>
                  <h2 className="text-4xl font-black">{adminStats.users.toLocaleString('pt-BR')}</h2>
                  <div className="flex items-center gap-2 mt-2 text-sm"><span className="text-emerald-400">+12%</span><span className="text-gray-500">este mês</span></div>
                </div>
                <div className="stat-card card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400 text-sm">Mensagens</span>
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center"><Bot className="w-5 h-5 text-emerald-500" /></div>
                  </div>
                  <h2 className="text-4xl font-black">{adminStats.messages.toLocaleString('pt-BR')}</h2>
                  <div className="flex items-center gap-2 mt-2 text-sm"><span className="text-emerald-400">+28%</span><span className="text-gray-500">este mês</span></div>
                </div>
                <div className="stat-card card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400 text-sm">Tempo Médio</span>
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center"><Clock className="w-5 h-5 text-amber-500" /></div>
                  </div>
                  <h2 className="text-4xl font-black">0.3s</h2>
                  <div className="flex items-center gap-2 mt-2 text-sm"><span className="text-emerald-400">-0.2s</span><span className="text-gray-500">melhoria</span></div>
                </div>
                <div className="stat-card card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400 text-sm">Satisfação</span>
                    <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center"><Heart className="w-5 h-5 text-[#7C3AED]" /></div>
                  </div>
                  <h2 className="text-4xl font-black">98.7%</h2>
                  <div className="flex items-center gap-2 mt-2 text-sm"><span className="text-emerald-400">+2.1%</span><span className="text-gray-500">este mês</span></div>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Activity */}
                <div className="lg:col-span-2 card overflow-hidden">
                  <div className="glass-strong px-6 py-4 border-b border-white/5 flex items-center justify-between">
                    <h3 className="font-bold flex items-center gap-3"><Activity className="w-5 h-5 text-[#00A8FF]" />Atividade Recente</h3>
                    <button className="text-sm text-[#00A8FF] hover:underline">Ver tudo</button>
                  </div>
                  <div className="divide-y divide-white/5">
                    {[
                      { name: 'João C.', initials: 'JC', color: 'from-blue-500 to-purple-500', msg: 'Olá, gostaria de saber sobre os planos...', time: '2 min', status: 'Respondido' },
                      { name: 'Maria S.', initials: 'MS', color: 'from-pink-500 to-rose-500', msg: 'Como integro com meu CRM?', time: '5 min', status: 'Pendente' },
                      { name: 'Pedro L.', initials: 'PL', color: 'from-green-500 to-emerald-500', msg: 'Qual o horário de atendimento?', time: '12 min', status: 'Respondido' },
                      { name: 'Ana C.', initials: 'AC', color: 'from-orange-500 to-amber-500', msg: 'Obrigada pelo excelente atendimento!', time: '18 min', status: 'Respondido' },
                      { name: 'Roberto F.', initials: 'RF', color: 'from-cyan-500 to-blue-500', msg: 'Preciso de ajuda com a API...', time: '25 min', status: 'Respondido' },
                    ].map((u, i) => (
                      <div key={i} className="table-row px-6 py-4 flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${u.color} flex items-center justify-center text-sm font-bold`}>{u.initials}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold truncate">{u.name}</span>
                            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{u.time}</span>
                          </div>
                          <p className="text-sm text-gray-400 truncate">{u.msg}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full ${u.status === 'Respondido' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'} text-xs`}>{u.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Status */}
                <div className="card p-6">
                  <h3 className="font-bold flex items-center gap-3 mb-6"><Terminal className="w-5 h-5 text-[#00A8FF]" />Status do Sistema</h3>
                  <div className="space-y-5">
                    {[
                      { name: 'API Gateway', status: 'Operacional', color: 'text-emerald-400', val: 100 },
                      { name: 'WhatsApp Cloud', status: 'Conectado', color: 'text-emerald-400', val: 100 },
                      { name: 'OpenAI GPT-4o', status: 'Ativo', color: 'text-emerald-400', val: 100 },
                      { name: 'PostgreSQL', status: 'Online', color: 'text-emerald-400', val: 100 },
                    ].map((s, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-2"><span className="text-gray-400">{s.name}</span><span className={`${s.color} font-semibold`}>{s.status}</span></div>
                        <div className="progress-bar"><div className="progress-fill" style={{width: `${s.val}%`}}></div></div>
                      </div>
                    ))}
                    <hr className="border-white/5 my-4" />
                    {[
                      { name: 'CPU', val: 18 },
                      { name: 'Memória', val: 42 },
                      { name: 'Disco', val: 29 },
                    ].map((s, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-2"><span className="text-gray-400">{s.name}</span><span className="text-[#00A8FF]">{s.val}%</span></div>
                        <div className="progress-bar"><div className="progress-fill" style={{width: `${s.val}%`}}></div></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl orb flex items-center justify-center"><span className="font-black text-white text-sm">GPT</span></div>
                <div><h3 className="text-xl font-bold text-gradient">agente.gpt</h3><p className="text-xs text-gray-500">ULTRA ENTERPRISE</p></div>
              </div>
              <p className="text-gray-400 max-w-sm mb-6">Plataforma de IA conversacional enterprise do ecossistema EXTRAORDINÁRI.A • ALIANCI.A.</p>
              <div className="flex items-center gap-4">
                <a href="https://wa.me/5512996341928" target="_blank" className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-white/10">
                  <Phone className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-white/10"><Github className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-white/10"><Linkedin className="w-5 h-5" /></a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Produto</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('home'); }} className="hover:text-white">Recursos</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('planos'); }} className="hover:text-white">Preços</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('docs'); }} className="hover:text-white">API</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('analytics'); }} className="hover:text-white">Analytics</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Suporte</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="https://wa.me/5512996341928" target="_blank" className="hover:text-white">WhatsApp</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
                <li><a href="#" className="hover:text-white">Termos</a></li>
                <li><a href="#" className="hover:text-white">Privacidade</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">© 2024 agente.gpt – EXTRAORDINÁRI.A • ALIANCI.A</p>
            <p className="text-sm text-gray-600">Feito com 💙 em São Paulo</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

