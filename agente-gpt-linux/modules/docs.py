# ============================================================
# DOCUMENTAÇÃO AUTOMÁTICA — AGENTE GPT
# ============================================================

from fastapi import HTTPException
import os
from pathlib import Path

DOCS_DIR = Path(__file__).resolve().parent.parent / "docs"

def list_docs():
    """
    Retorna lista das seções disponíveis.
    """
    sections = []
    for f in DOCS_DIR.glob("*.md"):
        sections.append(f.stem)
    return sections


def read_doc(section: str):
    """
    Lê conteúdo de uma seção específica da documentação.
    """
    file_path = DOCS_DIR / f"{section}.md"
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Seção de documentação não encontrada.")
    return file_path.read_text(encoding="utf-8")
