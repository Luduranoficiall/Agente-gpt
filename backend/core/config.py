import os

class Settings:
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
    DATABASE_URL = os.getenv("DATABASE_URL", "")
    WHATSAPP_TOKEN = os.getenv("WHATSAPP_TOKEN", "")
    WHATSAPP_PHONE_ID = os.getenv("WHATSAPP_PHONE_ID", "")
    WHATSAPP_CLOUD_URL = "https://graph.facebook.com/v20.0"
    VERIFY_TOKEN = os.getenv("WHATSAPP_VERIFY_TOKEN", "AGENTE_GPT_VERIFY")
    LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

settings = Settings()
