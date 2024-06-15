from fastapi import FastAPI

from fastapi_backend.config import settings
from fastapi_backend.azure_factory import AzureOpenAIFactory

app = FastAPI(
    title="FastAPI Backend",
    description="This is a simple FastAPI backend for the LLM Arena project.",
    version="0.1.0",
)

@app.get("/")
def read_root():
    return {"Hello": "World"} 

@app.get("/models")
def get_models():
    factory = AzureOpenAIFactory(settings)
    models = factory.pick_two_random_models()
    return models