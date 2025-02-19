from fastapi_backend.azure_factory import AzureOpenAIFactory
from fastapi_backend.config.config import settings
from fastapi import APIRouter


router = APIRouter()


@router.get(path="")
def get_models():
    factory = AzureOpenAIFactory(settings)
    models = factory.pick_two_random_models()
    return models
