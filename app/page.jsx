"use client";
import { useEffect, useState } from 'react';

// Force dynamic rendering to avoid caching old versions
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Initialize Lucide icons if available
    if (window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }

    const responses = {
      planos: `📋 **PLANOS MASTER PREMIUM (HARD LEVEL)**\n\n━━━━━━━━━━━━━━━━━━\n🔹 **MEMBROS ALIANCI.A** – R$ 197/mês\n🔹 **CLIENTES EXTERNOS** – R$ 297/mês\n\n🚀 **Benefícios de Elite:**\n• IA Comercial Nível Hard\n• Painel Exclusivo Master Ouro\n• Suporte VIP Prioritário\n\n👉 [Assinar Agora](/vendas)`,
      suporte: `🛠️ **Suporte Técnico de Elite**\n\nNossa equipe Master Premium está pronta para resolver qualquer desafio.\n\n• WhatsApp Exclusivo 24/7\n• Estratégias de Venda Hard Level\n• Consultoria de Implementação\n\n[Falar com Suporte VIP](https://wa.me/5512996341928)`,
      whatsapp: `📱 **Conexão WhatsApp Blindada**\n\nPara conectar seu WhatsApp com estabilidade total, acesse o Painel Master.\n\n1. Clique no menu lateral em "Configuração WhatsApp"\n2. Escaneie o QR Code\n3. Aguarde a validação segura\n\n[Ir para Painel Master](/cliente)`,
      reuniao: `📅 **Agendamento Executivo**\n\nPosso gerenciar sua agenda com precisão. Integração total com Google Calendar para máxima produtividade.\n\n[Acessar Agenda](/cliente)`,
      saudacao: `Olá! 👋 Bem-vindo ao nível Hard. Sou a **RegIA**, sua inteligência **Master Premium Ultra Ouro**.\n\nEstou aqui para escalar seus resultados. Qual é a missão de hoje?`,
      agradecimento: `Disponha! 🌟 O sucesso é o nosso padrão. Conte comigo para continuar dominando o mercado.`,
      default: `Compreendido. Como uma IA **Master Premium Nível Hard**, meu foco é resultado absoluto.\n\nPosso te auxiliar com:\n\n• Planos de Alta Performance\n• Configuração Avançada do Agente\n• Estratégias de Venda Agressivas\n• Suporte Técnico VIP\n\nQual o próximo passo para o sucesso?`
    };

    window.addMessage = function(content, isUser = false) {
      const chat = document.getElementById('chatMessages');
      const welcomeScreen = document.getElementById('welcomeScreen');
      if (welcomeScreen) welcomeScreen.style.display = 'none';

      const row = document.createElement('div');
      row.className = 'flex gap-4 mb-6 ' + (isUser ? 'flex-row-reverse' : '');
      
      const avatar = document.createElement('div');
      avatar.className = `w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isUser ? 'bg-gray-700' : 'bg-gradient-to-br from-[#FFD700] to-[#FDB931]'}`;
      avatar.innerHTML = isUser ? 
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>' : 
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 12L2.5 12"></path><path d="M12 12l9.5-5.5"></path></svg>';
      
      const bubble = document.createElement('div');
      bubble.className = 'chat-bubble ' + (isUser ? 'user' : 'bot');
      bubble.innerHTML = content;
      
      row.appendChild(avatar);
      row.appendChild(bubble);
      chat.appendChild(row);
      chat.scrollTop = chat.scrollHeight;
    };

    window.sanitize = function(text) {
      return text.replace(/\n/g,'<br>')
                 .replace(/(https?:\/\/[^\s<]+)/g,'<a href="$1" target="_blank" class="text-[#FFD700] hover:underline">$1</a>')
                 .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>');
    };

    window.sendMessage = async function() {
      const input = document.getElementById('chatInput');
      const value = input.value.trim();
      if (!value) return;
      
      window.addMessage(window.sanitize(value), true);
      input.value = '';
      
      // Simulate typing delay
      const chat = document.getElementById('chatMessages');
      const typing = document.createElement('div');
      typing.id = 'typingIndicator';
      typing.className = 'flex gap-4 mb-6';
      typing.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FDB931] flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path></svg>
        </div>
        <div class="chat-bubble text-gray-400 flex items-center h-full pt-3">
          <div class="typing-indicator"><span></span><span></span><span></span></div>
        </div>`;
      chat.appendChild(typing);
      chat.scrollTop = chat.scrollHeight;

      await new Promise(r => setTimeout(r, 1000 + Math.random()*1500));
      
      if(document.getElementById('typingIndicator')) document.getElementById('typingIndicator').remove();

      const lower = value.toLowerCase();
      let reply = responses.default;
      
      if (lower.includes('plano') || lower.includes('preço') || lower.includes('valor') || lower.includes('custo')) reply = responses.planos;
      else if (lower.includes('suporte') || lower.includes('ajuda') || lower.includes('problema') || lower.includes('erro')) reply = responses.suporte;
      else if (lower.includes('whatsapp') || lower.includes('conectar') || lower.includes('qr')) reply = responses.whatsapp;
      else if (lower.includes('reunião') || lower.includes('agenda') || lower.includes('marcar')) reply = responses.reuniao;
      else if (lower.includes('oi') || lower.includes('olá') || lower.includes('bom dia') || lower.includes('boa tarde') || lower.includes('boa noite')) reply = responses.saudacao;
      else if (lower.includes('obrigado') || lower.includes('valeu') || lower.includes('grato')) reply = responses.agradecimento;
      
      window.addMessage(window.sanitize(reply));
    };

    window.sendQuickMessage = function(msg) {
      document.getElementById('chatInput').value = msg;
      window.sendMessage();
    };

  }, []);

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-gray-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-[260px]' : 'w-0'} bg-[#000] border-r border-white/10 transition-all duration-300 flex flex-col overflow-hidden`}>
        <div className="p-4">
          <button onClick={() => window.location.reload()} className="w-full flex items-center gap-3 px-4 py-3 bg-[#1a1a1a] hover:bg-[#222] border border-white/5 rounded-lg transition-colors text-sm font-medium text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Nova Conversa
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-2">
          <div className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Hoje</div>
          <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-[#1a1a1a] rounded-lg truncate transition-colors">
            Planos Master Ouro
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-[#1a1a1a] rounded-lg truncate transition-colors">
            Configuração WhatsApp
          </button>
        </div>

        <div className="p-4 border-t border-white/10">
          <a href="/cliente" className="flex items-center gap-3 px-3 py-3 hover:bg-[#1a1a1a] rounded-lg transition-colors text-sm">
            <div className="w-8 h-8 rounded bg-[#FFD700] flex items-center justify-center text-black font-bold">L</div>
            <div className="flex-1">
              <div className="font-bold text-white">Luduran</div>
              <div className="text-xs text-[#FFD700]">Master Premium</div>
            </div>
          </a>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative">
        {/* Header */}
        <header className="h-14 flex items-center justify-between px-4 border-b border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-[#1a1a1a] rounded-lg text-gray-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
            </button>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-[#1a1a1a] px-3 py-1.5 rounded-lg transition-colors">
              <span className="font-semibold text-lg text-gray-200">Agente GPT 4.0</span>
              <span className="text-xs font-bold text-[#FFD700] bg-[#FFD700]/10 px-2 py-0.5 rounded border border-[#FFD700]/20">
                MASTER OURO V5.0 (AO VIVO)
              </span>
            </div>
          </div>
          <button className="p-2 hover:bg-[#1a1a1a] rounded-full">
            <img src="https://github.com/shadcn.png" className="w-8 h-8 rounded-full" alt="User" />
          </button>
        </header>

        {/* Chat Content */}
        <div className="flex-1 overflow-y-auto scroll-area relative">
          <div className="max-w-3xl mx-auto w-full pt-10 pb-32 px-4" id="chatMessages">
            {/* Welcome Screen (Hidden when chat starts) */}
            <div id="welcomeScreen" className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-in fade-in duration-700">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FFD700] to-[#FDB931] flex items-center justify-center shadow-[0_0_40px_rgba(255,215,0,0.3)] mb-4">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 12L2.5 12"></path><path d="M12 12l9.5-5.5"></path></svg>
              </div>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                Como posso ajudar hoje?
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mt-8">
                <button onClick={() => window.sendQuickMessage('Quais são os planos Master Ouro?')} className="p-4 border border-white/10 rounded-xl hover:bg-[#1a1a1a] hover:border-[#FFD700]/50 transition-all text-left group">
                  <div className="font-semibold text-gray-200 group-hover:text-[#FFD700]">Ver Planos e Preços</div>
                  <div className="text-sm text-gray-500">Conheça as assinaturas exclusivas</div>
                </button>
                <button onClick={() => window.sendQuickMessage('Como configurar meu WhatsApp?')} className="p-4 border border-white/10 rounded-xl hover:bg-[#1a1a1a] hover:border-[#FFD700]/50 transition-all text-left group">
                  <div className="font-semibold text-gray-200 group-hover:text-[#FFD700]">Conectar WhatsApp</div>
                  <div className="text-sm text-gray-500">Tutorial de conexão QR Code</div>
                </button>
                <button onClick={() => window.sendQuickMessage('Quero agendar uma reunião')} className="p-4 border border-white/10 rounded-xl hover:bg-[#1a1a1a] hover:border-[#FFD700]/50 transition-all text-left group">
                  <div className="font-semibold text-gray-200 group-hover:text-[#FFD700]">Agendar Reunião</div>
                  <div className="text-sm text-gray-500">Integração com Google Agenda</div>
                </button>
                <button onClick={() => window.sendQuickMessage('Preciso de suporte técnico')} className="p-4 border border-white/10 rounded-xl hover:bg-[#1a1a1a] hover:border-[#FFD700]/50 transition-all text-left group">
                  <div className="font-semibold text-gray-200 group-hover:text-[#FFD700]">Suporte Técnico</div>
                  <div className="text-sm text-gray-500">Falar com um especialista</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent pt-10 pb-6 px-4">
          <div className="max-w-3xl mx-auto w-full relative">
            <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden focus-within:border-[#FFD700]/50 transition-colors">
              <textarea 
                id="chatInput"
                placeholder="Envie uma mensagem para a RegIA..." 
                className="w-full bg-transparent text-white p-4 resize-none outline-none max-h-[200px] min-h-[52px]"
                rows="1"
                onKeyPress={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); window.sendMessage(); } }}
              ></textarea>
              <div className="flex justify-between items-center px-2 pb-2">
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  </button>
                </div>
                <button onClick={() => window.sendMessage()} className="p-2 bg-[#FFD700] hover:bg-[#FDB931] text-black rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
              </div>
            </div>
            <p className="text-center text-xs text-gray-500 mt-3">
              Agente GPT Master Ouro pode cometer erros. Considere verificar informações importantes.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
