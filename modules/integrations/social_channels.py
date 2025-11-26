"""SOCIAL CHANNELS — EXTRAORDINARI.A / AGENTE GPT"""

import os
import json
import requests


class SocialChannelError(Exception):
    """Erro padronizado para integrações sociais."""


class ChannelName:
    WHATSAPP_CLOUD = "whatsapp_cloud"
    WHATSAPP_360 = "whatsapp_360"
    TELEGRAM = "telegram"
    INSTAGRAM = "instagram"
    FACEBOOK = "facebook"
    X = "x"
    TIKTOK = "tiktok"
    YOUTUBE = "youtube"
    LINKEDIN = "linkedin"
    PINTEREST = "pinterest"
    THREADS = "threads"
    KWAI = "kwai"


def send_whatsapp_cloud(destination: str, message: str):
    token = os.getenv("WHATSAPP_CLOUD_TOKEN")
    phone_id = os.getenv("WHATSAPP_CLOUD_PHONE_NUMBER_ID")

    if not token or not phone_id:
        raise SocialChannelError("WhatsApp Cloud não configurado corretamente.")

    url = f"https://graph.facebook.com/v18.0/{phone_id}/messages"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }

    payload = {
        "messaging_product": "whatsapp",
        "to": destination,
        "type": "text",
        "text": {"body": message},
    }

    r = requests.post(url, headers=headers, json=payload, timeout=30)
    if r.status_code >= 300:
        raise SocialChannelError(r.text)

    return r.json()


def send_whatsapp_360(destination: str, message: str):
    token = os.getenv("WABA_TOKEN")

    if not token:
        raise SocialChannelError("WABA_TOKEN não configurado.")

    url = "https://waba.360dialog.io/v1/messages"
    headers = {
        "D360-API-KEY": token,
        "Content-Type": "application/json",
    }

    payload = {
        "to": destination,
        "type": "text",
        "text": {"body": message},
    }

    r = requests.post(url, headers=headers, json=payload, timeout=30)
    if r.status_code >= 300:
        raise SocialChannelError(r.text)

    return r.json()


def send_telegram(destination: str, message: str):
    token = os.getenv("TELEGRAM_BOT_TOKEN")

    if not token:
        raise SocialChannelError("TELEGRAM_BOT_TOKEN não configurado.")

    url = f"https://api.telegram.org/bot{token}/sendMessage"

    payload = {
        "chat_id": destination,
        "text": message,
    }

    r = requests.post(url, json=payload, timeout=30)
    if r.status_code >= 300:
        raise SocialChannelError(r.text)

    return r.json()


def send_instagram(destination: str, message: str):
    token = os.getenv("INSTAGRAM_ACCESS_TOKEN")
    ig_id = os.getenv("INSTAGRAM_BUSINESS_ID")

    if not token or not ig_id:
        raise SocialChannelError("Instagram não configurado.")

    url = f"https://graph.facebook.com/v18.0/{ig_id}/messages"
    payload = {"recipient": {"id": destination}, "message": {"text": message}}

    headers = {"Authorization": f"Bearer {token}"}

    r = requests.post(url, json=payload, headers=headers, timeout=30)
    if r.status_code >= 300:
        raise SocialChannelError(r.text)

    return r.json()


def send_facebook(destination: str, message: str):
    token = os.getenv("FACEBOOK_PAGE_ACCESS_TOKEN")
    page_id = os.getenv("FACEBOOK_PAGE_ID")

    if not token or not page_id:
        raise SocialChannelError("Facebook não configurado.")

    url = "https://graph.facebook.com/v18.0/me/messages"
    payload = {
        "recipient": {"id": destination},
        "message": {"text": message},
        "messaging_type": "UPDATE",
    }

    headers = {"Authorization": f"Bearer {token}"}

    r = requests.post(url, json=payload, headers=headers, timeout=30)
    if r.status_code >= 300:
        raise SocialChannelError(r.text)

    return r.json()


def send_x(destination: str, message: str):
    token = os.getenv("X_BEARER_TOKEN")

    if not token:
        raise SocialChannelError("X_BEARER_TOKEN não configurado.")

    url = "https://api.twitter.com/2/tweets"

    payload = {"text": f"@{destination} {message}"}

    headers = {"Authorization": f"Bearer {token}"}

    r = requests.post(url, json=payload, headers=headers, timeout=30)
    if r.status_code >= 300:
        raise SocialChannelError(r.text)

    return r.json()


def send_tiktok(destination: str, message: str):
    token = os.getenv("TIKTOK_ACCESS_TOKEN")
    acc = os.getenv("TIKTOK_BUSINESS_ACCOUNT_ID")

    if not token or not acc:
        raise SocialChannelError("TikTok não configurado.")

    url = "https://open.tiktokapis.com/v2/post/publish/"
    payload = {"caption": f"{destination} {message}", "account_id": acc}

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }

    r = requests.post(url, json=payload, headers=headers, timeout=30)
    if r.status_code >= 300:
        raise SocialChannelError(r.text)

    return r.json()


def send_youtube(destination: str, message: str):
    key = os.getenv("YOUTUBE_API_KEY")
    channel = os.getenv("YOUTUBE_CHANNEL_ID")

    if not key or not channel:
        raise SocialChannelError("YouTube não configurado.")

    url = f"https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&key={key}"

    payload = {
        "snippet": {
            "videoId": destination,
            "topLevelComment": {"snippet": {"textOriginal": message}},
        }
    }

    r = requests.post(url, json=payload, timeout=30)
    if r.status_code >= 300:
        raise SocialChannelError(r.text)

    return r.json()


def send_linkedin(destination: str, message: str):
    token = os.getenv("LINKEDIN_ACCESS_TOKEN")
    org = os.getenv("LINKEDIN_ORGANIZATION_ID")

    if not token:
        raise SocialChannelError("LinkedIn não configurado.")

    url = "https://api.linkedin.com/v2/posts"

    payload = {
        "author": f"urn:li:organization:{org}",
        "commentary": message,
        "visibility": "PUBLIC",
    }

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }

    r = requests.post(url, json=payload, headers=headers, timeout=30)
    if r.status_code >= 300:
        raise SocialChannelError(r.text)

    return r.json()


def send_pinterest(destination: str, message: str):
    token = os.getenv("PINTEREST_ACCESS_TOKEN")

    if not token:
        raise SocialChannelError("Pinterest não configurado.")

    url = "https://api.pinterest.com/v5/pins"

    payload = {"link": destination, "title": message}

    headers = {
        "Authorization": f"Bearer {token}",
    }

    r = requests.post(url, json=payload, headers=headers, timeout=30)
    if r.status_code >= 300:
        raise SocialChannelError(f"Pinterest error: {r.text}")
    return r.json()


def send_threads(destination: str, message: str):
    webhook = os.getenv("THREADS_WEBHOOK_URL")

    if not webhook:
        raise SocialChannelError("Threads não configurado.")

    payload = {"destination": destination, "message": message}

    r = requests.post(webhook, json=payload, timeout=30)
    if r.status_code >= 300:
        raise SocialChannelError(r.text)

    return r.json()


def send_kwai(destination: str, message: str):
    webhook = os.getenv("KWAI_WEBHOOK_URL")

    if not webhook:
        raise SocialChannelError("Kwai não configurado.")

    payload = {"destination": destination, "message": message}

    r = requests.post(webhook, json=payload, timeout=30)
    if r.status_code >= 300:
        raise SocialChannelError(r.text)

    return r.json()


def send_to_channel(channel: str, destination: str, message: str):
    channel = channel.lower().strip()

    mapping = {
        ChannelName.WHATSAPP_CLOUD: send_whatsapp_cloud,
        ChannelName.WHATSAPP_360: send_whatsapp_360,
        ChannelName.TELEGRAM: send_telegram,
        ChannelName.INSTAGRAM: send_instagram,
        ChannelName.FACEBOOK: send_facebook,
        ChannelName.X: send_x,
        ChannelName.TIKTOK: send_tiktok,
        ChannelName.YOUTUBE: send_youtube,
        ChannelName.LINKEDIN: send_linkedin,
        ChannelName.PINTEREST: send_pinterest,
        ChannelName.THREADS: send_threads,
        ChannelName.KWAI: send_kwai,
    }

    if channel not in mapping:
        raise SocialChannelError(f"Canal '{channel}' não é suportado.")

    return mapping[channel](destination, message)


def broadcast(message: str, channels: list, destinations: list):
    results = []

    for ch in channels:
        for dest in destinations:
            try:
                r = send_to_channel(ch, dest, message)
                results.append({"channel": ch, "destination": dest, "result": r})
            except Exception as e:
                results.append({"channel": ch, "destination": dest, "error": str(e)})

    return results
