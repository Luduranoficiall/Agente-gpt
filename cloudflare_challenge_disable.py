import os
import sys

import requests

CLOUDFLARE_API_TOKEN = os.getenv(
    "CLOUDFLARE_API_TOKEN", "1234567893feefc5f0q5000bfo0c38d90bbeb"
).strip()
ZONE_ID = os.getenv("CLOUDFLARE_ZONE_ID", "cd7d0123e3012345da9420df9514dad0")

if not CLOUDFLARE_API_TOKEN or len(CLOUDFLARE_API_TOKEN) < 20:
    print(
        "[ERRO] Token da API Cloudflare está vazio ou muito curto. Verifique o valor em .env!"
    )
    sys.exit(1)

headers = {
    "Authorization": f"Bearer {CLOUDFLARE_API_TOKEN}",
    "Content-Type": "application/json",
}


def disable_under_attack_mode():
    url = (
        f"https://api.cloudflare.com/client/v4/zones/{ZONE_ID}/settings/security_level"
    )
    # 'under_attack' para ativar, 'medium' para desativar
    data = {"value": "medium"}
    resp = requests.patch(url, headers=headers, json=data)
    print(f"Status code: {resp.status_code}")
    print(f"Response: {resp.text}")
    with open("cloudflare_challenge_error.log", "w", encoding="utf-8") as f:
        f.write(f"Status code: {resp.status_code}\n")
        f.write(resp.text)
    if resp.status_code == 200:
        print("Modo Sob Ataque desativado com sucesso!")
    else:
        print("Erro ao desativar. Detalhes salvos em cloudflare_challenge_error.log.")


if __name__ == "__main__":
    disable_under_attack_mode()
