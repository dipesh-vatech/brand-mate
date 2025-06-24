import { FaHandshake, FaClock, FaDollarSign, FaChartLine } from 'react-icons/fa';
import OverviewCard from '../components/OverviewCard';
import DeadlineItem from '../components/DeadlineItem';
import CollabRow from '../components/CollabRow'

export default function DashboardPage() {
  return (
    <>
      <div className="flex flex-wrap -mx-4">
        <OverviewCard
          title="Active Collaborations"
          value={8}
          icon={<FaHandshake />}
          gradientFrom="from-green-400"
          gradientTo="to-emerald-500"
        />
        <OverviewCard
          title="Upcoming Deadlines"
          value={3}
          icon={<FaClock />}
          gradientFrom="from-yellow-400"
          gradientTo="to-orange-500"
        />
        <OverviewCard
          title="Total Earnings"
          value="$1,250"
          icon={<FaDollarSign />}
          gradientFrom="from-sky-500"
          gradientTo="to-indigo-500"
        />
        <OverviewCard
          title="Engagement Rate"
          value="8.4%"
          icon={<FaChartLine />}
          gradientFrom="from-pink-500"
          gradientTo="to-rose-500"
        />
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📅 Upcoming Deadlines</h2>
        <DeadlineItem
          brandLogo="/brand-logos/nike.png"
          deliverable="Instagram Post for Nike"
          dueDate="July 2, 2025"
        />
        <DeadlineItem
          brandLogo="/brand-logos/starbucks.png"
          deliverable="Story Reel for Starbucks"
          dueDate="July 5, 2025"
        />
      </div>

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
              <CollabRow
                brandLogo="/brand-logos/nike.png"
                brandName="Nike"
                campaign="Fall Launch 2025"
                status="Active"
                payment="$800"
              />
              <CollabRow
                brandLogo="/brand-logos/starbucks.png"
                brandName="Starbucks"
                campaign="Cold Brew Blast"
                status="Completed"
                payment="$600"
              />
              <CollabRow
                brandLogo="/brand-logos/adobe.png"
                brandName="Adobe"
                campaign="Creative Cloud Push"
                status="Pending"
                payment="$900"
              />
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
