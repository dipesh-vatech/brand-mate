'use client';

import { PostProvider } from '../context/PostContext';
import { ContractProvider } from '../context/ContractContext';
import { DealProvider } from '../context/DealContext';
import Sidebar from '../components/Sidebar';
import { Toaster } from 'react-hot-toast';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PostProvider>
      <ContractProvider>
        <DealProvider>
          <Sidebar />
          <main className="ml-64 flex-1 bg-gray-50 min-h-screen p-6">
            {children}
          </main>
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        </DealProvider>
      </ContractProvider>
    </PostProvider>
  );
}
