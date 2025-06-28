'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient';

type Deal = {
  id?: string;
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
  addDeal: (deal: Deal) => Promise<void>;
  updateDealStatus: (id: string, status: string) => Promise<void>;
};

const DealContext = createContext<DealContextType | undefined>(undefined);

export function DealProvider({ children }: { children: ReactNode }) {
  const [deals, setDeals] = useState<Deal[]>([]);

  // Fetch deals from Supabase on load
  useEffect(() => {
    const fetchDeals = async () => {
      const { data, error } = await supabase
        .from('deals')
        .select('id, brand, platform, deliverables, startDate, endDate, payment, status')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Failed to fetch deals:', error.message);
      } else if (data) {
        setDeals(data);
      }
    };

    fetchDeals();
  }, []);

  // Add new deal
  const addDeal = async (deal: Deal) => {
    const { data, error } = await supabase.from('deals').insert([deal]);

    if (error) {
      console.error('Failed to insert deal:', error.message);
      return;
    }

    if (data) {
      setDeals((prev) => [data[0], ...prev]);
    }
  };

  // ✅ New: Update deal status
  const updateDealStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('deals')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Error updating status:', error.message);
    } else {
      // Refresh deals after update
      const { data, error: fetchError } = await supabase
        .from('deals')
        .select('id, brand, platform, deliverables, startDate, endDate, payment, status')
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('Failed to refresh deals:', fetchError.message);
      } else if (data) {
        setDeals(data);
      }
    }
  };

  return (
    <DealContext.Provider value={{ deals, addDeal, updateDealStatus }}>
      {children}
    </DealContext.Provider>
  );
}

export const useDeals = () => {
  const context = useContext(DealContext);
  if (!context) throw new Error('useDeals must be used within DealProvider');
  return context;
};
