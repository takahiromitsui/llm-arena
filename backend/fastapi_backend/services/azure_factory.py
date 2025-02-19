import random
from openai import AsyncAzureOpenAI
from fastapi.responses import StreamingResponse

# local
from fastapi_backend.config.config import SCORES, Settings
from fastapi_backend.schemas.schemas import LLMModel


class AzureOpenAIFactory:
    def __init__(self, settings: Settings):
        self.settings = settings
        self.models = SCORES

    def create(self):
        return AsyncAzureOpenAI(
            azure_endpoint=self.settings.AZURE_OPENAI_API_BASE_URL,
            api_key=self.settings.AZURE_OPENAI_API_KEY,
            api_version=self.settings.AZURE_OPENAI_API_VERSION,
        )

    def pick_two_random_models(self) -> list[LLMModel]:
        keys = random.sample(list(self.models.keys()), 2)
        blind_names = ["A", "B"]
        models = []
        for i, key in enumerate(keys):
            model = LLMModel(blind_names[i], key, key)
            models.append(model)
        return models

    async def stream_professor(self, response):
        async for chunk in response:
            if len(chunk.choices) > 0:
                delta = chunk.choices[0].delta
                if delta.content:
                    yield "data: " + delta.content + "\n\n"

    async def stream_response(self, model_full_name: str, prompt: str):
        client = self.create()
        availableModels = SCORES.keys()
        if model_full_name not in availableModels:
            raise ValueError("Invalid model")

        response = await client.chat.completions.create(
            model=model_full_name,
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
            temperature=0.0,
            stream=True,
        )
        return StreamingResponse(
            self.stream_professor(response), media_type="text/event-stream"
        )
