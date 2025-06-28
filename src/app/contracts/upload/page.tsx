'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useContracts } from '../../../context/ContractContext';
import { supabase } from '../../../lib/supabaseClient';

type DealOption = {
  id: string;
  brand: string;
  platform: string;
};

export default function UploadContractPage() {
  const router = useRouter();
  const { addContract } = useContracts();

  const [form, setForm] = useState({
    brand: '',
    dealId: '',
    notes: '',
    payment: '',
    startDate: '',
    endDate: '',
    status: 'Processing',
  });

  const [dealOptions, setDealOptions] = useState<DealOption[]>([]);

  useEffect(() => {
    const fetchDeals = async () => {
      const { data, error } = await supabase
        .from('deals')
        .select('id, brand, platform')
        .order('created_at', { ascending: false });

      if (error) console.error('Failed to fetch deals:', error.message);
      else setDealOptions(data || []);
    };

    fetchDeals();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedDates =
      form.startDate && form.endDate
        ? `${form.startDate} – ${form.endDate}`
        : 'N/A';

    const numericPayment = parseFloat(form.payment);

    const now = new Date();
    const readableTimestamp = now
      .toISOString()
      .replace('T', '_')
      .replace(/:/g, '-')
      .split('.')[0];

    const safeBrand = form.brand.trim().replace(/\s+/g, '_') || 'Contract';
    const fileName = `${safeBrand}_${readableTimestamp}.pdf`;

    const newContract = {
      brand: form.brand,
      dealId: form.dealId,
      notes: form.notes,
      dates: formattedDates,
      payment: numericPayment,
      status: form.status,
      fileName,
    };

    await addContract(newContract);
    router.push('/contracts');
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl p-6 shadow-sm mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📄 Upload New Contract</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Brand</label>
          <input
            type="text"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="e.g. GlowSkin"
            required
            className="w-full mt-1 px-3 py-2 border rounded-md text-sm shadow-sm text-gray-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Linked Deal</label>
          <select
            name="dealId"
            value={form.dealId}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md text-sm text-gray-800"
          >
            <option value="">Select a deal</option>
            {dealOptions.map((deal) => (
              <option key={deal.id} value={deal.id}>
                {deal.brand} ({deal.platform})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Add Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            placeholder="Optional notes about this contract..."
            className="w-full mt-1 px-3 py-2 border rounded-md text-sm shadow-sm text-gray-800"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md text-sm text-gray-800"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">End Date</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md text-sm text-gray-800"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Payment Amount</label>
          <input
            type="number"
            name="payment"
            value={form.payment}
            onChange={handleChange}
            placeholder="e.g. 1500"
            className="w-full mt-1 px-3 py-2 border rounded-md text-sm shadow-sm text-gray-800"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Status</label>
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
