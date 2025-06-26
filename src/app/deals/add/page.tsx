'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDeals } from '../../../context/DealContext';

export default function AddDealPage() {
  const router = useRouter();
  const { addDeal } = useDeals();

  const [form, setForm] = useState({
    brand: '',
    platform: '',
    deliverables: '',
    startDate: '',
    endDate: '',
    payment: '',
    status: 'Pending',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedPayment = form.payment
      ? `$${Number(form.payment).toLocaleString()}`
      : 'N/A';

    const newDeal = {
      ...form,
      payment: parseFloat(form.payment),
    };

    await addDeal(newDeal); // ✅ ensure Supabase insert completes
    router.push('/deals');
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl p-6 shadow-sm mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">🤝 Add New Deal</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: 'Brand Name', name: 'brand', placeholder: 'e.g. BrandFresh' },
          { label: 'Platform', name: 'platform', placeholder: 'e.g. Instagram' },
          { label: 'Start Date', name: 'startDate', type: 'date' },
          { label: 'End Date', name: 'endDate', type: 'date' },
          { label: 'Payment', name: 'payment', placeholder: 'e.g. 2500', type: 'number' },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-600">{field.label}</label>
            <input
              type={field.type || 'text'}
              name={field.name}
              value={(form as any)[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md text-sm shadow-sm text-gray-800"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-600">Deliverables</label>
          <textarea
            name="deliverables"
            value={form.deliverables}
            onChange={handleChange}
            rows={3}
            placeholder="e.g. 2 Story mentions, 1 Feed Post"
            className="w-full mt-1 px-3 py-2 border rounded-md text-sm shadow-sm text-gray-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md text-sm shadow-sm text-gray-800"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Upcoming</option>
            <option>Awaiting Payment</option>
            <option>Overdue</option>
            <option>Completed</option>
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
            Save Deal
          </button>
        </div>
      </form>
    </div>
  );
}
