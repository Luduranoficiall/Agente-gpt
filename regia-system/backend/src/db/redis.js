import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
});

redis.on("connect", () => console.log("🟥 Redis conectado com sucesso"));
redis.on("error", (err) => console.error("Erro no Redis:", err));

export default redis;

/* ========================================================
   FUNÇÕES PRONTAS PARA USAR NO PROJETO
======================================================== */
export async function redisSet(key, value, ttl = 3600) {
  await redis.set(key, JSON.stringify(value), "EX", ttl);
}

export async function redisGet(key) {
  const data = await redis.get(key);
  try {
    return JSON.parse(data);
  } catch {
    return data;
  }
}

export async function redisDel(key) {
  return redis.del(key);
}
