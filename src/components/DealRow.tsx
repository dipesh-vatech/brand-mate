'use client';

import { useDeals } from '../context/DealContext';

type Deal = {
  id?: string;
  brand: string;
  platform: string;
  deliverables: string;
  startDate: string;
  endDate: string;
  payment: number;
  status: string;
};

const statusColors = {
  Upcoming: 'bg-blue-100 text-blue-800 border-blue-300',
  'Awaiting Payment': 'bg-indigo-100 text-indigo-800 border-indigo-300',
  Completed: 'bg-green-100 text-green-800 border-green-300',
  'In Progress': 'bg-yellow-100 text-yellow-800 border-yellow-300',
  Pending: 'bg-gray-100 text-gray-600 border-gray-300',
  Overdue: 'bg-red-100 text-red-800 border-red-300',
};

const formatCurrency = (amount: number) =>
  amount ? `$${amount.toLocaleString()}` : 'N/A';

export default function DealRow({ deal }: { deal: Deal }) {
  const { updateDealStatus } = useDeals();

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    await updateDealStatus(deal.id!, e.target.value);
  };

  const statusOptions = [
    'Upcoming',
    'Awaiting Payment',
    'Completed',
    'In Progress',
    'Pending',
    'Overdue',
  ];

  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-4 py-3 font-medium text-gray-900">{deal.brand}</td>
      <td className="px-4">{deal.platform} Campaign</td>
      <td className="px-4">
        <select
          value={deal.status}
          onChange={handleStatusChange}
          className={`text-xs font-medium px-3 py-1 rounded-full border bg-white transition
            ${statusColors[deal.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-700'}
          `}
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </td>
      <td className="px-4">{deal.deliverables}</td>
      <td className="px-4">{deal.endDate || '—'}</td>
      <td className="px-4 font-semibold">{formatCurrency(deal.payment)}</td>
    </tr>
  );
}
