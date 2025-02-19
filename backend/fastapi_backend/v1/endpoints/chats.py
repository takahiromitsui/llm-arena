from fastapi import APIRouter, HTTPException, Query
from fastapi_backend.config.config import settings
from fastapi_backend.services.azure_factory import AzureOpenAIFactory
from fastapi_backend.utils.logger import logger

router = APIRouter()


@router.get(
    path="",
    responses={
        200: {
            "description": "Get chat response",
            "content": {
                "application/json": {"example": {"data": "Chat response example"}}
            },
        },
        400: {"description": "Bad Request"},
        500: {"description": "Internal Server Error"},
    },
)
async def getChats(full_name: str = Query(...), prompt: str = Query(...)):
    try:
        if not full_name or not prompt:
            logger.error("full_name and prompt are required")
            raise HTTPException(
                status_code=400, detail="full_name and prompt are required"
            )

        factory = AzureOpenAIFactory(settings)
        data = await factory.stream_response(
            model_full_name=full_name,
            prompt=prompt,
        )
        logger.info(data)
        return data
    except ValueError as e:
        logger.error(str(e))
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error({str(e)})
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )
