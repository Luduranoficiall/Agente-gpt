from pydantic import BaseModel

class ChatRequest(BaseModel):
    user_id: str
    message: str
    temperature: float = 0.4
