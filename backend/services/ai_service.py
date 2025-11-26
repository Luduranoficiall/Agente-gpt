from openai import OpenAI
from core.db import SessionLocal
from core.config import settings
from models.user import User
from models.message import Message
from services.whatsapp_blocks import bloco_whatsapp
from services.planos import bloco_planos
from services.apresentacao import bloco_apresentacao

class AIService:
    def __init__(self):
        self.client = OpenAI(api_key=settings.OPENAI_API_KEY)
        self.model = "gpt-4o-mini"

    def get_or_create_user(self, db, phone):
        user = db.query(User).filter(User.phone == phone).first()
        if not user:
            user = User(phone=phone)
            db.add(user)
            db.commit()
            db.refresh(user)
        return user

    def chat_whatsapp(self, phone, text):
        db = SessionLocal()
        user = self.get_or_create_user(db, phone)
        db.add(Message(user_id=user.id, sender="user", content=text))
        db.commit()
        base_prompt = """
Você é o agente.gpt – versão ULTRA ENTERPRISE.
Apenas WhatsApp é permitido para contato.
Nunca use e-mail.
"""
        reply = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": base_prompt},
                {"role": "user", "content": text}
            ]
        ).choices[0].message.content
        low = text.lower()
        if "atendimento" in low:
            reply += "\n\n" + bloco_whatsapp()
        if "plano" in low:
            reply += "\n\n" + bloco_planos()
        if "quem é você" in low:
            reply += "\n\n" + bloco_apresentacao()
        db.add(Message(user_id=user.id, sender="agent", content=reply))
        db.commit()
        return reply
