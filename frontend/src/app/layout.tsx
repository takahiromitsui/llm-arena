import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/navigation';
import Providers from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Chatbot Arena',
	description:
		'Chatbot Arena is a platform for building and sharing chat bots.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<main>
					<Providers>
						<div className='flex justify-center bg-primary h-screen'>
							<div className='w-full mx-20 flex bg-foreground '>
								<div className='mx-20 w-full '>
									<Navigation />
									{children}
								</div>
							</div>
						</div>
					</Providers>
				</main>
			</body>
		</html>
	);
}
