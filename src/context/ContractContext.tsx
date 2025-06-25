'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Contract = {
  brand: string;
  dealId: string;
  notes: string;
  fileName?: string;
  dates: string;
  payment: string;
};

type ContractContextType = {
  contracts: Contract[];
  addContract: (contract: Contract) => void;
};

const ContractContext = createContext<ContractContextType | undefined>(undefined);

export function ContractProvider({ children }: { children: ReactNode }) {
  const [contracts, setContracts] = useState<Contract[]>([]);

  const addContract = (contract: Contract) => {
    setContracts((prev) => [contract, ...prev]);
  };

  return (
    <ContractContext.Provider value={{ contracts, addContract }}>
      {children}
    </ContractContext.Provider>
  );
}

export const useContracts = () => {
  const context = useContext(ContractContext);
  if (!context) throw new Error('useContracts must be used within ContractProvider');
  return context;
};
