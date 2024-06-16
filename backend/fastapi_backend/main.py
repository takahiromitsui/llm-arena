from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi_backend.config import settings
from fastapi_backend.azure_factory import AzureOpenAIFactory

from fastapi_backend.models import UserInput

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

@app.post("/stream")
async def stream(userInput: UserInput):
    factory = AzureOpenAIFactory(settings)
    data = await factory.stream_response(model=userInput.model, prompt=userInput.prompt)
    return data