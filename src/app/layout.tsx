import './globals.css';
import Sidebar from '../components/Sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BrandMate Dashboard',
  description: 'Sponsorship management for influencers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex">
        <Sidebar />
        <main className="ml-64 flex-1 bg-gray-50 min-h-screen p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
