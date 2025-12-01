"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users, MessageSquare, Clock, Heart, Activity, Server, 
  BarChart3, TrendingUp, DollarSign, Building2, Gift, Trophy 
} from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AdminPage() {
  const [adminStats, setAdminStats] = useState({ users: 0, messages: 0 });

  useEffect(() => {
    animateValue('users', 0, 2847, 2000);
    animateValue('messages', 0, 48291, 2500);
  }, []);

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

  const chartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Faturamento (R$)',
        data: [120000, 150000, 180000, 220000, 280000, 350000],
        backgroundColor: '#00A8FF',
        borderRadius: 8,
      },
      {
        label: 'Custos (R$)',
        data: [40000, 45000, 50000, 55000, 60000, 65000],
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 8,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' as const, labels: { color: '#9ca3af', font: { family: 'Inter' } } },
      tooltip: { 
        backgroundColor: 'rgba(0,0,0,0.8)', 
        titleColor: '#fff', 
        bodyColor: '#ccc',
        padding: 12,
        cornerRadius: 8,
        displayColors: false
      }
    },
    scales: {
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#6b7280' }, border: { display: false } },
      x: { grid: { display: false }, ticks: { color: '#6b7280' }, border: { display: false } }
    }
  };

  return (
    <main className="min-h-screen pt-20 pb-10 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-16">
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
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center"><MessageSquare className="w-5 h-5 text-emerald-500" /></div>
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
            <h3 className="font-bold flex items-center gap-3 mb-6"><Server className="w-5 h-5 text-[#00A8FF]" />Status do Sistema</h3>
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
    </main>
  );
}
