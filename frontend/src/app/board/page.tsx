'use client';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { getScores } from '@/lib/fetch-llms';
import { useQuery } from '@tanstack/react-query';

export default function Board() {
	const {
		data: res,
		isPending,
		isError,
	} = useQuery({
		queryKey: ['scores'],
		queryFn: getScores,
	});

	if (isPending) return <div>Loading...</div>;
	if (isError) return <div>Error loading scores</div>;
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
			{res ? (
				<TableBody>
					{res.map(({ model, score, rank }) => (
						<TableRow key={model}>
							<TableCell className='font-medium'>{rank}</TableCell>
							<TableCell>{model}</TableCell>
							<TableCell>{score}</TableCell>
						</TableRow>
					))}
				</TableBody>
			) : null}
		</Table>
	);
}
