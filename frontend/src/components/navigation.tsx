import Link from 'next/link';

export default function Navigation() {
	return (
		<header className='flex h-20 w-full items-center justify-between py-0'>
			<div className='text-3xl font-bold text-white'>Chatbot Arena</div>
			<nav>
				<ul className='m-0 flex list-none items-baseline p-0'>
					<li className='ml-12 text-2xl text-white'>
						<Link href='/'>Arena</Link>
					</li>
					<li className='ml-12 text-2xl text-white'>
						<Link href='/board'>Leader Board</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
