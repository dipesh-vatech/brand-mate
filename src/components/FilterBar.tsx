'use client';

const filters = ['All', 'Upcoming', 'In Progress', 'Awaiting Payment', 'Overdue', 'Completed'];

type Props = {
  statusFilter: string;
  setStatusFilter: (value: string) => void;
};

export default function FilterBar({ statusFilter, setStatusFilter }: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => {
        const isActive = filter === statusFilter;
        return (
          <button
            key={filter}
            onClick={() => setStatusFilter(filter)}
            className={`px-4 py-1 rounded-full border text-sm transition ${
              isActive
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}
