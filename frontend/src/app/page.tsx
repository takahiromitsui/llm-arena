'use client';
import Feedback from '@/components/feedback';
import ModelContainer from '@/components/model-container';
import Prompt from '@/components/prompt';
import Result from '@/components/result';

import { useState } from 'react';

export type LLMModel = {
	blind_name: string;
	display_name: string;
	full_name: string;
};

export default function Home() {
	const [models, setModels] = useState<[LLMModel | null, LLMModel | null]>([
		null,
		null,
	]);
	const [streamsChunk, setStreamsChunk] = useState<[string, string]>(['', '']);
	const [feedback, setFeedback] = useState<'A' | 'B' | 'tie' | 'bad' | null>(
		null
	);

	const handleStreamsChunk = (chunk: string, modelIdentifier: 'A' | 'B') => {
		setStreamsChunk(prev => {
			const [modelA, modelB] = prev;
			if (modelIdentifier === 'A') {
				return [modelA + chunk, modelB];
			} else {
				return [modelA, modelB + chunk];
			}
		});
	};
	const handleReset = () => {
		setModels([null, null]);
		setStreamsChunk(['', '']);
		setFeedback(null);
	};
	return (
		<>
			<ModelContainer modelA={streamsChunk[0]} modelB={streamsChunk[1]} />
			{/* Prompt */}
			<div className='pt-8'>
				{feedback ? (
					<Result models={models} handleReset={handleReset} />
				) : streamsChunk[0] && streamsChunk[1] ? (
					<Feedback models={models} setFeedback={setFeedback} />
				) : (
					<Prompt
						setModels={setModels}
						handleStreamsChunk={handleStreamsChunk}
					/>
				)}
			</div>
		</>
	);
}
