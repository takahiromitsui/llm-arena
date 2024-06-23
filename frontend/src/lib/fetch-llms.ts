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

export async function putScores(
	llm_models: [LLMModel | null, LLMModel | null],
	feedback: 'A' | 'B' | 'tie' | 'bad' | null
) {
	const url = `${BASE_URL}/scores`;
	const response = await fetch(url, {
		method: 'PUT',
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

export async function getScores() {
	try {
		const url = `${BASE_URL}/scores`;
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return response.json();
	} catch (error) {
		console.log(error);
	}
}
