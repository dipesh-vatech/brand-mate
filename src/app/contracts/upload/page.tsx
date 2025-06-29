'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useContracts } from '../../../context/ContractContext';
import { useDeals } from '../../../context/DealContext'; // ✅ use context instead of direct supabase
import { supabase } from '../../../lib/supabaseClient';

type DealOption = {
  id: string;
  brand: string;
  platform: string;
};

export default function UploadContractPage() {
  const router = useRouter();
  const { addContract } = useContracts();
  const { deals, addDeal } = useDeals(); // ✅ use context version

  const [dealOptions, setDealOptions] = useState<DealOption[]>([]);
  const [form, setForm] = useState({
    brand: '',
    dealId: '',
    notes: '',
    payment: '',
    startDate: '',
    endDate: '',
    status: 'Processing',
  });

  const [newDeal, setNewDeal] = useState({
    brand: '',
    platform: '',
    deliverables: '',
    endDate: '',
    payment: '',
    status: 'Pending',
  });

  useEffect(() => {
    setDealOptions(deals); // ✅ populate from DealContext
  }, [deals]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'brand') setNewDeal((prev) => ({ ...prev, brand: value }));
    if (name === 'payment') setNewDeal((prev) => ({ ...prev, payment: value }));
    if (name === 'endDate') setNewDeal((prev) => ({ ...prev, endDate: value }));
  };

  const handleNewDealChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDeal((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let finalDealId = form.dealId;

    if (form.dealId === '__new__') {
      const insertedId = await addDeal({
        brand: newDeal.brand,
        platform: newDeal.platform,
        deliverables: newDeal.deliverables,
        endDate: newDeal.endDate || form.endDate,
        payment: parseFloat(newDeal.payment || form.payment),
        status: newDeal.status || 'Pending',
      });

      if (!insertedId) {
        alert('Failed to create new deal.');
        return;
      }

      finalDealId = insertedId;
    }

    const formattedDates =
      form.startDate && form.endDate
        ? `${form.startDate} – ${form.endDate}`
        : 'N/A';

    const timestamp = new Date().toISOString().replace('T', '_').replace(/:/g, '-').split('.')[0];
    const safeBrand = form.brand.trim().replace(/\s+/g, '_') || 'Contract';
    const fileName = `${safeBrand}_${timestamp}.pdf`;

    await addContract({
      brand: form.brand,
      dealId: finalDealId,
      notes: form.notes,
      dates: formattedDates,
      payment: parseFloat(form.payment),
      status: form.status,
      fileName,
    });

    router.push('/contracts');
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl p-6 shadow-sm mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📄 Upload New Contract</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Brand</label>
          <input
            type="text"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            required
            className="w-full mt-1 px-3 py-2 border rounded-md text-sm text-gray-800"
          />
        </div>

        {/* Deal dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Linked Deal</label>
          <select
            name="dealId"
            value={form.dealId}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md text-sm text-gray-800"
          >
            <option value="">Select a deal</option>
            {dealOptions.map((d) => (
              <option key={d.id} value={d.id}>
                {d.brand} ({d.platform})
              </option>
            ))}
            <option value="__new__">＋ Create New Deal</option>
          </select>
        </div>

        {/* Conditional new deal form */}
        {form.dealId === '__new__' && (
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md space-y-2">
            <p className="text-sm font-medium text-yellow-700">Creating new deal:</p>

            <input
              name="platform"
              type="text"
              placeholder="Platform"
              value={newDeal.platform}
              onChange={handleNewDealChange}
              className="w-full px-3 py-2 border rounded-md text-sm text-gray-800"
              required
            />

            <input
              name="deliverables"
              type="text"
              placeholder="Deliverables"
              value={newDeal.deliverables}
              onChange={handleNewDealChange}
              className="w-full px-3 py-2 border rounded-md text-sm text-gray-800"
              required
            />
          </div>
        )}

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            className="w-full mt-1 px-3 py-2 border rounded-md text-sm text-gray-800"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md text-sm text-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">End Date</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md text-sm text-gray-800"
            />
          </div>
        </div>

        {/* Payment */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Payment Amount</label>
          <input
            type="number"
            name="payment"
            value={form.payment}
            onChange={handleChange}
            placeholder="e.g. 1500"
            required
            className="w-full mt-1 px-3 py-2 border rounded-md text-sm text-gray-800"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Contract Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md text-sm text-gray-800"
          >
            <option value="Processing">Processing</option>
            <option value="Signed">Signed</option>
            <option value="Archived">Archived</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 rounded-md border text-sm text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700"
          >
            Upload Contract
          </button>
        </div>
      </form>
    </div>
  );
}
