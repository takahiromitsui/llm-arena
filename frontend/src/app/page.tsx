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
	const [models, setModels] = useState<LLMModel[]>([]);
	const [streamChunk, setStreamChunk] = useState<string>('');
	const handleStreamChunk = (chunk: string) => {
		setStreamChunk(prev => prev + chunk);
	};
	return (
		<main>
			<div className='flex justify-center bg-primary h-screen'>
				<div className='w-full mx-20 flex bg-foreground '>
					<div className='mx-20 w-full '>
						<h1 className='text-3xl font-bold py-4 text-slate-100'>
							Chatbot Arena
						</h1>
						{/* ModelContainer */}
						<ModelContainer modelA={streamChunk} modelB={streamChunk} />
						{/* Prompt */}
						<div className='pt-8'>
							<Prompt setModels={setModels} handleStreamChunk={handleStreamChunk} />
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
