from fastapi import APIRouter
from models.chat_models import ChatRequest
from models.response_models import ChatResponse
from services.ai_service import AIService

router = APIRouter()
ai = AIService()

@router.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    response = ai.chat_whatsapp(req.user_id, req.message)
    return ChatResponse(reply=response)
