from fastapi import FastAPI

app = FastAPI(
    title="FastAPI Backend",
    description="This is a simple FastAPI backend for the LLM Arena project.",
    version="0.1.0",
)

@app.get("/")
def read_root():
    return {"Hello": "World"} 