import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { fetchModels } from '@/lib/fetch-llms';
import { Dispatch, SetStateAction } from 'react';
import { LLMModel } from '@/app/page';

const PromptSchema = z.object({
	user_input: z.string().min(1, {
		message: 'Prompt cannot be empty',
	}),
});

type Props = {
	// models: [LLMModel | null, LLMModel | null];
	setModels: Dispatch<SetStateAction<[LLMModel | null, LLMModel | null]>>;
	handleStreamsChunk: (chunk: string, modelIdentifier: 'A' | 'B') => void;
	// setStreamsChunk: Dispatch<SetStateAction<[string, string]>>;
};

export default function Prompt({
	setModels,
	handleStreamsChunk,
}:
Props) {
	const promptForm = useForm<z.infer<typeof PromptSchema>>({
		resolver: zodResolver(PromptSchema),
	});
	async function onSubmit(data: z.infer<typeof PromptSchema>) {
		try {
			const res = await fetchModels();
			setModels(res);
			if (!res || res.length !== 2) {
				return;
			}
			res.forEach((model: any) => {
				if (model) {
					const see = new EventSource(
						`http://localhost:8000/stream?full_name=${model.full_name}&prompt=${data.user_input}`,
						{ withCredentials: true }
					);
					see.onmessage = e => {
						handleStreamsChunk(e.data, model.blind_name);
					}
					see.onerror = () => {
						see.close();
					};
					return () => {
						see.close();
					};
				}
			});
		} catch (error) {
			console.error(error);
		}
	}
	return (
		<Form {...promptForm}>
			<form
				onSubmit={promptForm.handleSubmit(onSubmit)}
				className='flex justify-between'
			>
				<FormField
					name='user_input'
					render={({ field }) => (
						<Textarea
							className='w-3/4 h-[100px]'
							placeholder='Enter your prompt'
							{...field}
						/>
					)}
				/>
				<Button
					type='submit'
					variant='destructive'
					className='w-1/5 h-[100px] font-bold'
				>
					Send
				</Button>
			</form>
		</Form>
	);
}
