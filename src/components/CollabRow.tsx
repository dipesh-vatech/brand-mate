'use client';

type CollabRowProps = {
  brandLogo: string;
  brandName: string;
  campaign: string;
  status: 'Active' | 'Completed' | 'Pending';
  payment: string | number;
};

const statusColors = {
  Active: 'bg-green-100 text-green-800',
  Completed: 'bg-gray-100 text-gray-800',
  Pending: 'bg-yellow-100 text-yellow-800',
};

const formatCurrency = (amount: string | number) => {
  const num = typeof amount === 'number' ? amount : parseFloat(amount.replace(/[^0-9.-]+/g, ''));
  return isNaN(num) ? 'N/A' : `$${num.toLocaleString()}`;
};

export default function CollabRow({
  brandLogo,
  brandName,
  campaign,
  status,
  payment,
}: CollabRowProps) {
  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="flex items-center gap-3 py-3 px-4">
        <img src={brandLogo} alt={brandName} className="w-8 h-8 object-contain" />
        <span className="font-medium text-gray-800">{brandName}</span>
      </td>
      <td className="px-4">{campaign}</td>
      <td className="px-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
          {status}
        </span>
      </td>
      <td className="px-4 font-semibold text-gray-700">{formatCurrency(payment)}</td>
      <td className="px-4 text-blue-600 hover:underline cursor-pointer">View</td>
    </tr>
  );
}
