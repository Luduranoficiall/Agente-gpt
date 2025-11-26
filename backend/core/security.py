def sanitize(text: str) -> str:
    blacklist = ["DROP", "DELETE", "--", ";", "INSERT", "UPDATE"]
    clean = text
    for bad in blacklist:
        clean = clean.replace(bad, "")
    return clean
