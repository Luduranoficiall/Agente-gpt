from fastapi import APIRouter, HTTPException, Request
from .pix import generate_pix, handle_pix_webhook

router = APIRouter()

@router.post("/pix/generate")
def api_generate_pix(amount: float, txid: str):
    try:
        return generate_pix(amount, txid)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/pix/webhook")
async def api_pix_webhook(request: Request):
    data = await request.json()
    return handle_pix_webhook(data)
