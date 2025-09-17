import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GHO Guardian - Navigate Aave GHO with confidence',
  description: 'Borrow smarter, stay safe, and earn more with AI-powered DeFi assistance for Aave users.',
  keywords: ['DeFi', 'Aave', 'GHO', 'Avalanche', 'Lending', 'Borrowing'],
  authors: [{ name: 'GHO Guardian Team' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1a1a2e',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
