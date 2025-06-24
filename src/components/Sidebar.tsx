'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaHome, FaHandshake, FaFileContract, FaFeatherAlt, FaUsers, FaCog } from 'react-icons/fa';

const menuItems = [
  { label: 'Dashboard', icon: <FaHome />, href: '/' },
  { label: 'Deals', icon: <FaHandshake />, href: '/deals' },
  { label: 'Contracts', icon: <FaFileContract />, href: '/contracts' },
  { label: 'AI Pitch Generator', icon: <FaFeatherAlt />, href: '/pitchgenerator' },
  { label: 'Performance', icon: <FaUsers />, href: '/performance' },
  { label: 'Settings', icon: <FaCog />, href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-white border-r shadow-sm p-5 fixed">
      <h1 className="text-2xl font-bold text-indigo-600 mb-10">BrandMate</h1>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.label}>
            <Link href={item.href}>
              <div
                className={`flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer text-sm font-medium transition ${
                  pathname === item.href
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
