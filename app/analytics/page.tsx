"use client";

import { RefreshCw, DollarSign, TrendingUp, Building2, Gift, Activity, BarChart3, Trophy } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AnalyticsPage() {
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
    </main>
  );
}