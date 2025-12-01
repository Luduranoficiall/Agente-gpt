"use client";

import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Trash2, Download, Info, CreditCard, Headphones, Plug, Phone } from 'lucide-react';

export default function AgentePage() {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'agent', content: 'Olá! Sou o <strong>agente.gpt</strong>. Como posso ajudar sua empresa hoje?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    // Simulação de IA
    setTimeout(() => {
      setIsTyping(false);
      setChatMessages(prev => [...prev, { role: 'agent', content: 'Entendi sua solicitação. Como sou uma demonstração, não posso processar dados reais ainda, mas no plano <strong>Enterprise</strong> eu estaria conectado ao seu banco de dados!' }]);
    }, 1500);
  };

  const formatMsg = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  return (
    <main className="min-h-screen pt-20 pb-10 relative z-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold"><span className="text-gradient">agente.gpt</span></h1>
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
    </main>
  );
}
