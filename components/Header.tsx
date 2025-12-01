"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Phone } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname?.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { name: 'Início', path: '/' },
    { name: 'Agente IA', path: '/agente' },
    { name: 'Planos', path: '/planos' },
    { name: 'API', path: '/docs' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Dashboard', path: '/admin' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
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
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                href={item.path}
                className={`nav-item ${isActive(item.path) ? 'active' : ''} capitalize text-sm font-medium tracking-wide transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white/5`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <a href="https://wa.me/5512996341928" target="_blank" className="hidden md:flex btn-whatsapp items-center gap-2 px-5 py-3 rounded-xl text-sm transition-transform hover:scale-105">
              <Phone className="w-5 h-5" />
              <span className="font-semibold">WhatsApp</span>
            </a>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-3 glass rounded-xl">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-strong border-t border-white/5 absolute w-full left-0">
          <nav className="px-6 py-6 space-y-2">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                href={item.path}
                onClick={() => setMobileMenuOpen(false)} 
                className={`block py-3 px-4 rounded-xl hover:bg-white/5 capitalize ${isActive(item.path) ? 'bg-white/10 text-[#00A8FF]' : ''}`}
              >
                {item.name}
              </Link>
            ))}
            <a href="https://wa.me/5512996341928" target="_blank" className="flex btn-whatsapp items-center justify-center gap-2 py-4 rounded-xl mt-4">
              <Phone className="w-5 h-5" />
              Falar no WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
