import random
from openai import AsyncAzureOpenAI
from fastapi.responses import StreamingResponse

# local
from fastapi_backend.config import Settings
from fastapi_backend.models import LLMModel


class AzureOpenAIFactory:
    def __init__(self, settings: Settings):
        self.settings = settings
        self.models = {
            "gpt3": "gpt-35-turbo",
            "gpt4": "gpt4-turbo-2024-04-09",
            "gpt4-se": "gpt4-1106-se",
        }
        # this variable could be used for actual database storage
        self.scores = {
            self.models["gpt3"]: 0,
            self.models["gpt4"]: 0,
            self.models["gpt4-se"]: 0,
        }

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
            model = LLMModel(blind_names[i], key, self.models[key])
            models.append(model)
        return models

    # this method could be used for actual database storage
    def get_scores(self):
        return self.scores

    async def stream_professor(self, response):
        async for chunk in response:
            if len(chunk.choices) > 0:
                delta = chunk.choices[0].delta
                if delta.content:
                    yield delta.content

    async def stream_response(self, model_full_name: str, prompt: str):
        client = self.create()
        response = await client.chat.completions.create(
            model=f"{self.settings.AZURE_MODEL_PREFIX}-{model_full_name}",
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
            stream=True,
        )
        return StreamingResponse(
            self.stream_professor(response), media_type="text/plain"
        )
