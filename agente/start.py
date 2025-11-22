import os

print("Iniciando agente EXTRAORDINARIA.AI...")

os.system("uvicorn app:app --host 0.0.0.0 --port 4000 &")
os.system("bash start-tunnel.sh")
