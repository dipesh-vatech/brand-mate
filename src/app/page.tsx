'use client';

import { useDeals } from '../context/DealContext';
import { FaHandshake, FaClock, FaDollarSign, FaChartLine } from 'react-icons/fa';
import OverviewCard from '../components/OverviewCard';
import DeadlineItem from '../components/DeadlineItem';
import CollabRow from '../components/CollabRow';

export default function DashboardPage() {
  const { deals } = useDeals();

  const activeDeals = deals.filter((d) => d.status === 'In Progress');
  const completedDeals = deals.filter((d) => d.status === 'Completed');

  const upcomingDeadlines = deals.filter((d) => {
    const end = new Date(d.endDate);
    return end > new Date() && d.status !== 'Completed';
  });

//   const totalEarnings = completedDeals.reduce((sum, d) => sum + d.payment, 0);

  const totalEarnings = completedDeals.reduce((sum, d) => {
    const amount = typeof d.payment === 'number' ? d.payment : parseFloat(d.payment.replace(/[$,]/g, ''));
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  const recentDeals = [...deals]
    .sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime())
    .slice(0, 3);

  return (
    <>
      {/* Overview Cards */}
      <div className="flex flex-wrap -mx-4">
        <OverviewCard
          title="Active Collaborations"
          value={activeDeals.length}
          icon={<FaHandshake />}
          gradientFrom="from-green-400"
          gradientTo="to-emerald-500"
        />
        <OverviewCard
          title="Upcoming Deadlines"
          value={upcomingDeadlines.length}
          icon={<FaClock />}
          gradientFrom="from-yellow-400"
          gradientTo="to-orange-500"
        />
        <OverviewCard
          title="Total Earnings"
          value={`$${totalEarnings.toLocaleString()}`}
          icon={<FaDollarSign />}
          gradientFrom="from-sky-500"
          gradientTo="to-indigo-500"
        />
        <OverviewCard
          title="Engagement Rate"
          value={`${(activeDeals.length * 0.018 + 7.2).toFixed(1)}%`}
          icon={<FaChartLine />}
          gradientFrom="from-pink-500"
          gradientTo="to-rose-500"
        />
      </div>

      {/* Deadlines */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📅 Upcoming Deadlines</h2>
        {upcomingDeadlines.slice(0, 3).map((d, idx) => (
          <DeadlineItem
            key={idx}
            brandLogo={`/brand-logos/${d.brand.toLowerCase()}.png`}
            deliverable={`${d.platform} Post for ${d.brand}`}
            dueDate={d.endDate}
          />
        ))}
        {upcomingDeadlines.length === 0 && (
          <p className="text-sm text-gray-400">No upcoming deadlines.</p>
        )}
      </div>

      {/* Recent Collaborations */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📁 Recent Collaborations</h2>
        <div className="overflow-auto bg-white rounded-xl shadow-sm">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Brand</th>
                <th className="px-4">Campaign</th>
                <th className="px-4">Status</th>
                <th className="px-4">Payment</th>
                <th className="px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentDeals.map((d, idx) => (
                <CollabRow
                  key={idx}
                  brandLogo={`/brand-logos/${d.brand.toLowerCase()}.png`}
                  brandName={d.brand}
                  campaign={`${d.platform} Campaign`}
                  status={d.status}
                  payment={d.payment}
                />
              ))}
              {recentDeals.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-400 py-6">
                    No recent collaborations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
