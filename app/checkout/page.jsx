"use client";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plano = searchParams.get("plano") || "profissional";
  const email = searchParams.get("email") || "";
  
  const [metodo, setMetodo] = useState("pix");
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("idle"); // idle, processing, approved

  const valor = plano === "empresarial" ? "297,00" : "197,00";

  const handlePayment = async () => {
    setLoading(true);
    setPaymentStatus("processing");
    
    // Simulação de processamento de pagamento
    setTimeout(() => {
      setPaymentStatus("approved");
      localStorage.setItem("subscription", "active");
      localStorage.setItem("plan", plano);
      
      setTimeout(() => {
        // Redireciona para o Agente (Home) para começar a usar
        router.push("/"); 
      }, 2000);
    }, 3000);
  };

  if (paymentStatus === "approved") {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="text-center z-10 animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(34,197,94,0.5)]">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Pagamento Aprovado!</h1>
          <p className="text-gray-400 text-lg">Preparando seu Agente Master Ouro...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl w-full max-w-4xl z-10 shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Resumo do Pedido */}
        <div className="p-8 md:w-1/2 bg-white/5 border-r border-white/10">
          <h2 className="text-2xl font-bold mb-6 text-[#FFD700]">Resumo do Pedido</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div>
                <h3 className="font-bold text-lg capitalize">Plano {plano}</h3>
                <p className="text-sm text-gray-400">Assinatura Mensal</p>
              </div>
              <div className="text-xl font-bold">R$ {valor}</div>
            </div>
            
            <div className="flex justify-between items-center text-gray-300">
              <span>Subtotal</span>
              <span>R$ {valor}</span>
            </div>
            <div className="flex justify-between items-center text-[#FFD700] font-bold text-xl pt-4">
              <span>Total</span>
              <span>R$ {valor}</span>
            </div>
          </div>

          <div className="bg-[#FFD700]/10 border border-[#FFD700]/30 p-4 rounded-lg">
            <p className="text-sm text-[#FFD700]">
              🔒 Pagamento 100% seguro. Seus dados estão protegidos.
            </p>
          </div>
        </div>

        {/* Dados de Pagamento */}
        <div className="p-8 md:w-1/2">
          <h2 className="text-2xl font-bold mb-6">Pagamento</h2>
          
          <div className="mb-6">
            <p className="text-sm text-gray-400 mb-2">Email da conta</p>
            <div className="bg-black/50 p-3 rounded border border-white/10 text-gray-300">
              {email || "email@exemplo.com"}
            </div>
          </div>

          <div className="space-y-3 mb-8">
            <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${metodo === 'pix' ? 'border-[#FFD700] bg-[#FFD700]/10' : 'border-white/10 hover:border-white/30'}`}>
              <input 
                type="radio" 
                name="metodo" 
                value="pix" 
                checked={metodo === "pix"} 
                onChange={() => setMetodo("pix")}
                className="accent-[#FFD700]"
              />
              <div className="flex-1">
                <span className="font-bold block">PIX (Aprovação Imediata)</span>
                <span className="text-xs text-gray-400">QR Code instantâneo</span>
              </div>
              <span className="text-2xl">💠</span>
            </label>

            <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${metodo === 'cartao' ? 'border-[#FFD700] bg-[#FFD700]/10' : 'border-white/10 hover:border-white/30'}`}>
              <input 
                type="radio" 
                name="metodo" 
                value="cartao" 
                checked={metodo === "cartao"} 
                onChange={() => setMetodo("cartao")}
                className="accent-[#FFD700]"
              />
              <div className="flex-1">
                <span className="font-bold block">Cartão de Crédito</span>
                <span className="text-xs text-gray-400">Até 12x sem juros</span>
              </div>
              <span className="text-2xl">💳</span>
            </label>
          </div>

          <button 
            onClick={handlePayment}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-[#FFD700] to-[#FDB931] text-black font-bold text-lg rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-[#FFD700]/20"
          >
            {loading ? "Processando..." : `Pagar R$ ${valor}`}
          </button>
        </div>

      </div>
    </div>
  );
}

export default function Checkout() {
  return (
    <Suspense fallback={<div className="text-white text-center p-10">Carregando checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}