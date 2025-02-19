from fastapi_backend.config.config import SCORES
from fastapi_backend.models import UpdateScores


def update_scores_service(update_scores: UpdateScores):
    res = {}
    for model in update_scores.llm_models:
        if model is None:
            raise ValueError("Invalid model data")
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
    else:
        raise ValueError("Invalid feedback value")

    return {
        "status": "success",
        "message": "Scores updated successfully",
    }
