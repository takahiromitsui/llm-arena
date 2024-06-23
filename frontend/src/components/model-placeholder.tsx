type Props = {
	modelA: string;
	modelB: string;
};

export default function ModelPlaceholder({ modelA, modelB }: Props) {
	return (
		<div className='flex bg-zinc-900 border border-slate-700 rounded-md py-2 h-[500px] text-slate-100'>
			<div className='w-1/2'>
				<label className='p-2 bg-primary border border-slate-700 rounded-md bg-scroll'>
					Model A
				</label>
				<div className='pt-4 pl-2 overflow-auto  h-[450px]'>{modelA}</div>
			</div>
			<div className='w-1/2 border-l border-slate-700'>
				<label className='p-2 bg-primary border border-slate-700 rounded-md bg-scroll'>
					Model B
				</label>
				<div className='pt-4 pl-2 overflow-auto  h-[450px]'>{modelB}</div>
			</div>
		</div>
	);
}
