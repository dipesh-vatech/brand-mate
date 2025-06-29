'use client';

import { useDeals } from '../context/DealContext';
import DealRow from './DealRow';

type DealTableProps = {
  statusFilter: string;
};

export default function DealTable({ statusFilter }: DealTableProps) {
  const { deals, deleteDeal } = useDeals(); // ✅ now includes deleteDeal

  const filteredDeals =
    statusFilter === 'All'
      ? deals
      : deals.filter((deal) => deal.status === statusFilter);

  return (
    <div className="overflow-auto bg-white rounded-xl shadow-sm">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-xs uppercase text-gray-500">
          <tr>
            <th className="px-4 py-3">Brand</th>
            <th className="px-4">Campaign</th>
            <th className="px-4">Status</th>
            <th className="px-4">Deliverables</th>
            <th className="px-4">Due Date</th>
            <th className="px-4">Payment</th>
            <th className="px-4">{/* Delete icon column */}</th>
          </tr>
        </thead>
        <tbody>
          {filteredDeals.length > 0 ? (
            filteredDeals.map((deal, idx) => (
              <DealRow key={idx} deal={deal} onDelete={() => deleteDeal(deal.id!)} />
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center text-gray-400 py-6">
                No deals match this filter.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
