import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function Prompt() {
	return (
		<div className='flex justify-between'>
			<Textarea className='w-3/4 h-[100px]' placeholder='Enter your prompt' />
			<Button
				type='submit'
				variant='destructive'
				className='w-1/5 h-[100px] font-bold'
			>
				Send
			</Button>
		</div>
	);
}
