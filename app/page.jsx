"use client";
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Initialize Lucide icons
    if (window.lucide) window.lucide.createIcons();

    // Navigation
    window.showPage = function(page) {
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      document.getElementById('page-' + page).classList.add('active');
      document.querySelectorAll('.nav-item').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) link.classList.add('active');
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (page === 'admin') { setTimeout(() => { window.animateValue('statUsers', 0, 2847, 2000); window.animateValue('statMessages', 0, 48291, 2500); window.loadActivity(); }, 300); }
      if (page === 'analytics') { setTimeout(window.initChart, 300); }
    };

    window.toggleMobileMenu = function() { document.getElementById('mobileMenu').classList.toggle('hidden'); };

    // Chat Logic
    window.responses = {
      'quem é você': `Sou o **agente.gpt** – versão **ULTRA ENTERPRISE**! 🚀\n\nFaço parte do ecossistema **EXTRAORDINÁRI.A • ALIANCI.A** e ofereço:\n\n• 🎯 Atendimento Premium 24/7\n• ⚡ Respostas em menos de 1 segundo\n• 🔒 Segurança Enterprise (LGPD)\n• 📊 Analytics integrado\n\n**WhatsApp Oficial:** https://wa.me/5512996341928`,
      'planos': `📋 **PLANOS agente.gpt**\n\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n🔹 **PROFISSIONAL** – R$ 197/mês\n• 1.000 mensagens\n• 1 WhatsApp\n• GPT-4o Mini\n\n🔹 **EMPRESARIAL** – R$ 497/mês ⭐\n• 10.000 mensagens\n• 3 WhatsApp\n• GPT-4o Turbo\n• Analytics + API\n\n🔹 **ENTERPRISE** – Sob consulta\n• Ilimitado + Power BI\n\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n💬 **Contratar:** https://wa.me/5512996341928`,
      'suporte': `🎧 **SUPORTE agente.gpt**\n\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n📱 **WhatsApp (24/7)**\nhttps://wa.me/5512996341928\n\n📊 **Status:** Todos sistemas ✅\n\n━━━━━━━━━━━━━━━━━━━━━━━━`,
      'api': `🔌 **API agente.gpt**\n\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n**Base URL:**\n\`https://api.agente-gpt.fly.dev\`\n\n**Endpoints:**\n• POST /chat\n• POST /companies\n• POST /metrics\n• POST /events\n• GET /health\n\n**Auth:** X-ADMIN-TOKEN\n\n━━━━━━━━━━━━━━━━━━━━━━━━\n\nDocumentação completa na aba API!`,
      'default': `Obrigado pela mensagem! 😊\n\nPosso ajudar com:\n• 📋 **Planos** e preços\n• 🎧 **Suporte** técnico\n• 🔌 **API** e integrações\n• 📊 **Analytics** e métricas\n\n**WhatsApp direto:** https://wa.me/5512996341928`
    };

    window.getResponse = function(msg) {
      const l = msg.toLowerCase();
      if (l.includes('quem') && l.includes('você')) return window.responses['quem é você'];
      if (l.includes('plano') || l.includes('preço')) return window.responses['planos'];
      if (l.includes('suporte') || l.includes('ajuda')) return window.responses['suporte'];
      if (l.includes('api') || l.includes('integra')) return window.responses['api'];
      return window.responses['default'];
    };

    window.formatMsg = function(c) {
      return c.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>').replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 bg-white/10 rounded text-[#00A8FF] text-sm">$1</code>').replace(/\n/g, '<br>').replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" class="text-[#00A8FF] hover:underline">$1</a>');
    };

    window.addMessage = function(content, isUser = false) {
      const chat = document.getElementById('chatMessages');
      const div = document.createElement('div');
      div.className = `flex gap-4 ${isUser ? 'flex-row-reverse' : ''} animate-fade-up`;
      const avatar = isUser ? `<div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold flex-shrink-0">EU</div>` : `<div class="w-10 h-10 rounded-xl orb flex items-center justify-center text-xs font-bold text-white flex-shrink-0">GPT</div>`;
      div.innerHTML = `${avatar}<div class="${isUser ? 'bubble-user' : 'bubble-agent'} px-5 py-4 max-w-[80%]">${window.formatMsg(content)}</div>`;
      chat.appendChild(div);
      chat.scrollTop = chat.scrollHeight;
    };

    window.showTyping = function(show) { document.getElementById('typingIndicator').classList.toggle('hidden', !show); };

    window.sendMessage = async function() {
      const input = document.getElementById('chatInput');
      const msg = input.value.trim();
      if (!msg) return;
      window.addMessage(msg, true);
      input.value = '';
      window.showTyping(true);
      await new Promise(r => setTimeout(r, 600 + Math.random() * 800));
      window.showTyping(false);
      window.addMessage(window.getResponse(msg), false);
    };

    window.sendQuickMessage = function(msg) { document.getElementById('chatInput').value = msg; window.sendMessage(); };
    window.clearChat = function() { document.getElementById('chatMessages').innerHTML = '<div class="flex gap-4"><div class="w-10 h-10 rounded-xl orb flex items-center justify-center text-xs font-bold text-white flex-shrink-0">GPT</div><div class="bubble-agent px-5 py-4 max-w-[80%]"><p>Conversa reiniciada! Como posso ajudar? 👋</p></div></div>'; };

    // Pricing Logic
    window.togglePricing = function(type) {
      document.getElementById('btnMonthly').classList.toggle('active', type === 'monthly');
      document.getElementById('btnAnnual').classList.toggle('active', type === 'annual');
      document.querySelectorAll('.pricing-value').forEach(p => { p.textContent = 'R$ ' + p.dataset[type]; });
    };

    // Animation Logic
    window.animateValue = function(id, start, end, duration) {
      const obj = document.getElementById(id);
      if (!obj) return;
      let startTime = null;
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        obj.textContent = Math.floor(progress * (end - start) + start).toLocaleString('pt-BR');
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    // Activity Logic
    window.loadActivity = function() {
      const users = [
        { name: 'João C.', initials: 'JC', color: 'from-blue-500 to-purple-500', msg: 'Olá, gostaria de saber sobre os planos...', time: '2 min', status: 'Respondido' },
        { name: 'Maria S.', initials: 'MS', color: 'from-pink-500 to-rose-500', msg: 'Como integro com meu CRM?', time: '5 min', status: 'Pendente' },
        { name: 'Pedro L.', initials: 'PL', color: 'from-green-500 to-emerald-500', msg: 'Qual o horário de atendimento?', time: '12 min', status: 'Respondido' },
        { name: 'Ana C.', initials: 'AC', color: 'from-orange-500 to-amber-500', msg: 'Obrigada pelo excelente atendimento!', time: '18 min', status: 'Respondido' },
        { name: 'Roberto F.', initials: 'RF', color: 'from-cyan-500 to-blue-500', msg: 'Preciso de ajuda com a API...', time: '25 min', status: 'Respondido' },
      ];
      const list = document.getElementById('activityList');
      if (list) {
        list.innerHTML = users.map(u => `<div class="table-row px-6 py-4 flex items-center gap-4"><div class="w-10 h-10 rounded-full bg-gradient-to-br ${u.color} flex items-center justify-center text-sm font-bold">${u.initials}</div><div class="flex-1 min-w-0"><div class="flex items-center justify-between"><span class="font-semibold truncate">${u.name}</span><span class="text-xs text-gray-500 whitespace-nowrap ml-2">${u.time}</span></div><p class="text-sm text-gray-400 truncate">${u.msg}</p></div><span class="px-2 py-1 rounded-full ${u.status === 'Respondido' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'} text-xs">${u.status}</span></div>`).join('');
      }
    };

    // Chart Logic
    window.initChart = function() {
      const ctx = document.getElementById('revenueChart');
      if (!ctx || !window.Chart) return;
      // Destroy existing chart if any to avoid duplicates
      if (window.myRevenueChart) window.myRevenueChart.destroy();
      
      window.myRevenueChart = new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
          datasets: [{
            label: 'Faturamento (R$)',
            data: [180000, 220000, 195000, 280000, 320000, 420000],
            backgroundColor: 'rgba(0, 168, 255, 0.5)',
            borderColor: '#00A8FF',
            borderWidth: 2,
            borderRadius: 8,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#666' } },
            x: { grid: { display: false }, ticks: { color: '#666' } }
          }
        }
      });
    };

    // Docs Tabs Logic
    window.showDocsTab = function(tab) {
      document.querySelectorAll('.docs-content').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('.docs-tab').forEach(t => t.classList.remove('active', 'bg-[#00A8FF]', 'text-black'));
      document.getElementById('docs-' + tab).classList.remove('hidden');
      document.querySelector(`.docs-tab[data-tab="${tab}"]`).classList.add('active', 'bg-[#00A8FF]', 'text-black');
      if (window.lucide) window.lucide.createIcons();
    };

    // Copy Code Logic
    window.copyCode = function(text) {
      navigator.clipboard.writeText(text.trim()).then(() => {
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-6 right-6 px-6 py-3 glass rounded-xl text-sm font-medium flex items-center gap-2 z-50 animate-fade-up';
        toast.innerHTML = '<svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Copiado!';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
      });
    };

  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: `
      <!-- Background Effects -->
      <div class="fixed inset-0 pointer-events-none">
        <div class="absolute inset-0 bg-mesh"></div>
        <div class="absolute inset-0 bg-grid"></div>
        <div class="absolute inset-0 bg-noise"></div>
      </div>

      <!-- Header -->
      <header class="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div class="max-w-7xl mx-auto px-6">
          <div class="flex items-center justify-between h-20">
            <!-- Logo -->
            <a href="#" onclick="showPage('home')" class="flex items-center gap-4 group">
              <div class="relative">
                <div class="w-14 h-14 rounded-2xl orb flex items-center justify-center animate-pulse-glow">
                  <span class="font-black text-white text-lg logo-text drop-shadow-lg">GPT</span>
                </div>
                <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#010204] status-dot"></div>
              </div>
              <div class="hidden sm:block">
                <h1 class="text-xl font-bold text-gradient logo-text">agente.gpt</h1>
                <p class="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-medium">ULTRA ENTERPRISE</p>
              </div>
            </a>

            <!-- Desktop Nav -->
            <nav class="hidden lg:flex items-center gap-2">
              <a href="#" onclick="showPage('home')" class="nav-item active" data-page="home">Início</a>
              <a href="#" onclick="showPage('agente')" class="nav-item" data-page="agente">Agente IA</a>
              <a href="#" onclick="showPage('planos')" class="nav-item" data-page="planos">Planos</a>
              <a href="#" onclick="showPage('docs')" class="nav-item" data-page="docs">API</a>
              <a href="#" onclick="showPage('analytics')" class="nav-item" data-page="analytics">Analytics</a>
              <a href="#" onclick="showPage('admin')" class="nav-item" data-page="admin">Dashboard</a>
            </nav>

            <!-- Actions -->
            <div class="flex items-center gap-4">
              <a href="https://wa.me/5512996341928" target="_blank" class="hidden md:flex btn-whatsapp items-center gap-2 px-5 py-3 rounded-xl text-sm">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <span class="font-semibold">WhatsApp</span>
              </a>
              <button onclick="toggleMobileMenu()" class="lg:hidden p-3 glass rounded-xl">
                <i data-lucide="menu" class="w-6 h-6"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div id="mobileMenu" class="hidden lg:hidden glass-strong border-t border-white/5">
          <nav class="px-6 py-6 space-y-2">
            <a href="#" onclick="showPage('home'); toggleMobileMenu()" class="block py-3 px-4 rounded-xl hover:bg-white/5">Início</a>
            <a href="#" onclick="showPage('agente'); toggleMobileMenu()" class="block py-3 px-4 rounded-xl hover:bg-white/5">Agente IA</a>
            <a href="#" onclick="showPage('planos'); toggleMobileMenu()" class="block py-3 px-4 rounded-xl hover:bg-white/5">Planos</a>
            <a href="#" onclick="showPage('docs'); toggleMobileMenu()" class="block py-3 px-4 rounded-xl hover:bg-white/5">API</a>
            <a href="#" onclick="showPage('analytics'); toggleMobileMenu()" class="block py-3 px-4 rounded-xl hover:bg-white/5">Analytics</a>
            <a href="#" onclick="showPage('admin'); toggleMobileMenu()" class="block py-3 px-4 rounded-xl hover:bg-white/5">Dashboard</a>
            <a href="https://wa.me/5512996341928" target="_blank" class="flex btn-whatsapp items-center justify-center gap-2 py-4 rounded-xl mt-4">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Falar no WhatsApp
            </a>
          </nav>
        </div>
      </header>

      <main class="pt-20 relative z-10">
    <!-- ==================== HOME PAGE ==================== -->
    <section id="page-home" class="page active">
      <!-- Hero -->
      <div class="min-h-[95vh] flex items-center relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-6 py-20 w-full">
          <div class="grid lg:grid-cols-2 gap-20 items-center">
            <!-- Left -->
            <div class="space-y-8">
              <div class="inline-flex items-center gap-3 px-5 py-2.5 glass rounded-full animate-fade-up" style="animation-delay: 0.1s">
                <span class="relative flex h-2.5 w-2.5">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span class="text-sm font-medium text-gray-300">ULTRA ENTERPRISE • v2.0 Online</span>
              </div>

              <h1 class="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] animate-fade-up" style="animation-delay: 0.2s">
                <span class="text-white">Conheça o</span><br>
                <span class="text-gradient glow-text">agente.gpt</span>
              </h1>

              <p class="text-xl text-gray-400 leading-relaxed max-w-xl animate-fade-up" style="animation-delay: 0.3s">
                Plataforma de <strong class="text-white">Inteligência Artificial Conversacional</strong> com 
                <strong class="text-white">Analytics Avançado</strong> do ecossistema 
                <span class="text-shimmer font-semibold">EXTRAORDINÁRI.A • ALIANCI.A</span>
              </p>

              <div class="flex flex-wrap gap-4 animate-fade-up" style="animation-delay: 0.4s">
                <button onclick="showPage('agente')" class="btn-primary px-8 py-4 rounded-2xl text-lg flex items-center gap-3">
                  <i data-lucide="bot" class="w-5 h-5"></i>
                  Falar com Agente
                </button>
                <a href="https://wa.me/5512996341928" target="_blank" class="btn-secondary px-8 py-4 rounded-2xl text-lg flex items-center gap-3">
                  <i data-lucide="phone" class="w-5 h-5"></i>
                  WhatsApp Direto
                </a>
              </div>

              <!-- Stats -->
              <div class="grid grid-cols-4 gap-6 pt-8 animate-fade-up" style="animation-delay: 0.5s">
                <div class="text-center">
                  <h3 class="text-3xl font-black text-white">99.9%</h3>
                  <p class="text-xs text-gray-500 mt-1">Uptime SLA</p>
                </div>
                <div class="text-center">
                  <h3 class="text-3xl font-black text-white">&lt;1s</h3>
                  <p class="text-xs text-gray-500 mt-1">Resposta</p>
                </div>
                <div class="text-center">
                  <h3 class="text-3xl font-black text-white">500+</h3>
                  <p class="text-xs text-gray-500 mt-1">Empresas</p>
                </div>
                <div class="text-center">
                  <h3 class="text-3xl font-black text-white">24/7</h3>
                  <p class="text-xs text-gray-500 mt-1">Disponível</p>
                </div>
              </div>
            </div>

            <!-- Right - Visual -->
            <div class="relative hidden lg:block">
              <div class="relative w-full aspect-square max-w-lg mx-auto">
                <!-- Orb Central -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="w-72 h-72 rounded-full bg-gradient-radial opacity-30 blur-3xl" style="background: radial-gradient(circle, rgba(0,168,255,0.4) 0%, transparent 70%);"></div>
                </div>
                <div class="absolute inset-0 flex items-center justify-center animate-float">
                  <div class="w-44 h-44 rounded-full orb animate-pulse-glow flex items-center justify-center">
                    <span class="text-5xl font-black text-white drop-shadow-2xl logo-text">GPT</span>
                  </div>
                </div>

                <!-- Orbiting Elements -->
                <div class="absolute w-full h-full animate-rotate-slow">
                  <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 glass rounded-2xl p-4">
                    <i data-lucide="brain" class="w-8 h-8 text-[#00A8FF]"></i>
                  </div>
                </div>
                <div class="absolute w-full h-full animate-rotate-slow" style="animation-duration: 25s; animation-direction: reverse;">
                  <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 glass rounded-2xl p-4">
                    <i data-lucide="message-square" class="w-8 h-8 text-[#7C3AED]"></i>
                  </div>
                </div>
                <div class="absolute w-full h-full animate-rotate-slow" style="animation-duration: 30s;">
                  <div class="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 glass rounded-2xl p-4">
                    <i data-lucide="bar-chart-3" class="w-8 h-8 text-[#10B981]"></i>
                  </div>
                </div>

                <!-- Rings -->
                <svg class="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                  <circle cx="200" cy="200" r="140" fill="none" stroke="rgba(0,168,255,0.1)" stroke-width="1"/>
                  <circle cx="200" cy="200" r="170" fill="none" stroke="rgba(124,58,237,0.08)" stroke-width="1" stroke-dasharray="8 8"/>
                  <circle cx="200" cy="200" r="195" fill="none" stroke="rgba(0,168,255,0.05)" stroke-width="1" stroke-dasharray="4 12"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Features -->
      <div class="py-32 relative">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-20">
            <span class="inline-block px-4 py-2 glass rounded-full text-sm text-[#00A8FF] mb-6">RECURSOS ENTERPRISE</span>
            <h2 class="text-4xl sm:text-5xl font-bold mb-6">
              Por que empresas escolhem <span class="text-gradient">agente.gpt</span>?
            </h2>
            <p class="text-xl text-gray-400 max-w-2xl mx-auto">
              Tecnologia de ponta + Analytics avançado = Resultados extraordinários
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="card card-glow p-8 group">
              <div class="feature-icon w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <i data-lucide="cpu" class="w-8 h-8 text-[#00A8FF]"></i>
              </div>
              <h3 class="text-xl font-bold mb-4">GPT-4o Turbo</h3>
              <p class="text-gray-400">IA mais avançada do mercado. Respostas contextuais, precisas e humanizadas em milissegundos.</p>
            </div>

            <div class="card card-glow p-8 group">
              <div class="feature-icon w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <i data-lucide="smartphone" class="w-8 h-8 text-[#7C3AED]"></i>
              </div>
              <h3 class="text-xl font-bold mb-4">WhatsApp Cloud API</h3>
              <p class="text-gray-400">Integração oficial Meta. Atenda milhares de clientes simultaneamente no app que eles usam.</p>
            </div>

            <div class="card card-glow p-8 group">
              <div class="feature-icon w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <i data-lucide="bar-chart-3" class="w-8 h-8 text-[#10B981]"></i>
              </div>
              <h3 class="text-xl font-bold mb-4">Analytics Avançado</h3>
              <p class="text-gray-400">Dashboard com métricas em tempo real. Integração Power BI. KPIs que impulsionam decisões.</p>
            </div>

            <div class="card card-glow p-8 group">
              <div class="feature-icon w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <i data-lucide="zap" class="w-8 h-8 text-[#F59E0B]"></i>
              </div>
              <h3 class="text-xl font-bold mb-4">Resposta Instantânea</h3>
              <p class="text-gray-400">Infraestrutura edge otimizada. Latência sub-segundo garantida em qualquer escala.</p>
            </div>

            <div class="card card-glow p-8 group">
              <div class="feature-icon w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <i data-lucide="shield-check" class="w-8 h-8 text-[#EF4444]"></i>
              </div>
              <h3 class="text-xl font-bold mb-4">Segurança Enterprise</h3>
              <p class="text-gray-400">Criptografia E2E, LGPD compliant, SOC 2 Type II. Seus dados blindados.</p>
            </div>

            <div class="card card-glow p-8 group">
              <div class="feature-icon w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <i data-lucide="plug" class="w-8 h-8 text-[#00A8FF]"></i>
              </div>
              <h3 class="text-xl font-bold mb-4">API RESTful</h3>
              <p class="text-gray-400">Documentação completa. SDKs Python, Node, Go. Integre em minutos.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tech Stack -->
      <div class="py-20 glass-strong">
        <div class="max-w-7xl mx-auto px-6">
          <p class="text-center text-gray-400 mb-10 text-sm uppercase tracking-widest">Powered by</p>
          <div class="flex flex-wrap justify-center items-center gap-12 opacity-50">
            <span class="text-2xl font-bold">OpenAI</span>
            <span class="text-2xl font-bold">FastAPI</span>
            <span class="text-2xl font-bold">PostgreSQL</span>
            <span class="text-2xl font-bold">Redis</span>
            <span class="text-2xl font-bold">Docker</span>
            <span class="text-2xl font-bold">Fly.io</span>
            <span class="text-2xl font-bold">Power BI</span>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="py-32">
        <div class="max-w-4xl mx-auto px-6">
          <div class="card p-12 md:p-16 text-center relative overflow-hidden glow-box">
            <div class="absolute inset-0 opacity-30" style="background: radial-gradient(ellipse at center, rgba(0,168,255,0.3) 0%, transparent 70%);"></div>
            <div class="relative z-10">
              <h2 class="text-4xl sm:text-5xl font-bold mb-6">
                Pronto para <span class="text-gradient">revolucionar</span>?
              </h2>
              <p class="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
                Junte-se a 500+ empresas que transformaram seu atendimento com IA.
              </p>
              <div class="flex flex-wrap justify-center gap-4">
                <a href="https://wa.me/5512996341928?text=Quero%20conhecer%20o%20agente.gpt" target="_blank" class="btn-whatsapp px-10 py-5 rounded-2xl text-lg flex items-center gap-3">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Começar Agora
                </a>
                <button onclick="showPage('planos')" class="btn-secondary px-10 py-5 rounded-2xl text-lg">
                  Ver Planos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ==================== AGENTE PAGE ==================== -->
    <section id="page-agente" class="page">
      <div class="max-w-7xl mx-auto px-6 py-12 h-[calc(100vh-100px)] flex flex-col">
        <div class="text-center mb-8 animate-fade-up">
          <h2 class="text-3xl font-bold mb-2">Converse com <span class="text-gradient">agente.gpt</span></h2>
          <p class="text-gray-400">Experimente o poder da IA em tempo real.</p>
        </div>

        <div class="flex-1 bg-[#0F172A] rounded-3xl border border-gray-800 overflow-hidden flex flex-col shadow-2xl animate-fade-up" style="animation-delay: 0.1s">
          <!-- Chat Header -->
          <div class="p-4 border-b border-gray-800 bg-[#1E293B]/50 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#00A8FF] to-[#7C3AED] flex items-center justify-center">
                <i data-lucide="bot" class="w-6 h-6 text-white"></i>
              </div>
              <div>
                <h3 class="font-bold text-white">Assistente Virtual</h3>
                <div class="flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span class="text-xs text-emerald-500 font-medium">Online</span>
                </div>
              </div>
            </div>
            <button class="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white">
              <i data-lucide="more-vertical" class="w-5 h-5"></i>
            </button>
          </div>

          <!-- Chat Messages -->
          <div id="chat-messages" class="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
            <!-- Welcome Message -->
            <div class="flex gap-4 animate-fade-up">
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-[#00A8FF] to-[#7C3AED] flex-shrink-0 flex items-center justify-center mt-1">
                <i data-lucide="bot" class="w-5 h-5 text-white"></i>
              </div>
              <div class="bg-[#1E293B] p-4 rounded-2xl rounded-tl-none max-w-[80%] border border-gray-700">
                <p class="text-gray-300 leading-relaxed">
                  Olá! Sou o <strong>agente.gpt</strong>. Como posso ajudar sua empresa a crescer hoje? 🚀
                </p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <button onclick="document.getElementById('user-input').value='Como funciona a integração?'; sendMessage()" class="text-xs bg-[#0F172A] hover:bg-[#334155] px-3 py-1.5 rounded-full transition-colors text-[#00A8FF] border border-[#00A8FF]/20">
                    Integração WhatsApp
                  </button>
                  <button onclick="document.getElementById('user-input').value='Quais os planos?'; sendMessage()" class="text-xs bg-[#0F172A] hover:bg-[#334155] px-3 py-1.5 rounded-full transition-colors text-[#00A8FF] border border-[#00A8FF]/20">
                    Ver Planos
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Chat Input -->
          <div class="p-4 bg-[#1E293B]/50 border-t border-gray-800">
            <div class="relative flex items-center gap-2">
              <button class="p-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                <i data-lucide="paperclip" class="w-5 h-5"></i>
              </button>
              <input 
                type="text" 
                id="user-input" 
                placeholder="Digite sua mensagem..." 
                class="flex-1 bg-[#0F172A] border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#00A8FF] focus:ring-1 focus:ring-[#00A8FF] transition-all placeholder-gray-500"
                onkeypress="if(event.key === 'Enter') sendMessage()"
              >
              <button onclick="sendMessage()" class="p-3 bg-[#00A8FF] hover:bg-[#0096E6] text-white rounded-xl transition-colors shadow-lg shadow-[#00A8FF]/20">
                <i data-lucide="send" class="w-5 h-5"></i>
              </button>
            </div>
            <p class="text-center text-xs text-gray-600 mt-2">
              Powered by OpenAI GPT-4o & WhatsApp Cloud API
            </p>
          </div>
        </div>
      </div>
    </section>
    <!-- ==================== PLANOS PAGE ==================== -->
    <section id="page-planos" class="page">
      <div class="max-w-7xl mx-auto px-6 py-20">
        <div class="text-center mb-16 animate-fade-up">
          <h2 class="text-4xl font-bold mb-4">Planos Flexíveis</h2>
          <p class="text-xl text-gray-400 mb-8">Escolha a potência ideal para o seu negócio.</p>
          
          <!-- Toggle -->
          <div class="flex items-center justify-center gap-4 mb-8">
            <span class="text-gray-400" id="monthly-label">Mensal</span>
            <button onclick="toggleBilling()" class="w-16 h-8 bg-[#1E293B] rounded-full p-1 relative transition-colors border border-gray-700" id="billing-toggle">
              <div class="w-6 h-6 bg-[#00A8FF] rounded-full shadow-md transform transition-transform duration-300" id="billing-circle"></div>
            </button>
            <span class="text-white font-bold" id="yearly-label">Anual <span class="text-xs text-[#10B981] ml-1">-20%</span></span>
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Starter -->
          <div class="card p-8 hover:border-[#00A8FF]/50 transition-all duration-300 animate-fade-up" style="animation-delay: 0.1s">
            <h3 class="text-xl font-bold text-gray-400 mb-2">Starter</h3>
            <div class="flex items-baseline gap-1 mb-6">
              <span class="text-4xl font-bold text-white price-monthly">R$ 297</span>
              <span class="text-4xl font-bold text-white price-yearly hidden">R$ 237</span>
              <span class="text-gray-500">/mês</span>
            </div>
            <p class="text-sm text-gray-400 mb-6">Para pequenas empresas iniciando com IA.</p>
            <ul class="space-y-4 mb-8 text-gray-300">
              <li class="flex items-center gap-3"><i data-lucide="check" class="w-5 h-5 text-[#00A8FF]"></i> 1 Agente GPT-3.5</li>
              <li class="flex items-center gap-3"><i data-lucide="check" class="w-5 h-5 text-[#00A8FF]"></i> 1.000 msgs/mês</li>
              <li class="flex items-center gap-3"><i data-lucide="check" class="w-5 h-5 text-[#00A8FF]"></i> WhatsApp Web</li>
              <li class="flex items-center gap-3"><i data-lucide="check" class="w-5 h-5 text-[#00A8FF]"></i> Suporte Email</li>
            </ul>
            <button class="w-full btn-secondary py-3 rounded-xl font-bold">Começar Grátis</button>
          </div>

          <!-- Pro (Featured) -->
          <div class="card p-8 border-[#00A8FF] relative transform scale-105 shadow-2xl shadow-[#00A8FF]/10 animate-fade-up" style="animation-delay: 0.2s">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00A8FF] text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
              MAIS POPULAR
            </div>
            <h3 class="text-xl font-bold text-[#00A8FF] mb-2">Professional</h3>
            <div class="flex items-baseline gap-1 mb-6">
              <span class="text-5xl font-bold text-white price-monthly">R$ 597</span>
              <span class="text-5xl font-bold text-white price-yearly hidden">R$ 477</span>
              <span class="text-gray-500">/mês</span>
            </div>
            <p class="text-sm text-gray-400 mb-6">Para empresas em crescimento acelerado.</p>
            <ul class="space-y-4 mb-8 text-white">
              <li class="flex items-center gap-3"><i data-lucide="check" class="w-5 h-5 text-[#10B981]"></i> <strong>GPT-4o Turbo</strong></li>
              <li class="flex items-center gap-3"><i data-lucide="check" class="w-5 h-5 text-[#10B981]"></i> 10.000 msgs/mês</li>
              <li class="flex items-center gap-3"><i data-lucide="check" class="w-5 h-5 text-[#10B981]"></i> WhatsApp Oficial API</li>
              <li class="flex items-center gap-3"><i data-lucide="check" class="w-5 h-5 text-[#10B981]"></i> Dashboard Analytics</li>
              <li class="flex items-center gap-3"><i data-lucide="check" class="w-5 h-5 text-[#10B981]"></i> Treinamento Custom</li>
            </ul>
            <button class="w-full btn-primary py-4 rounded-xl font-bold shadow-lg shadow-[#00A8FF]/25">Assinar Agora</button>
          </div>

          <!-- Enterprise -->
          <div class="card p-8 hover:border-[#7C3AED]/50 transition-all duration-300 animate-fade-up" style="animation-delay: 0.3s">
            <h3 class="text-xl font-bold text-[#7C3AED] mb-2">Enterprise</h3>
            <div class="flex items-baseline gap-1 mb-6">
              <span class="text-4xl font-bold text-white">Sob Consulta</span>
            </div>
            <p class="text-sm text-gray-400 mb-6">Para grandes operações e customização total.</p>
            <ul class="space-y-4 mb-8 text-gray-300">
              <li class="flex items-center gap-3"><i data-lucide="check" class="w-5 h-5 text-[#7C3AED]"></i> Múltiplos Agentes</li>
              <li class="flex items-center gap-3"><i data-lucide="check" class="w-5 h-5 text-[#7C3AED]"></i> Mensagens Ilimitadas</li>
              <li class="flex items-center gap-3"><i data-lucide="check" class="w-5 h-5 text-[#7C3AED]"></i> API Dedicada</li>
              <li class="flex items-center gap-3"><i data-lucide="check" class="w-5 h-5 text-[#7C3AED]"></i> SLA Garantido</li>
              <li class="flex items-center gap-3"><i data-lucide="check" class="w-5 h-5 text-[#7C3AED]"></i> Gerente de Conta</li>
            </ul>
            <button class="w-full btn-secondary py-3 rounded-xl font-bold">Falar com Vendas</button>
          </div>
        </div>
      </div>
    </section>
    <!-- ==================== DOCS PAGE ==================== -->
    <section id="page-docs" class="page">
      <div class="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
        <!-- Sidebar -->
        <div class="lg:w-64 flex-shrink-0 hidden lg:block">
          <div class="sticky top-24 space-y-8">
            <div>
              <h3 class="font-bold text-white mb-4 px-2">Começando</h3>
              <ul class="space-y-1">
                <li><a href="#" class="block px-2 py-1.5 text-[#00A8FF] bg-[#00A8FF]/10 rounded-lg text-sm font-medium">Introdução</a></li>
                <li><a href="#" class="block px-2 py-1.5 text-gray-400 hover:text-white text-sm transition-colors">Autenticação</a></li>
                <li><a href="#" class="block px-2 py-1.5 text-gray-400 hover:text-white text-sm transition-colors">Quickstart</a></li>
              </ul>
            </div>
            <div>
              <h3 class="font-bold text-white mb-4 px-2">Endpoints</h3>
              <ul class="space-y-1">
                <li><a href="#" class="block px-2 py-1.5 text-gray-400 hover:text-white text-sm transition-colors">Chat Completions</a></li>
                <li><a href="#" class="block px-2 py-1.5 text-gray-400 hover:text-white text-sm transition-colors">Embeddings</a></li>
                <li><a href="#" class="block px-2 py-1.5 text-gray-400 hover:text-white text-sm transition-colors">Fine-tuning</a></li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <div class="prose prose-invert max-w-none">
            <h1 class="text-4xl font-bold mb-6">Documentação da API</h1>
            <p class="text-xl text-gray-400 mb-8">
              Integre a inteligência do agente.gpt em suas aplicações com nossa API RESTful de alta performance.
            </p>

            <!-- Code Block -->
            <div class="bg-[#0F172A] rounded-2xl border border-gray-800 overflow-hidden mb-12 shadow-xl">
              <div class="flex items-center justify-between px-4 py-3 bg-[#1E293B] border-b border-gray-800">
                <div class="flex gap-2">
                  <button onclick="switchTab('curl')" class="px-3 py-1 rounded-md text-xs font-medium bg-[#00A8FF] text-white transition-colors" id="tab-curl">cURL</button>
                  <button onclick="switchTab('python')" class="px-3 py-1 rounded-md text-xs font-medium text-gray-400 hover:text-white transition-colors" id="tab-python">Python</button>
                  <button onclick="switchTab('js')" class="px-3 py-1 rounded-md text-xs font-medium text-gray-400 hover:text-white transition-colors" id="tab-js">Node.js</button>
                </div>
                <button class="text-gray-400 hover:text-white transition-colors">
                  <i data-lucide="copy" class="w-4 h-4"></i>
                </button>
              </div>
              
              <div class="p-6 overflow-x-auto">
                <pre class="font-mono text-sm text-gray-300" id="code-curl"><code>curl https://api.agente-gpt.fly.dev/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $YOUR_API_KEY" \
  -d '{
    "model": "gpt-4o",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Hello!"}
    ]
  }'</code></pre>
                <pre class="font-mono text-sm text-gray-300 hidden" id="code-python"><code>import openai

client = openai.OpenAI(
    base_url="https://api.agente-gpt.fly.dev/v1",
    api_key="YOUR_API_KEY"
)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello!"}
    ]
)

print(response.choices[0].message.content)</code></pre>
                <pre class="font-mono text-sm text-gray-300 hidden" id="code-js"><code>import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://api.agente-gpt.fly.dev/v1',
  apiKey: 'YOUR_API_KEY'
});

const completion = await openai.chat.completions.create({
  messages: [{ role: 'system', content: 'You are a helpful assistant.' }],
  model: 'gpt-4o',
});

console.log(completion.choices[0].message.content);</code></pre>
              </div>
            </div>

            <h2 class="text-2xl font-bold mb-4">Autenticação</h2>
            <p class="text-gray-400 mb-4">
              A API usa chaves de API para autenticar solicitações. Você pode visualizar e gerenciar suas chaves de API no <a href="#" onclick="showPage('admin')" class="text-[#00A8FF] hover:underline">Dashboard</a>.
            </p>
            <div class="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-8">
              <div class="flex gap-3">
                <i data-lucide="alert-triangle" class="w-5 h-5 text-yellow-500 flex-shrink-0"></i>
                <p class="text-sm text-yellow-200">
                  Suas chaves de API carregam muitos privilégios, portanto, certifique-se de mantê-las seguras! Não compartilhe suas chaves de API secretas em áreas acessíveis publicamente, como GitHub, código do lado do cliente, etc.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ==================== ANALYTICS PAGE ==================== -->
    <section id="page-analytics" class="page">
      <div class="max-w-7xl mx-auto px-6 py-12">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-3xl font-bold mb-2">Analytics em Tempo Real</h2>
            <p class="text-gray-400">Visão completa da performance do seu agente.</p>
          </div>
          <div class="flex gap-2">
            <select class="bg-[#1E293B] border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#00A8FF]">
              <option>Últimos 7 dias</option>
              <option>Últimos 30 dias</option>
              <option>Este Mês</option>
            </select>
            <button class="btn-primary px-4 py-2 rounded-lg text-sm flex items-center gap-2">
              <i data-lucide="download" class="w-4 h-4"></i> Exportar
            </button>
          </div>
        </div>

        <!-- KPI Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="card p-6">
            <div class="flex items-center justify-between mb-4">
              <span class="text-gray-400 text-sm font-medium">Total de Conversas</span>
              <i data-lucide="message-square" class="w-5 h-5 text-[#00A8FF]"></i>
            </div>
            <div class="flex items-baseline gap-2">
              <h3 class="text-3xl font-bold text-white">12,543</h3>
              <span class="text-xs text-[#10B981] flex items-center font-medium">
                <i data-lucide="trending-up" class="w-3 h-3 mr-1"></i> +12%
              </span>
            </div>
          </div>

          <div class="card p-6">
            <div class="flex items-center justify-between mb-4">
              <span class="text-gray-400 text-sm font-medium">Tempo Médio de Resposta</span>
              <i data-lucide="clock" class="w-5 h-5 text-[#7C3AED]"></i>
            </div>
            <div class="flex items-baseline gap-2">
              <h3 class="text-3xl font-bold text-white">1.2s</h3>
              <span class="text-xs text-[#10B981] flex items-center font-medium">
                <i data-lucide="trending-down" class="w-3 h-3 mr-1"></i> -0.3s
              </span>
            </div>
          </div>

          <div class="card p-6">
            <div class="flex items-center justify-between mb-4">
              <span class="text-gray-400 text-sm font-medium">Taxa de Resolução</span>
              <i data-lucide="check-circle" class="w-5 h-5 text-[#10B981]"></i>
            </div>
            <div class="flex items-baseline gap-2">
              <h3 class="text-3xl font-bold text-white">94.8%</h3>
              <span class="text-xs text-[#10B981] flex items-center font-medium">
                <i data-lucide="trending-up" class="w-3 h-3 mr-1"></i> +2.1%
              </span>
            </div>
          </div>

          <div class="card p-6">
            <div class="flex items-center justify-between mb-4">
              <span class="text-gray-400 text-sm font-medium">Satisfação (CSAT)</span>
              <i data-lucide="star" class="w-5 h-5 text-[#F59E0B]"></i>
            </div>
            <div class="flex items-baseline gap-2">
              <h3 class="text-3xl font-bold text-white">4.9/5</h3>
              <span class="text-xs text-gray-500 font-medium">Estável</span>
            </div>
          </div>
        </div>

        <!-- Charts Area -->
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Main Chart -->
          <div class="lg:col-span-2 card p-6">
            <h3 class="font-bold text-white mb-6">Volume de Atendimentos</h3>
            <div class="h-80 flex items-end justify-between gap-2 px-4 pb-4 border-b border-gray-800 relative">
              <!-- Fake Bars -->
              <div class="w-full bg-[#00A8FF]/20 rounded-t-sm hover:bg-[#00A8FF]/40 transition-colors relative group" style="height: 40%">
                <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1E293B] text-xs px-2 py-1 rounded border border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">400</div>
              </div>
              <div class="w-full bg-[#00A8FF]/20 rounded-t-sm hover:bg-[#00A8FF]/40 transition-colors relative group" style="height: 65%">
                 <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1E293B] text-xs px-2 py-1 rounded border border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">650</div>
              </div>
              <div class="w-full bg-[#00A8FF]/20 rounded-t-sm hover:bg-[#00A8FF]/40 transition-colors relative group" style="height: 50%"></div>
              <div class="w-full bg-[#00A8FF]/20 rounded-t-sm hover:bg-[#00A8FF]/40 transition-colors relative group" style="height: 85%"></div>
              <div class="w-full bg-[#00A8FF]/20 rounded-t-sm hover:bg-[#00A8FF]/40 transition-colors relative group" style="height: 60%"></div>
              <div class="w-full bg-[#00A8FF]/20 rounded-t-sm hover:bg-[#00A8FF]/40 transition-colors relative group" style="height: 75%"></div>
              <div class="w-full bg-[#00A8FF]/20 rounded-t-sm hover:bg-[#00A8FF]/40 transition-colors relative group" style="height: 90%"></div>
            </div>
            <div class="flex justify-between text-xs text-gray-500 mt-4 px-4">
              <span>Seg</span>
              <span>Ter</span>
              <span>Qua</span>
              <span>Qui</span>
              <span>Sex</span>
              <span>Sáb</span>
              <span>Dom</span>
            </div>
          </div>

          <!-- Side Stats -->
          <div class="space-y-6">
            <div class="card p-6">
              <h3 class="font-bold text-white mb-4">Tópicos Mais Comuns</h3>
              <div class="space-y-4">
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span class="text-gray-300">Preços e Planos</span>
                    <span class="text-gray-500">45%</span>
                  </div>
                  <div class="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div class="h-full bg-[#00A8FF] w-[45%]"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span class="text-gray-300">Suporte Técnico</span>
                    <span class="text-gray-500">30%</span>
                  </div>
                  <div class="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div class="h-full bg-[#7C3AED] w-[30%]"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span class="text-gray-300">Integrações</span>
                    <span class="text-gray-500">15%</span>
                  </div>
                  <div class="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div class="h-full bg-[#10B981] w-[15%]"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span class="text-gray-300">Outros</span>
                    <span class="text-gray-500">10%</span>
                  </div>
                  <div class="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div class="h-full bg-gray-600 w-[10%]"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card p-6 bg-gradient-to-br from-[#00A8FF]/10 to-[#7C3AED]/10 border-none">
              <h3 class="font-bold text-white mb-2">Insight da IA</h3>
              <p class="text-sm text-gray-300 mb-4">
                O volume de atendimentos sobre "Integrações" aumentou 15% esta semana. Considere criar um tutorial em vídeo.
              </p>
              <button class="text-xs font-bold text-[#00A8FF] hover:text-white transition-colors">
                Gerar Tutorial com IA &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ==================== ADMIN PAGE ==================== -->
    <section id="page-admin" class="page">
      <div class="max-w-7xl mx-auto px-6 py-12">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-3xl font-bold">Configurações do Agente</h2>
          <button class="btn-primary px-6 py-2 rounded-lg text-sm font-bold">Salvar Alterações</button>
        </div>

        <div class="grid lg:grid-cols-4 gap-8">
          <!-- Sidebar Menu -->
          <div class="lg:col-span-1">
            <nav class="space-y-1">
              <a href="#" class="flex items-center gap-3 px-4 py-3 bg-[#00A8FF]/10 text-[#00A8FF] rounded-xl font-medium">
                <i data-lucide="settings" class="w-5 h-5"></i> Geral
              </a>
              <a href="#" class="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl transition-colors">
                <i data-lucide="brain" class="w-5 h-5"></i> Personalidade
              </a>
              <a href="#" class="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl transition-colors">
                <i data-lucide="database" class="w-5 h-5"></i> Base de Conhecimento
              </a>
              <a href="#" class="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl transition-colors">
                <i data-lucide="key" class="w-5 h-5"></i> Chaves de API
              </a>
              <a href="#" class="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl transition-colors">
                <i data-lucide="users" class="w-5 h-5"></i> Membros
              </a>
            </nav>
          </div>

          <!-- Content Form -->
          <div class="lg:col-span-3 space-y-6">
            <!-- Identity -->
            <div class="card p-8">
              <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <i data-lucide="user" class="w-5 h-5 text-[#00A8FF]"></i> Identidade do Agente
              </h3>
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-2">Nome do Agente</label>
                  <input type="text" value="Agente GPT" class="w-full bg-[#0F172A] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-[#00A8FF] focus:outline-none">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-2">Tom de Voz</label>
                  <select class="w-full bg-[#0F172A] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-[#00A8FF] focus:outline-none">
                    <option>Profissional & Empático</option>
                    <option>Descontraído & Jovem</option>
                    <option>Técnico & Direto</option>
                  </select>
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-400 mb-2">Prompt do Sistema (Instruções Iniciais)</label>
                  <textarea rows="4" class="w-full bg-[#0F172A] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-[#00A8FF] focus:outline-none font-mono text-sm">Você é um assistente virtual útil e prestativo da empresa Agente GPT. Seu objetivo é ajudar clientes a entenderem nossos planos e integrações. Sempre responda de forma educada e concisa.</textarea>
                </div>
              </div>
            </div>

            <!-- Channels -->
            <div class="card p-8">
              <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <i data-lucide="share-2" class="w-5 h-5 text-[#7C3AED]"></i> Canais Conectados
              </h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between p-4 bg-[#0F172A] rounded-xl border border-gray-700">
                  <div class="flex items-center gap-4">
                    <div class="w-10 h-10 bg-[#25D366]/20 rounded-lg flex items-center justify-center">
                      <i data-lucide="phone" class="w-5 h-5 text-[#25D366]"></i>
                    </div>
                    <div>
                      <h4 class="font-bold text-white">WhatsApp Business API</h4>
                      <p class="text-xs text-gray-500">+55 11 99999-9999</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-xs rounded font-medium border border-emerald-500/20">Conectado</span>
                    <button class="text-gray-400 hover:text-white"><i data-lucide="settings" class="w-4 h-4"></i></button>
                  </div>
                </div>

                <div class="flex items-center justify-between p-4 bg-[#0F172A] rounded-xl border border-gray-700">
                  <div class="flex items-center gap-4">
                    <div class="w-10 h-10 bg-[#0088cc]/20 rounded-lg flex items-center justify-center">
                      <i data-lucide="send" class="w-5 h-5 text-[#0088cc]"></i>
                    </div>
                    <div>
                      <h4 class="font-bold text-white">Telegram Bot</h4>
                      <p class="text-xs text-gray-500">@agentegpt_bot</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded font-medium">Desconectado</span>
                    <button class="text-[#00A8FF] text-sm font-medium hover:underline">Conectar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
      </main>

      <!-- Footer -->
      <footer class="border-t border-white/5 mt-20 relative z-10">
        <div class="max-w-7xl mx-auto px-6 py-16">
          <div class="grid md:grid-cols-4 gap-10 mb-12">
            <div class="md:col-span-2">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-12 h-12 rounded-2xl orb flex items-center justify-center"><span class="font-black text-white text-sm">GPT</span></div>
                <div><h3 class="text-xl font-bold text-gradient">agente.gpt</h3><p class="text-xs text-gray-500">ULTRA ENTERPRISE</p></div>
              </div>
              <p class="text-gray-400 max-w-sm mb-6">Plataforma de IA conversacional enterprise do ecossistema EXTRAORDINÁRI.A • ALIANCI.A.</p>
              <div class="flex items-center gap-4">
                <a href="https://wa.me/5512996341928" target="_blank" class="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-white/10">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
                <a href="#" class="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-white/10"><i data-lucide="github" class="w-5 h-5"></i></a>
                <a href="#" class="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-white/10"><i data-lucide="linkedin" class="w-5 h-5"></i></a>
              </div>
            </div>
            <div>
              <h4 class="font-bold mb-4">Produto</h4>
              <ul class="space-y-3 text-gray-400">
                <li><a href="#" onclick="showPage('home')" class="hover:text-white">Recursos</a></li>
                <li><a href="#" onclick="showPage('planos')" class="hover:text-white">Preços</a></li>
                <li><a href="#" onclick="showPage('docs')" class="hover:text-white">API</a></li>
                <li><a href="#" onclick="showPage('analytics')" class="hover:text-white">Analytics</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold mb-4">Suporte</h4>
              <ul class="space-y-3 text-gray-400">
                <li><a href="https://wa.me/5512996341928" target="_blank" class="hover:text-white">WhatsApp</a></li>
                <li><a href="#" class="hover:text-white">Status</a></li>
                <li><a href="#" class="hover:text-white">Termos</a></li>
                <li><a href="#" class="hover:text-white">Privacidade</a></li>
              </ul>
            </div>
          </div>
          <div class="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p class="text-sm text-gray-500">© 2024 agente.gpt – EXTRAORDINÁRI.A • ALIANCI.A</p>
            <p class="text-sm text-gray-600">Feito com 💙 em São Paulo</p>
          </div>
        </div>
      </footer>
    `}} />
  );
}
