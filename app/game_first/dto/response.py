"""Response DTOs for casinos."""
from dataclasses import dataclass


@dataclass
class ModelResponse:
    id: int
    name: str
