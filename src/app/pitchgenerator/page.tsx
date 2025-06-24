'use client';

import { useState } from 'react';

export default function PitchGeneratorPage() {
  const [pitch, setPitch] = useState('');
  const [form, setForm] = useState({
    brand: '',
    niche: '',
    followers: '',
    engagement: '',
    likes: '',
    comments: '',
    success: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generatePitch = () => {
    const { brand, niche, followers, engagement, likes, comments, success } = form;
    const email = `Hi ${brand},

I'm a ${niche} content creator with ${followers} followers and an engagement rate of ${engagement}%. On average, I receive ${likes} likes and ${comments} comments per post. ${success} I’d love to collaborate on your next campaign.

Looking forward to hearing from you!

Best,
[Your Name]`;
    setPitch(email);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* Left Panel – Form */}
      <div className="bg-white p-8 rounded-xl shadow-sm space-y-5">
        <h2 className="text-2xl font-semibold text-gray-800">AI Pitch Generator</h2>
        <p className="text-sm text-gray-500">
          Craft the perfect pitch email for your next collaboration.
        </p>

        {[
          { label: 'Brand Name', name: 'brand', placeholder: 'e.g. BrandFresh' },
          { label: 'Your Niche', name: 'niche', placeholder: 'e.g. Fashion & Lifestyle' },
          { label: 'Follower Count', name: 'followers', placeholder: '10000' },
          { label: 'Engagement Rate (%)', name: 'engagement', placeholder: '2.5' },
          { label: 'Average Likes', name: 'likes', placeholder: '500' },
          { label: 'Average Comments', name: 'comments', placeholder: '100' },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700">{field.label}</label>
            <input
              type="text"
              name={field.name}
              value={(form as any)[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700">Past Successes</label>
          <textarea
            name="success"
            value={form.success}
            onChange={handleChange}
            rows={3}
            placeholder="Worked with @BrandFresh on their summer campaign..."
            className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          onClick={generatePitch}
          className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 transition"
        >
          Generate Pitch
        </button>
      </div>

      {/* Right Panel – Output */}
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Generated Email</h2>
        <div className="bg-gray-50 border rounded-md p-4 text-sm text-gray-700 whitespace-pre-wrap min-h-[250px]">
          {pitch || 'Your generated email will appear here.'}
        </div>
      </div>
    </div>
  );
}
