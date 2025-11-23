from modules.utils import logger
from typing import List
from pathlib import Path
import json


def list_sheets():
    return ["Sheet1", "Sheet2"]


def write_row(sheet_name, row_number, values):
    return True


def read_rows(sheet_name):
    return []


SHEETS_BUFFER = Path("storage") / "sheets_buffer.jsonl"
SHEETS_BUFFER.parent.mkdir(exist_ok=True)


def append_values(worksheet: str, values: List[list]):
    """Stub: persiste dados em arquivo local para inspecionar payloads."""
    with SHEETS_BUFFER.open("a", encoding="utf-8") as fp:
        fp.write(json.dumps({"worksheet": worksheet, "values": values}) + "\n")
    logger.info("[SHEETS] %s linhas adicionadas em %s", len(values), worksheet)
