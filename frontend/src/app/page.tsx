'use client'
import ModelPlaceholder from '@/components/model-placeholder';
import Prompt from '@/components/prompt';
import { fetchModels } from '@/lib/fetch-llms';
export default function Home() {
	const handleOnClick = async () => {
		console.log('submit');
		try {
			const res = await fetchModels();
			console.log(res);
		} catch (error) {
			console.error(error);
		}
	};
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
							<Prompt handleOnClick={handleOnClick} />
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
