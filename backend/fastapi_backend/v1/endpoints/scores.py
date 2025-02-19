from fastapi_backend.utils.logger import logger
from fastapi_backend.config.config import SCORES
from fastapi_backend.schemas.schemas import UpdateScores
from fastapi_backend.services.scores import update_scores_service
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


@router.patch(
    path="",
    responses={
        200: {
            "description": "Update scores",
            "content": {
                "application/json": {
                    "example": {
                        "status": "success",
                        "message": "Scores updated successfully",
                    }
                }
            },
        },
        400: {"description": "Bad Request"},
        500: {"description": "Internal Server Error"},
    },
)
def update_scores(update_scores: UpdateScores):
    try:
        updated = update_scores_service(update_scores)
        logger.info(updated)
        return updated
    except ValueError as e:
        logger.error(str(e))
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(str(e))
        raise HTTPException(status_code=500, detail=str(e))
