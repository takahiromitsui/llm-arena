from fastapi_backend.v1.endpoints import scores
from fastapi_backend.v1.endpoints import models
from fastapi import APIRouter

api_v1_router = APIRouter(
    prefix="/api/v1",
    tags=["v1"],
    responses={404: {"description": "Not found"}},
)

api_v1_router.include_router(
    router=models.router,
    prefix="/models",
)

api_v1_router.include_router(
    router=scores.router,
    prefix="/scores",
)