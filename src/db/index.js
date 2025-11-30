import dotenv from "dotenv";
dotenv.config();
import { createClient } from "@vercel/postgres";

export const db = createClient({
  connectionString: process.env.POSTGRES_URL
});
