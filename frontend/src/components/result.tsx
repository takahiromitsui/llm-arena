import { LLMModel } from '@/app/page';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type Props = {
	models: [LLMModel | null, LLMModel | null];
};

export default function Result({ models }: Props) {
	return (
		<Alert>
			<AlertTitle>Thank you for your feedback!</AlertTitle>
			<AlertDescription>
				Model A: {models[0]?.full_name} <br />
				Model B: {models[1]?.full_name} <br />
			</AlertDescription>
		</Alert>
	);
}
