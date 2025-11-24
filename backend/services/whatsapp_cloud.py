import requests
from core.config import settings

class WhatsAppCloud:
    def send_message(self, to, text):
        url = f"{settings.WHATSAPP_CLOUD_URL}/{settings.WHATSAPP_PHONE_ID}/messages"
        headers = {
            "Authorization": f"Bearer {settings.WHATSAPP_TOKEN}",
            "Content-Type": "application/json"
        }
        data = {
            "messaging_product": "whatsapp",
            "to": to,
            "type": "text",
            "text": {"body": text}
        }
        requests.post(url, headers=headers, json=data)

wa_cloud = WhatsAppCloud()
