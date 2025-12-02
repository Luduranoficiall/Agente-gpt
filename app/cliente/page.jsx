"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Cliente() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [botConfig, setBotConfig] = useState({
    nome: "Agente Comercial",
    personalidade: "Profissional e Empático",
    prompt: "Você é um assistente virtual focado em vendas...",
    mensagemBoasVindas: "Olá! Como posso ajudar você hoje?"
  });
  const [whatsappStatus, setWhatsappStatus] = useState("disconnected"); // disconnected, connecting, connected
  const [qrCode, setQrCode] = useState(null);
  const [calendarStatus, setCalendarStatus] = useState("disconnected");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    axios.get("/api/auth/me", {
      headers: { Authorization: "Bearer " + token }
    }).then(res => {
      setUser(res.data.user);
      // Simular carregamento de configs
      if (res.data.user.config) setBotConfig(res.data.user.config);
    }).catch(() => router.push("/login"));
  }, []);

  const handleConnectWhatsapp = () => {
    setWhatsappStatus("connecting");
    // Simulação de geração de QR Code
    setTimeout(() => {
      setQrCode("https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=AgenteGPT-Auth-Simulation");
    }, 1000);

    // Simulação de conexão bem sucedida após "ler" o QR
    setTimeout(() => {
      setQrCode(null);
      setWhatsappStatus("connected");
      alert("WhatsApp Conectado com Sucesso!");
    }, 8000);
  };

  const handleConnectCalendar = () => {
    // Simulação de OAuth
    const width = 500;
    const height = 600;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
    
    const popup = window.open(
      "https://accounts.google.com/o/oauth2/auth?client_id=SIMULATION&redirect_uri=CALLBACK&response_type=token&scope=calendar",
      "Google Calendar Auth",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    setTimeout(() => {
      if (popup) popup.close();
      setCalendarStatus("connected");
      alert("Google Agenda Integrada!");
    }, 2000);
  };

  const handleSaveConfig = async () => {
    alert("Configurações do Agente Salvas com Sucesso!");
    // Aqui iria a chamada real para salvar no backend
  };

  if (!user) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Carregando Painel...</div>;

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111] border-r border-white/10 p-6 hidden md:block">
        <h2 className="text-2xl font-bold text-[#FFD700] mb-8">Agente GPT</h2>
        <nav className="space-y-4">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`w-full text-left p-3 rounded transition-colors ${activeTab === 'dashboard' ? 'bg-[#FFD700] text-black font-bold' : 'text-gray-400 hover:text-white'}`}
          >
            📊 Dashboard
          </button>
          <button 
            onClick={() => setActiveTab("whatsapp")}
            className={`w-full text-left p-3 rounded transition-colors ${activeTab === 'whatsapp' ? 'bg-[#FFD700] text-black font-bold' : 'text-gray-400 hover:text-white'}`}
          >
            📱 Conexão WhatsApp
          </button>
          <button 
            onClick={() => setActiveTab("bot")}
            className={`w-full text-left p-3 rounded transition-colors ${activeTab === 'bot' ? 'bg-[#FFD700] text-black font-bold' : 'text-gray-400 hover:text-white'}`}
          >
            🤖 Configurar Agente
          </button>
          <button 
            onClick={() => setActiveTab("agenda")}
            className={`w-full text-left p-3 rounded transition-colors ${activeTab === 'agenda' ? 'bg-[#FFD700] text-black font-bold' : 'text-gray-400 hover:text-white'}`}
          >
            📅 Google Agenda
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            {activeTab === 'dashboard' && "Visão Geral"}
            {activeTab === 'whatsapp' && "Conectar WhatsApp"}
            {activeTab === 'bot' && "Personalizar Agente"}
            {activeTab === 'agenda' && "Integração de Agenda"}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Olá, {user.nome}</span>
            <div className="w-10 h-10 rounded-full bg-[#FFD700] flex items-center justify-center text-black font-bold">
              {user.nome.charAt(0)}
            </div>
          </div>
        </header>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-white/10">
              <h3 className="text-gray-400 mb-2">Status do Agente</h3>
              <div className="text-2xl font-bold text-green-400 flex items-center gap-2">
                ● Ativo
              </div>
            </div>
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-white/10">
              <h3 className="text-gray-400 mb-2">Mensagens Hoje</h3>
              <div className="text-2xl font-bold text-white">0</div>
            </div>
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-white/10">
              <h3 className="text-gray-400 mb-2">Plano Atual</h3>
              <div className="text-2xl font-bold text-[#FFD700] uppercase">{user.plano}</div>
            </div>
          </div>
        )}

        {/* WhatsApp Tab */}
        {activeTab === 'whatsapp' && (
          <div className="bg-[#1a1a1a] p-8 rounded-xl border border-white/10 max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Conecte seu WhatsApp</h2>
            <p className="text-gray-400 mb-6">Escaneie o QR Code para permitir que o Agente GPT responda seus clientes automaticamente.</p>
            
            <div className="flex flex-col items-center justify-center p-10 bg-black/50 rounded-xl border border-dashed border-white/20">
              {whatsappStatus === 'connected' ? (
                <div className="text-center">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-green-400">WhatsApp Conectado!</h3>
                  <p className="text-gray-400">Seu agente já está pronto para responder.</p>
                  <button onClick={() => setWhatsappStatus('disconnected')} className="mt-4 text-red-400 hover:underline">Desconectar</button>
                </div>
              ) : qrCode ? (
                <div className="text-center">
                  <img src={qrCode} alt="QR Code WhatsApp" className="mb-4 border-4 border-white rounded-lg" />
                  <p className="animate-pulse text-[#FFD700]">Aguardando leitura...</p>
                </div>
              ) : (
                <button 
                  onClick={handleConnectWhatsapp}
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                >
                  <span className="text-xl">📱</span> Gerar QR Code
                </button>
              )}
            </div>
          </div>
        )}

        {/* Bot Config Tab */}
        {activeTab === 'bot' && (
          <div className="bg-[#1a1a1a] p-8 rounded-xl border border-white/10 max-w-3xl">
            <div className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-2">Nome do Agente</label>
                <input 
                  value={botConfig.nome}
                  onChange={e => setBotConfig({...botConfig, nome: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-[#FFD700] outline-none"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Personalidade / Tom de Voz</label>
                <select 
                  value={botConfig.personalidade}
                  onChange={e => setBotConfig({...botConfig, personalidade: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-[#FFD700] outline-none"
                >
                  <option>Profissional e Formal</option>
                  <option>Amigável e Descontraído</option>
                  <option>Vendedor Agressivo</option>
                  <option>Suporte Técnico Calmo</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Prompt do Sistema (Instruções)</label>
                <textarea 
                  value={botConfig.prompt}
                  onChange={e => setBotConfig({...botConfig, prompt: e.target.value})}
                  rows={6}
                  className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-[#FFD700] outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">Descreva como o agente deve se comportar, o que ele vende e como deve responder.</p>
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Mensagem de Boas-vindas</label>
                <input 
                  value={botConfig.mensagemBoasVindas}
                  onChange={e => setBotConfig({...botConfig, mensagemBoasVindas: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-[#FFD700] outline-none"
                />
              </div>

              <button 
                onClick={handleSaveConfig}
                className="bg-[#FFD700] hover:bg-[#FDB931] text-black font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Salvar Configurações
              </button>
            </div>
          </div>
        )}

        {/* Calendar Tab */}
        {activeTab === 'agenda' && (
          <div className="bg-[#1a1a1a] p-8 rounded-xl border border-white/10 max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Integração Google Agenda</h2>
            <p className="text-gray-400 mb-6">Permita que seus clientes agendem reuniões diretamente pelo WhatsApp, sincronizado com sua agenda.</p>

            <div className="flex items-center justify-between p-6 bg-black/50 rounded-xl border border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" alt="Google Calendar" className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold">Google Calendar</h3>
                  <p className={`text-sm ${calendarStatus === 'connected' ? 'text-green-400' : 'text-gray-500'}`}>
                    {calendarStatus === 'connected' ? '● Conectado' : '○ Desconectado'}
                  </p>
                </div>
              </div>

              {calendarStatus === 'connected' ? (
                <button onClick={() => setCalendarStatus('disconnected')} className="text-red-400 hover:underline text-sm">Desconectar</button>
              ) : (
                <button 
                  onClick={handleConnectCalendar}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  Conectar Conta
                </button>
              )}
            </div>

            {calendarStatus === 'connected' && (
              <div className="mt-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                <h4 className="font-bold text-green-400 mb-2">Configuração de Agendamento</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-400">Duração Padrão</label>
                    <select className="bg-black/50 border border-white/10 rounded p-2 text-white text-sm w-full mt-1">
                      <option>30 minutos</option>
                      <option>1 hora</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Dias Disponíveis</label>
                    <div className="flex gap-2 mt-1">
                      {['S', 'T', 'Q', 'Q', 'S'].map(d => (
                        <div key={d} className="w-8 h-8 bg-[#FFD700] text-black flex items-center justify-center rounded font-bold text-xs">{d}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}