import "../styles/globals.css";

export const metadata = {
  title: "Agente Premium Master Ouro",
  description: "Sistema Enterprise Agente Premium Master Ouro - Atendimento Humanizado e Inteligente",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
