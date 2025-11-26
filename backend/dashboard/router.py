from fastapi import APIRouter
from core.db import SessionLocal
from models.user import User
from models.message import Message

router = APIRouter()

@router.get("/admin/analytics")
def analytics():
    db = SessionLocal()
    total_users = db.query(User).count()
    total_messages = db.query(Message).count()
    return {
        "total_users": total_users,
        "total_messages": total_messages,
        "status": "online"
    }

@router.get("/admin/messages")
def list_messages():
    db = SessionLocal()
    msgs = db.query(Message).all()
    return [
        {
            "id": m.id,
            "user_id": m.user_id,
            "sender": m.sender,
            "content": m.content,
            "created_at": m.created_at.isoformat(),
        }
        for m in msgs
    ]
