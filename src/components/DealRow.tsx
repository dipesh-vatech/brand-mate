interface DealRowProps {
  brand: string;
  campaign: string;
  status: string;
  deliverables: string;
  dueDate: string;
  payment: string;
}

const statusStyles: Record<string, string> = {
  'In Progress': 'bg-blue-100 text-blue-700',
  Upcoming: 'bg-yellow-100 text-yellow-700',
  Completed: 'bg-green-100 text-green-700',
  'Awaiting Payment': 'bg-orange-100 text-orange-700',
  Overdue: 'bg-red-100 text-red-700',
};

export default function DealRow({
  brand,
  campaign,
  status,
  deliverables,
  dueDate,
  payment,
}: DealRowProps) {
  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-4 py-3 font-medium text-gray-800">{brand}</td>
      <td className="px-4">{campaign}</td>
      <td className="px-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}>
          {status}
        </span>
      </td>
      <td className="px-4">{deliverables}</td>
      <td className="px-4">{dueDate}</td>
      <td className="px-4 font-semibold">{payment}</td>
    </tr>
  );
}
