'use client';

import { useState } from 'react';

export default function PerformancePage() {
  const [metrics] = useState({
    likes: 12045,
    comments: 834,
    saves: 1503,
    conversion: true,
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Section: Engagement Overview */}
      <section className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-1">📈 Engagement Overview</h2>
        <p className="text-sm text-gray-500 mb-4">Monthly likes & comments trend</p>
        <div className="h-72 w-full bg-gray-50 flex items-center justify-center rounded-md text-gray-400 border">
          {/* You’ll replace this placeholder with Chart.js or Recharts later */}
          [ Bar Chart Placeholder ]
        </div>
      </section>

      {/* Section: Post Performance */}
      <section className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">📣 Post Performance</h2>
            <p className="text-sm text-gray-500">Performance breakdown of recent posts</p>
          </div>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transition">
            + Add Post
          </button>
        </div>

        <div className="overflow-auto rounded-lg border">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Post</th>
                <th className="px-4">Platform</th>
                <th className="px-4">Likes</th>
                <th className="px-4">Comments</th>
                <th className="px-4">Saves</th>
                <th className="px-4">Conversion</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  post: 'My new favorite gadget from TechGizmo',
                  platform: 'Instagram',
                  likes: 12045,
                  comments: 834,
                  saves: 1503,
                  conversion: 'Yes',
                },
                {
                  post: 'Unboxing the Summer Launch kit',
                  platform: 'TikTok',
                  likes: 250832,
                  comments: 4892,
                  saves: 5400,
                  conversion: 'Yes',
                },
                {
                  post: 'Styling the new EcoWear line',
                  platform: 'YouTube',
                  likes: 8023,
                  comments: 1203,
                  saves: 980,
                  conversion: 'Yes',
                },
                {
                  post: 'Protein shake secrets with FitFuel',
                  platform: 'Instagram',
                  likes: 9876,
                  comments: 543,
                  saves: 1100,
                  conversion: 'Yes',
                },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-900">{row.post}</td>
                  <td className="px-4">{row.platform}</td>
                  <td className="px-4 font-semibold text-indigo-600">{row.likes.toLocaleString()}</td>
                  <td className="px-4">{row.comments.toLocaleString()}</td>
                  <td className="px-4">{row.saves.toLocaleString()}</td>
                  <td className="px-4 text-green-600 font-medium">{row.conversion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
