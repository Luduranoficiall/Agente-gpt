import "./globals.css";

export const metadata = {
  title: "agente.gpt | MASTER PREMIUM ULTRA OURO – EXTRAORDINÁRI.A • ALIANCI.A",
  description: "Plataforma de IA Conversacional Enterprise com Analytics Avançado",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="theme-color" content="#00A8FF" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://unpkg.com/lucide@latest"></script>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}