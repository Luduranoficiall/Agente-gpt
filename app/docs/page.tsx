"use client";

import { useState } from 'react';
import { Globe, Key, Database, AlertCircle, Terminal, MessageSquare, BarChart3, CheckCircle2, Package, Bell, Bot, Copy } from 'lucide-react';

export default function DocsPage() {
  const [docsTab, setDocsTab] = useState('quickstart');

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add toast here
  };

  return (
    <main className="min-h-screen pt-20 pb-10 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
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

            {/* Response Codes */}
            <div className="card p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                Códigos de Resposta
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="glass rounded-xl p-4 border-l-4 border-emerald-500">
                  <span className="text-2xl font-black text-emerald-400">200</span>
                  <p className="text-gray-400 text-sm mt-1">Sucesso</p>
                </div>
                <div className="glass rounded-xl p-4 border-l-4 border-[#00A8FF]">
                  <span className="text-2xl font-black text-[#00A8FF]">201</span>
                  <p className="text-gray-400 text-sm mt-1">Criado</p>
                </div>
                <div className="glass rounded-xl p-4 border-l-4 border-amber-500">
                  <span className="text-2xl font-black text-amber-400">401</span>
                  <p className="text-gray-400 text-sm mt-1">Não autorizado</p>
                </div>
                <div className="glass rounded-xl p-4 border-l-4 border-red-500">
                  <span className="text-2xl font-black text-red-400">500</span>
                  <p className="text-gray-400 text-sm mt-1">Erro interno</p>
                </div>
              </div>
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

              {/* GET /chat/history */}
              <div className="card overflow-hidden">
                <div className="glass-strong px-6 py-4 flex items-center gap-4 border-b border-white/5">
                  <span className="px-3 py-1.5 rounded-lg bg-[#00A8FF] text-black text-xs font-bold">GET</span>
                  <code className="text-lg font-mono">/chat/history/{'{user_id}'}</code>
                  <span className="text-gray-400 text-sm ml-auto hidden sm:inline">Histórico de conversas</span>
                </div>
                <div className="p-6">
                  <p className="text-gray-400 mb-4">Retorna o histórico de mensagens de um usuário específico.</p>
                  <div className="code-block rounded-xl p-4">
                    <code className="text-gray-400">?limit=<span className="text-[#00A8FF]">50</span></code>
                  </div>
                </div>
              </div>
            </div>

            {/* Section: ALIANCI.A Analytics */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-[#7C3AED] mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                ALIANCI.A ANALYTICS
              </h3>

              {/* POST /companies */}
              <div className="card overflow-hidden mb-4">
                <div className="glass-strong px-6 py-4 flex items-center gap-4 border-b border-white/5">
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-500 text-black text-xs font-bold">POST</span>
                  <code className="text-lg font-mono">/companies</code>
                  <span className="ml-2 px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-xs">AUTH</span>
                  <span className="text-gray-400 text-sm ml-auto hidden sm:inline">Criar empresa</span>
                </div>
                <div className="p-6">
                  <div className="code-block rounded-xl p-4 overflow-x-auto">
                    <pre className="text-sm"><code>{`{
  "external_id": "empresa-123",
  "name": "Tech Solutions LTDA",
  "segment": "Tecnologia",
  "city": "São Paulo"
}`}</code></pre>
                  </div>
                </div>
              </div>

              {/* POST /metrics */}
              <div className="card overflow-hidden mb-4">
                <div className="glass-strong px-6 py-4 flex items-center gap-4 border-b border-white/5">
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-500 text-black text-xs font-bold">POST</span>
                  <code className="text-lg font-mono">/metrics</code>
                  <span className="ml-2 px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-xs">AUTH</span>
                  <span className="text-gray-400 text-sm ml-auto hidden sm:inline">Enviar métricas</span>
                </div>
                <div className="p-6">
                  <p className="text-gray-400 mb-4">Envia métricas financeiras de uma empresa para o Power BI.</p>
                  <div className="code-block rounded-xl p-4 overflow-x-auto">
                    <pre className="text-sm"><code>{`{
  "external_company_id": "empresa-123",
  "reference_date": "2025-11-01T00:00:00",
  "revenue": 200000,
  "profit": 60000,
  "cashback_distributed": 8000,
  "customers_count": 350,
  "notes": "Dados de Novembro / ALIANCI.A"
}`}</code></pre>
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

            {/* cURL: Chat */}
            <div className="card overflow-hidden">
              <div className="glass-strong px-6 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-emerald-500" />
                  <span className="font-bold">Enviar Mensagem para Agente</span>
                </div>
                <button onClick={() => copyCode('curl -X POST "https://api.agente-gpt.fly.dev/chat" ...')} className="px-3 py-1.5 glass rounded-lg text-xs flex items-center gap-2 hover:bg-white/10">
                  <Copy className="w-3 h-3" /> Copiar
                </button>
              </div>
              <div className="p-6">
                <div className="code-block rounded-xl p-5 overflow-x-auto">
                  <pre className="text-sm text-gray-300"><code>{`curl -X POST "https://api.agente-gpt.fly.dev/chat" \\
  -H "Content-Type: application/json" \\
  -d '{
    "user_id": "5512996341928",
    "message": "Quais são os planos disponíveis?",
    "temperature": 0.4
  }'`}</code></pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SDKs Tab */}
        {docsTab === 'sdks' && (
          <div className="animate-fade-up">
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
    </main>
  );
}
