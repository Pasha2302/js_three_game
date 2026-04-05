"""Request DTOs."""
from dataclasses import dataclass


@dataclass
class ModelCreate:
    name: str
