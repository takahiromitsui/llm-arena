const BASE_URL = 'http://localhost:8000';

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
