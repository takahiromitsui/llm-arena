import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

const scores = [
	{
		score: 10,
		model: 'gpt-35-turbo',
	},
	{
		score: 5,
		model: 'gpt4-1106-se',
	},
];

export default function Board() {
	return (
		<Table className='text-slate-100'>
			<TableCaption className='text-slate-100'>
				Chatbot Arena Leaderboard.
			</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className='text-slate-100 w-[100px]'>Rank</TableHead>
					<TableHead className='text-slate-100'>Model</TableHead>
					<TableHead className='text-slate-100'>Point</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{scores.map(score => (
					<TableRow key={score.score}>
						<TableCell className='font-medium'>1</TableCell>
						<TableCell>{score.model}</TableCell>
						<TableCell>{score.score}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
