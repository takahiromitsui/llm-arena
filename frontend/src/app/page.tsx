'use client';
import ModelContainer from '@/components/model-container';
import Prompt from '@/components/prompt';
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
	console.log(streamsChunk);
	return (
		<main>
			<div className='flex justify-center bg-primary h-screen'>
				<div className='w-full mx-20 flex bg-foreground '>
					<div className='mx-20 w-full '>
						<h1 className='text-3xl font-bold py-4 text-slate-100'>
							Chatbot Arena
						</h1>
						{/* ModelContainer */}
						<ModelContainer modelA={streamsChunk[0]} modelB={streamsChunk[1]} />
						{/* Prompt */}
						<div className='pt-8'>
							<Prompt
								setModels={setModels}
								handleStreamsChunk={handleStreamsChunk}
							/>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
