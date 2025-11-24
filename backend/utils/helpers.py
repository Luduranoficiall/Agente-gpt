import datetime

def now():
    return datetime.datetime.now().isoformat()

def clean_text(text: str) -> str:
    return text.strip().replace("\n", " ").replace("  ", " ")
