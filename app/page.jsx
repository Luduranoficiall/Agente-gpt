export default function Home() {
  return (
    <div style={{ padding: 40, background: "#0a0a0a", color: "white", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 40 }}>🚀 Agente GPT Master Ouro</h1>
      <p style={{ fontSize: 22 }}>O assistente de IA definitivo para empreendedores e empresas.</p>

      <h2 style={{ marginTop: 40 }}>Planos</h2>

      <div style={{ marginTop: 20 }}>
        <div style={{ padding: 20, background: "#1a1a1a", marginBottom: 20 }}>
          <h3>Membros ALIANCI.A — R$197/mês</h3>
          <p>Acesso ao agente premium, painel cliente e suporte.</p>
          <a href="/register" style={{ background: "gold", padding: 10, display: "inline-block", color: "black", textDecoration: "none", fontWeight: "bold" }}>Assinar Agora</a>
        </div>

        <div style={{ padding: 20, background: "#1a1a1a" }}>
          <h3>Clientes Externos — R$297/mês</h3>
          <p>A melhor IA comercial premium do Brasil.</p>
          <a href="/register" style={{ background: "gold", padding: 10, display: "inline-block", color: "black", textDecoration: "none", fontWeight: "bold" }}>Assinar Agora</a>
        </div>
      </div>
      
      <div style={{ marginTop: 40 }}>
        <a href="/login" style={{ color: "gold" }}>Já tem conta? Faça Login</a>
      </div>
    </div>
  );
}