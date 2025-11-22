import os
import requests

def send_linkedin(urn_id: str, message: str):
    token = os.getenv("LINKEDIN_TOKEN")
    if not token:
        return {"error": "LINKEDIN_TOKEN não configurado."}

    url = "https://api.linkedin.com/v2/ugcPosts"

    payload = {
        "author": f"urn:li:person:{urn_id}",
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {"text": message},
                "shareMediaCategory": "NONE"
            }
        },
        "visibility": {"com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"}
    }

    headers = {
        "Authorization": f"Bearer {token}",
        "X-Restli-Protocol-Version": "2.0.0",
        "Content-Type": "application/json",
    }

    r = requests.post(url, json=payload, headers=headers)
    return r.json()
