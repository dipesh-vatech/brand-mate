'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { usePosts } from '../../../context/PostContext';

export default function AddPostPage() {
  const router = useRouter();
  const { addPost } = usePosts();

  const [form, setForm] = useState({
    post: '',
    platform: '',
    likes: '',
    comments: '',
    saves: '',
    conversion: 'Yes',
  });

  const [url, setUrl] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPost = {
      post: form.post,
      platform: form.platform,
      likes: Number(form.likes),
      comments: Number(form.comments),
      saves: Number(form.saves),
      conversion: form.conversion,
    };

    await addPost(newPost); // ✅ wait for Supabase insert
    router.push('/performance'); // ✅ then redirect
  };

  const handleSimulateFetch = async () => {
    if (!url.trim()) return;

    const platforms = ['Instagram', 'TikTok', 'YouTube'];
    const platform = platforms[Math.floor(Math.random() * platforms.length)];

    const simulatedPost = {
      post: `Auto-fetched: ${url}`,
      platform,
      likes: Math.floor(Math.random() * 10000 + 1000),
      comments: Math.floor(Math.random() * 800 + 50),
      saves: Math.floor(Math.random() * 1500 + 100),
      conversion: Math.random() > 0.3 ? 'Yes' : 'No',
    };

    await addPost(simulatedPost); // ✅ ensure this completes
    router.push('/performance');  // ✅ immediate sync on page
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl p-6 shadow-sm mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📤 Add New Post</h2>

      {/* AI Fetch URL Bar */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Paste Post URL (AI Mode)
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="e.g. https://www.instagram.com/p/xyz"
            className="flex-1 px-3 py-2 border rounded-md text-sm shadow-sm text-gray-800 placeholder-gray-400"
          />
          <button
            onClick={handleSimulateFetch}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transition"
          >
            Fetch Performance
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="text-center text-gray-400 text-xs mb-6">OR</div>

      {/* Manual Form */}
      <form onSubmit={handleManualSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Post Title</label>
          <input
            type="text"
            name="post"
            value={form.post}
            onChange={handleChange}
            required
            className="w-full mt-1 px-3 py-2 border rounded-md text-sm shadow-sm text-gray-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Platform</label>
          <select
            name="platform"
            value={form.platform}
            onChange={handleChange}
            required
            className="w-full mt-1 px-3 py-2 border rounded-md text-sm shadow-sm text-gray-800"
          >
            <option value="">Select platform</option>
            <option value="Instagram">Instagram</option>
            <option value="TikTok">TikTok</option>
            <option value="YouTube">YouTube</option>
            <option value="X">X (Twitter)</option>
          </select>
        </div>

        {['likes', 'comments', 'saves'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-600 capitalize">
              {field}
            </label>
            <input
              type="number"
              name={field}
              value={(form as any)[field]}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md text-sm shadow-sm text-gray-800"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-600">Conversion</label>
          <select
            name="conversion"
            value={form.conversion}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md text-sm shadow-sm text-gray-800"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
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
            Save Post
          </button>
        </div>
      </form>
    </div>
  );
}
