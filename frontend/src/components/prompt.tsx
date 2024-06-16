import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

type Props = {
	handleOnClick: () => void;
};

export default function Prompt({ handleOnClick }: Props) {
	return (
		<div className='flex justify-between'>
			<Textarea className='w-3/4 h-[100px]' placeholder='Enter your prompt' />
			<Button
				type='submit'
				variant='destructive'
				className='w-1/5 h-[100px] font-bold'
				onClick={handleOnClick}
			>
				Send
			</Button>
		</div>
	);
}
