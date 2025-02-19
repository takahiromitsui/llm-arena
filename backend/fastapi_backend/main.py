from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# local
from fastapi_backend.config.config import SCORES, settings
from fastapi_backend.azure_factory import AzureOpenAIFactory
from fastapi_backend.models import UpdateScores
from fastapi_backend.v1.router import api_v1_router

app = FastAPI(
    title="FastAPI Backend",
    description="This is a simple FastAPI backend for the LLM Arena project.",
    version="0.1.0",
)
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/models")
def get_models():
    factory = AzureOpenAIFactory(settings)
    models = factory.pick_two_random_models()
    return models


@app.get("/stream")
async def stream(full_name: str = Query(...), prompt: str = Query(...)):
    try:
        factory = AzureOpenAIFactory(settings)
        data = await factory.stream_response(
            model_full_name=full_name,
            prompt=prompt,
        )
        return data
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@app.patch("/scores")
def update_scores(update_scores: UpdateScores):
    res = {}
    for model in update_scores.llm_models:
        res[model.blind_name] = model.full_name

    if update_scores.feedback == "A":
        SCORES[res.get("A", "")] = SCORES.get(res.get("A", ""), 0) + 1
    elif update_scores.feedback == "B":
        SCORES[res.get("B", "")] = SCORES.get(res.get("B", ""), 0) + 1
    elif update_scores.feedback == "tie":
        pass
    elif update_scores.feedback == "bad":
        SCORES[res.get("A", "")] = SCORES.get(res.get("A", ""), 0) - 1
        SCORES[res.get("B", "")] = SCORES.get(res.get("B", ""), 0) - 1
    return {
        "status": "success",
        "message": "Scores updated successfully",
    }


@app.get("/scores")
def get_scores():
    return SCORES

app.include_router(api_v1_router)