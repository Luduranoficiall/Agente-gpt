from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import uvicorn

from agent_gpt import get_agent_url

app = FastAPI(title="AGENTE EXTRAORDINÁRIA", version="1.0.0")

class Message(BaseModel):
    text: str

@app.get("/")
def root():
    return {"status": "online", "agent_url": get_agent_url()}

@app.post("/chat")
def chat(message: Message):
    return {"response": f"Você disse: {message.text}"}

@app.get("/run")
def run_agent():
    return {"status": "executando agente"}

if __name__ == "__main__":
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
