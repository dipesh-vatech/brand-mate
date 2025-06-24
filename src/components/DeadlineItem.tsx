interface DeadlineItemProps {
  brandLogo: string;
  deliverable: string;
  dueDate: string;
}

export default function DeadlineItem({
  brandLogo,
  deliverable,
  dueDate,
}: DeadlineItemProps) {
  return (
    <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-4 mb-3 border hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <img src={brandLogo} alt="Brand" className="w-10 h-10 object-contain" />
        <div>
          <p className="font-semibold text-gray-800">{deliverable}</p>
          <p className="text-sm text-gray-500">Due: {dueDate}</p>
        </div>
      </div>
      <span className="text-sm font-medium bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
        Upcoming
      </span>
    </div>
  );
}
