'use client';
import { MoveLeft, MoveRight, Handshake, ThumbsDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction } from 'react';
import { LLMModel } from '@/app/page';
import { patchScores } from '@/lib/fetch-llms';

type Props = {
	models: [LLMModel | null, LLMModel | null];
	setFeedback: Dispatch<SetStateAction<'A' | 'B' | 'tie' | 'bad' | null>>;
};

export default function Feedback({ models, setFeedback }: Props) {
	async function sendFeedback(
		feedback: 'A' | 'B' | 'tie' | 'bad' | null,
		models: [LLMModel | null, LLMModel | null]
	) {
		setFeedback(feedback);
		await patchScores(models, feedback);
	}
	return (
		<div className='flex justify-between'>
			<Button
				variant={'secondary'}
				onClick={async () => await sendFeedback('A', models)}
			>
				<MoveLeft className='mr-2 h-4 w-4' /> A is better
			</Button>
			<Button
				variant={'secondary'}
				onClick={async () => await sendFeedback('B', models)}
			>
				<MoveRight className='mr-2 h-4 w-4' /> B is better
			</Button>
			<Button
				variant={'secondary'}
				onClick={async () => await sendFeedback('tie', models)}
			>
				<Handshake className='mr-2 h-4 w-4' /> Tie
			</Button>
			<Button
				variant={'secondary'}
				onClick={async () => await sendFeedback('bad', models)}
			>
				<ThumbsDown className='mr-2 h-4 w-4' /> Both are bad
			</Button>
		</div>
	);
}
