import { MoveLeft, MoveRight, Handshake, ThumbsDown } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function Feedback() {
	return (
		<div className='flex justify-between'>
			<Button variant={'secondary'}>
				<MoveLeft className='mr-2 h-4 w-4' /> A is better
			</Button>
			<Button variant={'secondary'}>
				<MoveRight className='mr-2 h-4 w-4' /> B is better
			</Button>
			<Button variant={'secondary'}>
				<Handshake className='mr-2 h-4 w-4' /> Tie
			</Button>
			<Button variant={'secondary'}>
				<ThumbsDown className='mr-2 h-4 w-4' /> Both are bad
			</Button>
		</div>
	);
}
