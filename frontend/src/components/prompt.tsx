import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const PromptSchema = z.object({
	user_input: z.string().min(1, {
		message: 'Prompt cannot be empty',
	}),
});

export default function Prompt() {
	const promptForm = useForm<z.infer<typeof PromptSchema>>({
		resolver: zodResolver(PromptSchema),
	});

	function onSubmit(data: z.infer<typeof PromptSchema>) {
		console.log(data);
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
					// onClick={handleOnClick}
				>
					Send
				</Button>
			</form>
		</Form>
	);
}
