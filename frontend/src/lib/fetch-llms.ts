import { LLMModel } from '@/app/page';

const BASE_URL = 'http://127.0.0.1:8000';

export async function fetchModels() {
	const url = `${BASE_URL}/models`;
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.json();
}

export async function patchScores(
	llm_models: [LLMModel | null, LLMModel | null],
	feedback: 'A' | 'B' | 'tie' | 'bad' | null
) {
	const url = `${BASE_URL}/scores`;
	const response = await fetch(url, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			llm_models: llm_models,
			feedback: feedback,
		}),
	});
	return response.json();
}

export async function getScores(): Promise<
	{ model: string; score: number; rank: number }[]
> {
	try {
		const url = `${BASE_URL}/scores`;
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const scores = await response.json();
		// Convert the scores object to an array of entries and sort by score
		const sortedScores = Object.entries(scores)
			.sort(([, a], [, b]) => (b as number) - (a as number))
			.map(([model, score], index) => ({
				model,
				score: score as number,
				rank: index + 1,
			}));

		return sortedScores;
	} catch (error) {
		console.log(error);
		return [];
	}
}
