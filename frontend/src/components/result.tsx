import { LLMModel } from '@/app/page';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

type Props = {
	models: [LLMModel | null, LLMModel | null];
	handleReset: () => void;
};

export default function Result({ models, handleReset }: Props) {
	return (
		<div className='flex flex-col gap-2'>
			<Alert>
				<AlertTitle>Thank you for your feedback!</AlertTitle>
				<AlertDescription>
					Model A: {models[0]?.full_name} <br />
					Model B: {models[1]?.full_name} <br />
				</AlertDescription>
			</Alert>
			<Button variant={'secondary'} onClick={handleReset}>
				Start Over
			</Button>
		</div>
	);
}
