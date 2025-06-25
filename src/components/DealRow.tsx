'use client';

type Deal = {
  brand: string;
  platform: string;
  deliverables: string;
  startDate: string;
  endDate: string;
  payment: string;
  status: string;
};

export default function DealRow({ deal }: { deal: Deal }) {
  const statusColor =
    deal.status === 'Completed'
      ? 'bg-green-100 text-green-800'
      : deal.status === 'In Progress'
      ? 'bg-yellow-100 text-yellow-800'
      : deal.status === 'Pending'
      ? 'bg-gray-100 text-gray-600'
      : 'bg-red-100 text-red-800';

  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-4 py-3 font-medium text-gray-900">{deal.brand}</td>
      <td className="px-4">{deal.platform} Campaign</td>
      <td className="px-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
          {deal.status}
        </span>
      </td>
      <td className="px-4">{deal.deliverables}</td>
      <td className="px-4">{deal.endDate || '—'}</td>
      <td className="px-4 font-semibold">{deal.payment}</td>
    </tr>
  );
}
