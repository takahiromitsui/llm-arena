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
	setModels: Dispatch<SetStateAction<LLMModel[]>>;
	handleStreamChunk: (chunk: string) => void;
};

export default function Prompt({ setModels, handleStreamChunk }: Props) {
	const promptForm = useForm<z.infer<typeof PromptSchema>>({
		resolver: zodResolver(PromptSchema),
	});

	function getRealtimeData(sse: EventSource) {
		sse.onmessage = e => {
			handleStreamChunk(e.data);
		};
		sse.onerror = () => {
			sse.close();
		};
		return () => {
			sse.close();
		};
	}

	async function onSubmit(data: z.infer<typeof PromptSchema>) {
		try {
			const res = await fetchModels();
			const sse = new EventSource(
				`http://localhost:8000/stream?full_name=${res[0].full_name}&prompt=${data.user_input}`,
				{ withCredentials: true }
			);
			getRealtimeData(sse);
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
