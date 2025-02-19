from fastapi_backend.utils.logger import logger
from fastapi_backend.config.config import SCORES
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
                            "gpt-35-turbo": 0,
                            "gpt-4": 0,
                            "gpt-4-32k": 0,
                            "gpt-4o-mini": 0,
                        }
                    ]
                }
            },
        },
        500: {"description": "Internal Server Error"},
        503: {"description": "Service Unavailable"},
    },
)
def get_scores():
    try:
        if not SCORES:
            logger.error("Scores data is not available")
            raise HTTPException(status_code=503, detail="Scores data is not available")
        logger.info(SCORES)
        return SCORES
    except Exception as e:
        logger.error({str(e)})
        raise HTTPException(status_code=500, detail=str(e))
