from typing import Any, Dict, List, Tuple

TwelveFilters = List[Tuple[str, int, str]]


def score_12_peneiras(dados: Dict[str, Any]) -> TwelveFilters:
    filtros = [
        ("Propósito/Valores", 9, "Alinhado com integridade, justiça e caráter."),
        ("Viabilidade Financeira", 7, "Unit economics aceitável, melhora com escala."),
        ("Produto/Mercado", 8, "Dor real e proposta clara."),
        ("Equipe/Liderança", 8, "Compromisso e visão IA-First."),
        ("Marca/Posicionamento", 7, "Arquitetura de marcas sólida."),
        ("Compliance/Legal", 7, "Acompanhamento tributário necessário."),
        ("Operação/Processos", 6, "Automação em curso, padronizar mais."),
        ("Tecnologia/IA", 9, "DNA IA-First e multiagente."),
        ("Canais/Distribuição", 7, "WhatsApp/Telegram fortes, expandir mídia."),
        ("Parcerias", 6, "Tratar APIs de cashback e redes nacionais."),
        ("Escalabilidade", 8, "White-label multi-tenant promissor."),
        ("Impacto Social/Kingdom", 9, "Orientação para abundância."),
    ]
    return filtros
