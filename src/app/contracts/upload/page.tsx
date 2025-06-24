'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function UploadContractPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    brand: '',
    dealId: '',
    notes: '',
  });
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Uploading contract:', { ...form, file });
    // TODO: Upload to Firebase Storage or Firestore
    router.push('/contracts');
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl p-6 shadow-sm mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📄 Upload New Contract</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: 'Brand', name: 'brand', placeholder: 'e.g. GlowSkin' },
          { label: 'Deal ID (optional)', name: 'dealId', placeholder: 'e.g. DEAL_2024_A12' },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-600">{field.label}</label>
            <input
              type="text"
              name={field.name}
              value={(form as any)[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="w-full mt-1 px-3 py-2 border rounded-md text-sm shadow-sm text-gray-800"
            />
          </div>
        ))}

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

        <div>
          <label className="block text-sm font-medium text-gray-600">Upload PDF or Doc</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="w-full mt-1 text-sm text-gray-700"
          />
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
