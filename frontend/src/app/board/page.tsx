'use server';
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

export default async function Board() {
	const res = await getScores();

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
			{/* <TableBody>
				{res && res.length !== 0 ? (
					res.map((data: any) => (
						<TableRow key={data.model}>
							<TableCell className='font-medium'>{data.rank}</TableCell>
							<TableCell>{data.model}</TableCell>
							<TableCell>{data.score}</TableCell>
						</TableRow>
					))
				) : (
					<TableRow key={'data.model'}>
						<TableCell className='font-medium'></TableCell>
						<TableCell></TableCell>
						<TableCell></TableCell>
					</TableRow>
				)}
			</TableBody> */}
		</Table>
	);
}
