from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# local
from fastapi_backend.config.config import settings
from fastapi_backend.v1.router import api_v1_router

app = FastAPI(
    title="Chatbot Arena API",
    description="This is a simple FastAPI backend for the Chatbot Arena project.",
    version="0.1.0",
)
origins = [settings.WHITE_LIST]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_v1_router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=settings.PORT)
