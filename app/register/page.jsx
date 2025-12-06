"use client";
import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

function RegisterContent() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoPessoa, setTipoPessoa] = useState("fisica"); // fisica ou juridica
  const [documento, setDocumento] = useState(""); // CPF ou CNPJ
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const plano = searchParams.get("plano") || "profissional";

  const register = async () => {
    if (!nome || !email || !senha || !documento) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      // Envia os dados para a API (incluindo plano e tipo de pessoa)
      // Para protótipo, vamos simular o sucesso se a API falhar ou não existir
      try {
        const res = await axios.post("/api/auth/register", { 
          nome, 
          email, 
          senha, 
          plano,
          tipoPessoa,
          documento 
        });
        if (res.data.token) localStorage.setItem("token", res.data.token);
      } catch (apiError) {
        console.warn("API Register falhou, usando mock para fluxo:", apiError);
        localStorage.setItem("token", "mock-token-" + Date.now());
        localStorage.setItem("user_name", nome);
      }
      
      // Redireciona para o checkout passando o plano
      router.push(`/checkout?plano=${plano}&email=${email}`);
    } catch (e) {
      console.error(e);
      alert("Erro ao registrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentChange = (e) => {
    let v = e.target.value.replace(/\D/g, "");
    if (tipoPessoa === "fisica") {
      if (v.length > 11) v = v.slice(0, 11);
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      if (v.length > 14) v = v.slice(0, 14);
      v = v.replace(/^(\d{2})(\d)/, "$1.$2");
      v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
      v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
      v = v.replace(/(\d{4})(\d)/, "$1-$2");
    }
    setDocumento(v);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl w-full max-w-md z-10 shadow-2xl">
        <h1 className="text-3xl font-bold mb-2 text-center text-[#FFD700]">Criar Conta</h1>
        <p className="text-center text-gray-400 mb-6">
          Assinando o plano: <span className="text-white font-bold uppercase">{plano}</span>
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Nome Completo</label>
            <input 
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-[#FFD700] outline-none transition-colors"
              placeholder="Seu nome" 
              value={nome} 
              onChange={e => setNome(e.target.value)} 
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input 
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-[#FFD700] outline-none transition-colors"
              placeholder="seu@email.com" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Senha</label>
            <input 
              type="password" 
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-[#FFD700] outline-none transition-colors"
              placeholder="••••••••" 
              value={senha} 
              onChange={e => setSenha(e.target.value)} 
            />
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="tipoPessoa" 
                value="fisica" 
                checked={tipoPessoa === "fisica"} 
                onChange={() => { setTipoPessoa("fisica"); setDocumento(""); }}
                className="accent-[#FFD700]"
              />
              <span>Pessoa Física</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="tipoPessoa" 
                value="juridica" 
                checked={tipoPessoa === "juridica"} 
                onChange={() => { setTipoPessoa("juridica"); setDocumento(""); }}
                className="accent-[#FFD700]"
              />
              <span>Empresarial</span>
            </label>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              {tipoPessoa === "fisica" ? "CPF" : "CNPJ"}
            </label>
            <input 
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-[#FFD700] outline-none transition-colors"
              placeholder={tipoPessoa === "fisica" ? "000.000.000-00" : "00.000.000/0000-00"} 
              value={documento} 
              onChange={handleDocumentChange} 
              maxLength={tipoPessoa === "fisica" ? 14 : 18}
            />
          </div>

          <button 
            onClick={register} 
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#FFD700] to-[#FDB931] text-black font-bold rounded-lg hover:opacity-90 transition-opacity mt-4 disabled:opacity-50"
          >
            {loading ? "Criando conta..." : "Continuar para Pagamento →"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Register() {
  return (
    <Suspense fallback={<div className="text-white text-center p-10">Carregando...</div>}>
      <RegisterContent />
    </Suspense>
  );
}