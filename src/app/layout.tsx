import './globals.css';
import Sidebar from '../components/Sidebar';
import type { Metadata } from 'next';
import { PostProvider } from '../context/PostContext';
import { ContractProvider } from '../context/ContractContext';
import { DealProvider } from '../context/DealContext';

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
        <PostProvider>
          <ContractProvider>
            <DealProvider>
              <Sidebar />
              <main className="ml-64 flex-1 bg-gray-50 min-h-screen p-6">
                {children}
              </main>
            </DealProvider>
          </ContractProvider>
        </PostProvider>
      </body>
    </html>
  );
}
