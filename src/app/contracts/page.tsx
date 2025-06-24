'use client';

import { useState } from 'react';
import Link from 'next/link';

const contracts = [
  {
    file: 'BrandFresh_Summer_Contract.pdf',
    status: 'Done',
    brand: 'BrandFresh',
    dates: '2024-07-01 - 2024-08-15',
    payment: '$1,500',
  },
  {
    file: 'TechGizmo_Q3_Agreement.pdf',
    status: 'Done',
    brand: 'TechGizmo',
    dates: '2024-08-01 - 2024-09-01',
    payment: '$2,500',
  },
  {
    file: 'new_deal_terms.pdf',
    status: 'Processing',
    brand: 'N/A',
    dates: 'N/A',
    payment: 'N/A',
  },
  {
    file: 'old_contract.pdf',
    status: 'Error',
    brand: 'N/A',
    dates: 'N/A',
    payment: 'N/A',
  },
];

const statusColors: Record<string, string> = {
  Done: 'bg-green-100 text-green-800',
  Processing: 'bg-yellow-100 text-yellow-800',
  Error: 'bg-red-100 text-red-800',
};

export default function ContractsPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">📑 Contract Management</h1>
          <p className="text-sm text-gray-500">Upload and track your agreements.</p>
        </div>
        <Link
          href="/contracts/upload"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transition"
        >
          Upload Contract
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-auto bg-white rounded-xl shadow-sm">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">File Name</th>
              <th className="px-4">Status</th>
              <th className="px-4">Brand</th>
              <th className="px-4">Dates</th>
              <th className="px-4">Payment</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((c) => (
              <tr key={c.file} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 font-medium text-indigo-600 hover:underline cursor-pointer">
                  {c.file}
                </td>
                <td className="px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[c.status]}`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-4">{c.brand}</td>
                <td className="px-4">{c.dates}</td>
                <td className="px-4 font-semibold">{c.payment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div> // ← now this wraps the entire layout
  );
}