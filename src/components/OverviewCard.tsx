import { ReactNode } from 'react';

interface OverviewCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
}

export default function OverviewCard({
  title,
  value,
  icon,
  gradientFrom = 'from-indigo-500',
  gradientTo = 'to-purple-500',
}: OverviewCardProps) {
  return (
    <div className={`w-full sm:w-1/2 lg:w-1/4 p-4`}>
      <div
        className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white rounded-xl shadow-md p-6 flex items-center gap-4 transform hover:scale-105 transition-transform duration-200`}
      >
        <div className="text-4xl">{icon}</div>
        <div>
          <p className="text-sm uppercase font-medium tracking-widest">{title}</p>
          <h2 className="text-2xl font-bold">{value}</h2>
        </div>
      </div>
    </div>
  );
}
