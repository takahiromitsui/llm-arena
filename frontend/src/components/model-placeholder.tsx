type Props = {
	label: string;
	content: string;
};

export default function ModelPlaceholder({ label, content }: Props) {
	return (
		<div className='w-1/2'>
			<label className='p-2 bg-primary border border-slate-700 rounded-md bg-scroll'>
				{label}
			</label>
			<div className='pt-4 pl-2 overflow-auto  h-[450px]'>{content}</div>
		</div>
	);
}
