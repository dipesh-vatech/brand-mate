'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient';

type Contract = {
  id?: string;
  brand: string;
  dealId: string;
  notes: string;
  fileName?: string;
  dates: string;
  payment: number;
  created_at?: string;
};

type ContractContextType = {
  contracts: Contract[];
  addContract: (contract: Contract) => Promise<void>;
};

const ContractContext = createContext<ContractContextType | undefined>(undefined);

export function ContractProvider({ children }: { children: ReactNode }) {
  const [contracts, setContracts] = useState<Contract[]>([]);

  const fetchContracts = async () => {
    const { data, error } = await supabase
      .from('contracts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch contracts:', error.message);
    } else if (data) {
      setContracts(data);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  const addContract = async (contract: Contract) => {
    const { error } = await supabase.from('contracts').insert([contract]);

    if (error) {
      console.error('Error saving contract:', error.message);
      return;
    }

    await fetchContracts(); // ⬅️ force refresh the contract list
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
