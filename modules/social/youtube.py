def send_youtube_comment(video_id: str, text: str):
    return {
        "status": "OK",
        "message": "YouTube API exige OAuth2 (manual). Endpoint preparado.",
        "video": video_id,
        "comment": text,
    }
