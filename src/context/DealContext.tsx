'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Deal = {
  brand: string;
  platform: string;
  deliverables: string;
  startDate: string;
  endDate: string;
  payment: string;
  status: string;
};

type DealContextType = {
  deals: Deal[];
  addDeal: (deal: Deal) => void;
};

const DealContext = createContext<DealContextType | undefined>(undefined);

export function DealProvider({ children }: { children: ReactNode }) {
  const [deals, setDeals] = useState<Deal[]>([]);

  const addDeal = (deal: Deal) => {
    setDeals((prev) => [deal, ...prev]);
  };

  return (
    <DealContext.Provider value={{ deals, addDeal }}>
      {children}
    </DealContext.Provider>
  );
}

export const useDeals = () => {
  const context = useContext(DealContext);
  if (!context) throw new Error('useDeals must be used within DealProvider');
  return context;
};
