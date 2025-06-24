import DealRow from './DealRow';

export default function DealTable() {
  const deals = [
    {
      brand: 'BrandFresh',
      campaign: 'Summer Launch',
      status: 'In Progress',
      deliverables: '2 posts, 3 stories',
      dueDate: 'Aug 15, 2024',
      payment: '$1,500',
    },
    {
      brand: 'TechGizmo',
      campaign: 'Gadget Showcase',
      status: 'Upcoming',
      deliverables: '1 video review',
      dueDate: 'Sep 1, 2024',
      payment: '$2,500',
    },
    {
      brand: 'EcoWear',
      campaign: 'Green Collection',
      status: 'Completed',
      deliverables: '1 post, 1 story',
      dueDate: 'July 20, 2024',
      payment: '$800',
    },
    {
      brand: 'FitFuel',
      campaign: 'Protein Power',
      status: 'Awaiting Payment',
      deliverables: '3 posts',
      dueDate: 'July 10, 2024',
      payment: '$1,200',
    },
    {
      brand: 'GourmetBox',
      campaign: 'Recipe Challenge',
      status: 'Overdue',
      deliverables: '1 reel',
      dueDate: 'July 1, 2024',
      payment: '$950',
    },
  ];

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
          </tr>
        </thead>
        <tbody>
          {deals.map((deal) => (
            <DealRow key={deal.campaign} {...deal} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
