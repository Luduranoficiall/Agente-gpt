import "./globals.css";

export const metadata = {
  title: "Agente GPT Master Ouro",
  description: "Plataforma de IA Conversacional",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, padding: 0, fontFamily: 'sans-serif' }}>
        {children}
      </body>
    </html>
  );
}