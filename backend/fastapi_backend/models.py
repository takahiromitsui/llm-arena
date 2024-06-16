from dataclasses import dataclass
from typing import Literal

from pydantic import BaseModel


@dataclass
class LLMModel:
    blind_name: str  # A or B
    display_name: str  # e.g., gpt3
    full_name: str  # e.g., sometech-gpt-35-turbo


@dataclass
class UserInput(BaseModel):
    full_name: str
    prompt: str


@dataclass
class UpdateScores(BaseModel):
    llm_models: list[LLMModel]
    feedback: Literal["A", "B", "tie", "bad"]
