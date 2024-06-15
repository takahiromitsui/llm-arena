import ModelPlaceholder from '@/components/model-placeholder';
import Prompt from '@/components/prompt';
export default function Home() {
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
							<Prompt />
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
