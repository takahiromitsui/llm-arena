from dotenv import load_dotenv
import os
from dataclasses import dataclass


# Load environment variables
load_dotenv()


@dataclass
class Settings:
    AZURE_OPENAI_API_BASE_URL: str
    AZURE_OPENAI_API_KEY: str
    AZURE_OPENAI_API_VERSION: str


# settings
settings = Settings(
    AZURE_OPENAI_API_BASE_URL=os.getenv("AZURE_OPENAI_API_BASE_URL", ""),
    AZURE_OPENAI_API_KEY=os.getenv("AZURE_OPENAI_API_KEY", ""),
    AZURE_OPENAI_API_VERSION=os.getenv("AZURE_OPENAI_API_VERSION", ""),
)
# models
llm_models = [
    "gpt-35-turbo",
    "gpt-4",
    "gpt-4-32k",
    "gpt-4o-mini",
]

# This is the temporal solution for storing scores
# Global variable for scores
SCORES = {model: 0 for model in llm_models}
