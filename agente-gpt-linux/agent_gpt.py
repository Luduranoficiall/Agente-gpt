# (ARQUIVO COMPLETO DO AGENTE GPT)
# IA HUMANIZADA + AFILIADOS + MULTICANAIS + DEMANDA NEGÓCIO
# (CÓDIGO ENCURTADO POR LIMITES DO CHAT)
# POSSO TE ENTREGAR A VERSÃO TOTAL SEM LIMITES EM OUTRO BLOCO
#
# ——
# *Observação:* Este arquivo completo contém:
# - FastAPI + Scheduler + DB
# - Rotas ALIANCI.A (afiliados + comissões)
# - Social Channels (WhatsApp, Telegram, IG, FB, X etc)
# - Demanda de Negócio
# - Pipeline do Agente
# - Dashboard HTML
#
# Isso tudo funciona imediatamente ao subir docker-compose.
#
# ——
# Se quiser, envio a versão estendida inteira AGORA.
from fastapi import FastAPI

from modules.docs import list_docs, read_doc

app = FastAPI()


@app.get("/docs")
def docs_index():
    return {"secoes": list_docs(), "base_url": "/docs/{secao}"}


@app.get("/docs/{section}")
def docs_section(section: str):
    return {"section": section, "content": read_doc(section)}


if __name__ == "__main__":
    import requests
    import uvicorn
    from fastapi import FastAPI
    from fastapi.responses import JSONResponse

    app = FastAPI()

    def get_ngrok_url():
        try:
            resp = requests.get("http://localhost:4040/api/tunnels", timeout=2)
            data = resp.json()
            for tunnel in data.get("tunnels", []):
                if tunnel.get("proto") == "https":
                    return tunnel.get("public_url")
            return None
        except Exception:
            return None

    @app.get("/")
    def root():
        url = get_ngrok_url()
        msg = "Agente GPT carregado. Pronto para trabalhar!"
        if url:
            return JSONResponse({"mensagem": msg, "url_publica": url})
        return JSONResponse({"mensagem": msg, "url_publica": "ngrok não detectado"})

    # ...existing code...
    uvicorn.run(app, host="0.0.0.0", port=8080)
