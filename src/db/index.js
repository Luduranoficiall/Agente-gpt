import { createClient } from "@vercel/postgres";
import dotenv from "dotenv";
dotenv.config();

export const db = createClient({
  connectionString: process.env.POSTGRES_URL
});
