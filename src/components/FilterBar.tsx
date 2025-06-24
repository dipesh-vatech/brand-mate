const filters = ['All', 'Upcoming', 'In Progress', 'Awaiting Payment', 'Overdue', 'Completed'];

export default function FilterBar() {
  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => (
        <button
          key={filter}
          className="px-4 py-1 rounded-full border text-sm text-gray-600 hover:bg-gray-100 transition"
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
