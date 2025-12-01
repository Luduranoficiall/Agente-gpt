"use client";

import React from 'react';
import Link from 'next/link';
import { Phone, Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-32 relative z-10 bg-[#010204]">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl orb flex items-center justify-center">
                <span className="font-black text-white text-base">GPT</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gradient">agente.gpt</h3>
                <p className="text-sm text-gray-500">ULTRA ENTERPRISE</p>
              </div>
            </div>
            <p className="text-gray-400 max-w-sm mb-8 text-lg">Plataforma de IA conversacional enterprise do ecossistema EXTRAORDINÁRI.A • ALIANCI.A.</p>
            <div className="flex items-center gap-4">
              <a href="https://wa.me/5512996341928" target="_blank" className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors">
                <Phone className="w-6 h-6" />
              </a>
              <a href="#" className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg">Produto</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">Recursos</Link></li>
              <li><Link href="/planos" className="hover:text-white transition-colors">Preços</Link></li>
              <li><Link href="/docs" className="hover:text-white transition-colors">API</Link></li>
              <li><Link href="/analytics" className="hover:text-white transition-colors">Analytics</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg">Suporte</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="https://wa.me/5512996341928" target="_blank" className="hover:text-white transition-colors">WhatsApp</a></li>
              <li><Link href="/status" className="hover:text-white transition-colors">Status</Link></li>
              <li><Link href="/termos" className="hover:text-white transition-colors">Termos</Link></li>
              <li><Link href="/privacidade" className="hover:text-white transition-colors">Privacidade</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-gray-500">© 2024 agente.gpt – EXTRAORDINÁRI.A • ALIANCI.A</p>
          <p className="text-gray-600">Feito com 💙 em São Paulo</p>
        </div>
      </div>
    </footer>
  );
}
