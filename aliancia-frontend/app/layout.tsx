import "./globals.css";
import { AuthProvider } from "../context/AuthContext";

export const metadata = {
  title: "ALIANCI.A",
  description: "Plataforma oficial do ecossistema EXTRAORDINÁRI.A",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
