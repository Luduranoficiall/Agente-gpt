from .whatsapp import send_whatsapp
from .telegram import send_telegram
from .instagram import send_instagram
from .facebook import send_facebook
from .twitter import send_twitter
from .youtube import send_youtube_comment
from .linkedin import send_linkedin
from .pinterest import send_pinterest
from .kwai import send_kwai

def send_message(platform: str, target: str, message: str):
    platform = platform.lower()

    if platform == "whatsapp":
        return send_whatsapp(target, message)

    if platform == "telegram":
        return send_telegram(target, message)

    if platform == "instagram":
        return send_instagram(target, message)

    if platform == "facebook":
        return send_facebook(target, message)

    if platform == "twitter":
        return send_twitter(target, message)

    if platform == "youtube":
        return send_youtube_comment(target, message)

    if platform == "linkedin":
        return send_linkedin(target, message)

    if platform == "pinterest":
        return send_pinterest(message)

    if platform == "kwai":
        return send_kwai(message)

    return {"error": "Plataforma desconhecida"}
