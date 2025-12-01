import "../styles/globals.css";

export const metadata = {
  title: "agente.gpt • EXTRAORDINÁRI.A",
  description: "IA oficial da ALIANCI.A – atendimento premium humanizado",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
