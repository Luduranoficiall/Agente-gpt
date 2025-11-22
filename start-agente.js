import { execSync } from "child_process";
import fs from "fs";

const TUNNEL_NAME = "agente";
const DOMAIN = "agente.extraordinaria.ai";
const LOCAL_PORT = 4000;

function run(cmd) {
  console.log("\n➡️ Executando:", cmd);
  try {
    const output = execSync(cmd, { stdio: "pipe" }).toString();
    console.log(output);
    return output;
  } catch (err) {
    console.error(err.stdout?.toString() || err.message);
  }
}

// 1. Verifica se cloudflared está instalado
console.log("🔍 Verificando cloudflared...");
run("which cloudflared");

// 2. Cria túnel (apenas se não existir)
console.log("🔧 Criando túnel (se não existir)...");
run(`cloudflared tunnel create ${TUNNEL_NAME}`);

// 3. Captura o tunnel ID
console.log("🔍 Capturando TUNNEL ID...");
const output = execSync(`cloudflared tunnel list`).toString();
const tunnelLine = output.split("\n").find(line => line.includes(TUNNEL_NAME));
const TUNNEL_ID = tunnelLine.split(" ")[0].trim();

console.log(`📌 TUNNEL ID encontrado: ${TUNNEL_ID}`);

// 4. Cria arquivo de config do tunnel
console.log("📝 Criando arquivo de configuração...");
const config = `
tunnel: ${TUNNEL_ID}
credentials-file: /root/.cloudflared/${TUNNEL_ID}.json

ingress:
  - hostname: ${DOMAIN}
    service: http://localhost:${LOCAL_PORT}
  - service: http_status:404
`;

if (!fs.existsSync("/root/.cloudflared")) {
  run("mkdir -p /root/.cloudflared");
}

fs.writeFileSync(`/root/.cloudflared/${TUNNEL_NAME}.yml`, config);

console.log("✅ Arquivo criado em /root/.cloudflared/agente.yml");

// 5. Criar DNS automaticamente
console.log("🌐 Criando DNS CNAME automaticamente na Cloudflare...");
run(`cloudflared tunnel route dns ${TUNNEL_NAME} ${DOMAIN}`);

// 6. Iniciar a aplicação do agente
console.log("🚀 Iniciando backend do agente...");
run("npm install");
run("npm run dev");

// 7. Iniciar o tunnel
console.log("🌐 Subindo túnel público do agente...");
run(`cloudflared tunnel run ${TUNNEL_NAME}`);

console.log(`\n🎉 SEU AGENTE ESTÁ ONLINE AGORA!\n\n🌐 URL Pública: https://${DOMAIN}\n➡️ Webhook: https://${DOMAIN}/webhook\n\nUse essa URL HOJE MESMO com seus clientes.\n`);