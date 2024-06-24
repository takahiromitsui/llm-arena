import ModelPlaceholder from '@/components/model-placeholder';

type Props = {
	modelA: string;
	modelB: string;
};

export default function ModelContainer({ modelA, modelB }: Props) {
	return (
		<div className='flex bg-zinc-900 border border-slate-700 rounded-md py-2 h-[500px] text-slate-100'>
			<ModelPlaceholder label='Model A' content={modelA} />
			<div className='border-l border-slate-700'></div>
			<ModelPlaceholder label='Model B' content={modelB} />
		</div>
	);
}
