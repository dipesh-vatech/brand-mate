'use client';

import { useContracts } from '../../context/ContractContext';
import Link from 'next/link';

export default function ContractsPage() {
  const { contracts, updateContractStatus } = useContracts(); // ⬅️ FIXED: now includes updateContractStatus

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
            {contracts.length > 0 ? (
              contracts.map((c, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-indigo-600 hover:underline cursor-pointer">
                    {c.fileName || 'Untitled_Contract.pdf'}
                  </td>
                  <td className="px-4">
                    <select
                      value={c.status}
                      onChange={(e) => updateContractStatus(c.id!, e.target.value)}
                      className={`text-sm font-medium px-3 py-1 rounded-full border bg-white transition
                        ${
                          c.status === 'Signed'
                            ? 'bg-green-100 text-green-800 border-green-300'
                            : c.status === 'Processing'
                            ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                            : c.status === 'Archived'
                            ? 'bg-gray-100 text-gray-700 border-gray-300'
                            : 'bg-white text-gray-700 border-gray-200'
                        }`}
                    >
                      {['Processing', 'Signed', 'Archived'].map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4">{c.brand || 'N/A'}</td>
                  <td className="px-4">{c.dates || 'N/A'}</td>
                  <td className="px-4 font-semibold">
                    {typeof c.payment === 'number' ? `$${c.payment.toLocaleString()}` : 'N/A'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                  No contracts uploaded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
