from typing import Any, Dict

from .utils import emit_humanized


def run_auditoria(session, config: Dict[str, Any]):
    """
    AURI.A — 12 Peneiras para avaliar empresas.
    Implementação simplificada que pode evoluir com dados reais.
    """
    filtros = [
        ("Propósito/Valores", 9),
        ("Viabilidade Financeira", 7),
        ("Produto/Mercado", 8),
        ("Equipe/Liderança", 8),
        ("Marca/Posicionamento", 7),
        ("Compliance/Legal", 7),
        ("Operação/Processos", 6),
        ("Tecnologia/IA", 9),
        ("Canais de Distribuição", 7),
        ("Parcerias", 6),
        ("Escalabilidade", 8),
        ("Impacto Social/Kingdom", 9),
    ]

    media = round(sum(x[1] for x in filtros) / len(filtros), 2)
    if media >= 8:
        veredito = "ouro"
    elif media >= 6.5:
        veredito = "prata"
    else:
        veredito = "chumbo"

    return emit_humanized("AURI.A", f"Média: {media} | Veredito: {veredito}")
