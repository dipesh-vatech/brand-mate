import DealTable from '../../components/DealTable';
import FilterBar from '../../components/FilterBar';
import Link from 'next/link';

export default function DealsPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">📊 Deal Tracker</h1>
        <Link
          href="/deals/add"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transition"
        >
          + New Deal
        </Link>
      </div>

      {/* Filters */}
      <FilterBar />

      {/* Table */}
      <DealTable />
    </div>
  );
}
