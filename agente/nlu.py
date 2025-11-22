import openai
import os

async def detectar_intencao(texto):
    r = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": """
Classifique a intenção do usuário em uma palavra:
saudacao, duvida, reclamacao, elogio, humano,
economia, aliancia, irritado, urgente, adeus, neutro.
                """
            },
            {"role": "user", "content": texto}
        ]
    )
    return r["choices"][0]["message"]["content"].strip().lower()
