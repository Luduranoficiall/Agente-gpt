import dotenv from "dotenv";
dotenv.config();
import { createClient } from "@vercel/postgres";

// Wrapper para evitar erros fatais se a variável de ambiente não estiver definida no build
const connectionString = process.env.POSTGRES_URL || "postgres://default:default@localhost:5432/default";

export const db = createClient({
  connectionString
});

// Log de aviso se não estiver conectado (apenas dev)
if (!process.env.POSTGRES_URL && process.env.NODE_ENV !== 'production') {
  console.warn("⚠️  AVISO: POSTGRES_URL não definida. O banco de dados pode não funcionar.");
}
