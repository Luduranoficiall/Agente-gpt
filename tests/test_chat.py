from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_chat_route():
    resp = client.post("/chat", json={
        "user_id": "test-user",
        "message": "Olá agente"
    })
    assert resp.status_code == 200
    assert "reply" in resp.json()
