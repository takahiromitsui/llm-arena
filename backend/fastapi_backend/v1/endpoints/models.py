from fastapi_backend.services.azure_factory import AzureOpenAIFactory
from fastapi_backend.config.config import settings
from fastapi_backend.utils.logger import logger
from fastapi import APIRouter, HTTPException

router = APIRouter()


@router.get(
    path="",
    responses={
        200: {
            "description": "Get two random models",
            "content": {
                "application/json": {
                    "example": [
                        {
                            "blind_name": "A",
                            "display_name": "gpt-35-turbo",
                            "full_name": "gpt-35-turbo",
                        },
                        {
                            "blind_name": "B",
                            "display_name": "gpt-4o-mini",
                            "full_name": "gpt-4o-mini",
                        },
                    ]
                }
            },
        },
        500: {"description": "Internal Server Error"},
        503: {"description": "Service Unavailable"},
    },
)
def get_models():
    try:
        factory = AzureOpenAIFactory(settings)
        models = factory.pick_two_random_models()
        if not models:
            logger.error("No models found")
            raise HTTPException(status_code=503, detail="No models found")
        logger.info(models)
        return models
    except Exception as e:
        logger.error({str(e)})
        raise HTTPException(status_code=500, detail=str(e))
