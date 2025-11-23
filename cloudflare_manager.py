import os

import requests

CLOUDFLARE_API_TOKEN = os.getenv(
    "CLOUDFLARE_API_TOKEN", "1234567893feefc5f0q5000bfo0c38d90bbeb"
).strip()
ZONE_ID = os.getenv("CLOUDFLARE_ZONE_ID",
                    "cd7d0123e3012345da9420df9514dad0").strip()
DOMAIN = "agente.extraordinaria.ai"
IP = os.getenv("SERVER_IP", "SEU_IP_PUBLICO_AQUI").strip()

headers = {
    "Authorization": f"Bearer {CLOUDFLARE_API_TOKEN}",
    "Content-Type": "application/json",
}


def get_dns_records():
    url = f"https://api.cloudflare.com/client/v4/zones/{ZONE_ID}/dns_records"
    resp = requests.get(url, headers=headers)
    with open("cloudflare_manager_dns.log", "w", encoding="utf-8") as f:
        f.write(resp.text)
    return resp.json()


def update_dns_record(record_id, ip):
    url = (
        f"https://api.cloudflare.com/client/v4/zones/{ZONE_ID}/dns_records/{record_id}"
    )
    data = {"type": "A", "name": DOMAIN, "content": ip, "proxied": True}
    resp = requests.put(url, headers=headers, json=data)
    with open("cloudflare_manager_update.log", "w", encoding="utf-8") as f:
        f.write(resp.text)
    return resp.json()


def main():
    print("Validando DNS Cloudflare...")
    records = get_dns_records()
    for rec in records.get("result", []):
        if rec["name"] == DOMAIN and rec["type"] == "A":
            print(f"Registro encontrado: {rec['name']} -> {rec['content']}")
            if rec["content"] != IP:
                print(f"Atualizando IP para {IP}...")
                update_dns_record(rec["id"], IP)
                print("IP atualizado!")
            else:
                print("IP já está correto.")
            break
    else:
        print("Registro A não encontrado. Crie manualmente no painel Cloudflare.")


if __name__ == "__main__":
    main()
