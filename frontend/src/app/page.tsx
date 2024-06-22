'use client';
import ModelPlaceholder from '@/components/model-placeholder';
import Prompt from '@/components/prompt';
import { useState } from 'react';

export type LLMModel = {
	blind_name: string;
	display_name: string;
	full_name: string;
};

export default function Home() {
	const [models, setModels] = useState<LLMModel[]>([]);
	// const handleOnClick = async () => {
	// 	try {
	// 		const res = await fetchModels();
	// 		setModels(res);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };
	console.log(models);
	return (
		<main>
			<div className='flex justify-center bg-primary h-screen'>
				<div className='w-full mx-20 flex bg-foreground '>
					<div className='mx-20 w-full '>
						<h1 className='text-3xl font-bold py-4 text-slate-100'>
							Chatbot Arena
						</h1>
						{/* ModelPlaceholder */}
						<ModelPlaceholder modelA='Model A' modelB='Model B' />
						{/* Prompt */}
						<div className='pt-8'>
							<Prompt setModels={setModels}/>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
