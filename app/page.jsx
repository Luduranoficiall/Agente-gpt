"use client";
import { useState, useRef, useEffect } from 'react';

export const dynamic = 'force-dynamic';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [conversations, setConversations] = useState([
    { id: 1, title: 'Nova conversa', date: 'Agora' }
  ]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage.content,
          history: messages 
        })
      });

      const data = await res.json();
      
      if (data.error) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `⚠️ ${data.error}\n\nPor favor, tente novamente ou entre em contato com o suporte.`,
          isError: true 
        }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.response 
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '❌ Erro de conexão. Verifique sua internet e tente novamente.',
        isError: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const newChat = () => {
    setMessages([]);
    setConversations(prev => [
      { id: Date.now(), title: 'Nova conversa', date: 'Agora' },
      ...prev
    ]);
  };

  const quickActions = [
    { icon: '🚀', label: 'Planos e Preços', prompt: 'Quais são os planos disponíveis?' },
    { icon: '💡', label: 'Como Funciona', prompt: 'Como funciona o Agente GPT?' },
    { icon: '🔧', label: 'Suporte Técnico', prompt: 'Preciso de suporte técnico' },
    { icon: '📱', label: 'Integrar WhatsApp', prompt: 'Como integro com WhatsApp?' },
  ];

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-radial from-amber-900/10 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 opacity-30 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 50% 0%, rgba(251, 191, 36, 0.1), transparent 50%)`
      }} />
      
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-72' : 'w-0'} bg-[#111111] border-r border-white/5 transition-all duration-300 flex flex-col overflow-hidden relative z-10`}>
        {/* New Chat Button */}
        <div className="p-4">
          <button 
            onClick={newChat}
            className="w-full flex items-center gap-3 px-4 py-3.5 bg-gradient-to-r from-amber-500/10 to-amber-600/5 hover:from-amber-500/20 hover:to-amber-600/10 border border-amber-500/20 rounded-xl transition-all duration-300 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-white/90 group-hover:text-white">Nova Conversa</span>
          </button>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          <div className="px-3 py-2 text-xs font-bold text-white/30 uppercase tracking-widest">Recentes</div>
          {conversations.map((conv) => (
            <button 
              key={conv.id}
              className="w-full text-left px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 flex items-center gap-3 group"
            >
              <svg className="w-4 h-4 text-white/40 group-hover:text-amber-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="truncate flex-1">{conv.title}</span>
            </button>
          ))}
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-white/5">
          <a href="/cliente" className="flex items-center gap-3 px-3 py-3 hover:bg-white/5 rounded-xl transition-all duration-200 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-bold text-sm shadow-lg shadow-amber-500/20">
              L
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-white text-sm truncate">Luduran</div>
              <div className="text-xs text-amber-400 font-medium">Master Premium</div>
            </div>
            <svg className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative">
        {/* Header */}
        <header className="h-14 border-b border-white/5 flex items-center px-4 gap-4 bg-[#0a0a0a]/80 backdrop-blur-xl z-10">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-bold text-white">Agente GPT</h1>
              <p className="text-[10px] text-amber-400 font-semibold tracking-wider uppercase">Master Premium</p>
            </div>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Online
            </span>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto scroll-area">
          {messages.length === 0 ? (
            /* Welcome Screen */
            <div className="h-full flex flex-col items-center justify-center px-4 py-12">
              <div className="max-w-2xl w-full text-center space-y-8">
                {/* Logo Animation */}
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-amber-500/20 blur-3xl rounded-full scale-150 animate-pulse" />
                  <div className="relative w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-2xl shadow-amber-500/30">
                    <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>

                <div className="space-y-3">
                  <h2 className="text-3xl font-bold text-white">
                    Olá! Sou o <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Agente GPT</span>
                  </h2>
                  <p className="text-white/50 text-lg max-w-md mx-auto">
                    Sua inteligência artificial premium. Como posso ajudar você hoje?
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto mt-8">
                  {quickActions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setInput(action.prompt);
                        inputRef.current?.focus();
                      }}
                      className="flex items-center gap-3 p-4 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-amber-500/20 rounded-xl transition-all duration-300 group text-left"
                    >
                      <span className="text-2xl">{action.icon}</span>
                      <span className="text-sm text-white/70 group-hover:text-white font-medium">{action.label}</span>
                    </button>
                  ))}
                </div>

                <p className="text-xs text-white/30 mt-8">
                  Powered by Gemini 1.5 Flash • EXTRAORDINÁRI.A
                </p>
              </div>
            </div>
          ) : (
            /* Messages */
            <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-fadeIn`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-br from-gray-600 to-gray-700' 
                      : 'bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/20'
                  }`}>
                    {msg.role === 'user' ? (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div className={`flex-1 max-w-[85%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                    <div className={`inline-block px-4 py-3 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 text-white'
                        : msg.isError
                          ? 'bg-red-500/10 border border-red-500/20 text-red-300'
                          : 'text-white/90'
                    }`}>
                      <p className="whitespace-pre-wrap text-[15px] leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex gap-4 animate-fadeIn">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-1.5 px-4 py-3">
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl p-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative flex items-center gap-3 bg-[#1a1a1a] border border-white/10 focus-within:border-amber-500/50 rounded-2xl p-2 transition-all duration-300 shadow-xl shadow-black/20">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Digite sua mensagem..."
                rows={1}
                className="flex-1 bg-transparent text-white placeholder-white/30 px-4 py-2 resize-none focus:outline-none text-[15px] max-h-32"
                style={{ minHeight: '44px' }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 disabled:hover:shadow-none"
              >
                {isLoading ? (
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
            <p className="text-center text-[11px] text-white/20 mt-3">
              Agente GPT Master Premium • Powered by Gemini 1.5 Flash
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
