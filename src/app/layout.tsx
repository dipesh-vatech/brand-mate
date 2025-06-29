import Providers from './providers';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BrandMate Dashboard',
  description: 'Sponsorship management for influencers',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
