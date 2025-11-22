import openai
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

async def gerar_resposta(texto):
    try:
        r = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": """
Você é o AGENTE EXTRAORDINÁRIA.AI:
- extremamente humano
- educado
- rápido
- direto ao ponto
- nunca enrola
- não inventa informação
- não promete ganhos financeiros
- sempre propõe um próximo passo
                """
                },
                {"role": "user", "content": texto}
            ]
        )
        return r["choices"][0]["message"]["content"]
    except:
        return "Estou com uma instabilidade agora, pode repetir?"
