'use client';

import { usePosts } from '../../context/PostContext';
import DeleteButton from '../../components/DeleteButton';
import Link from 'next/link';

export default function PerformancePage() {
  const { posts, deletePost } = usePosts();

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
          <Link
            href="/performance/add"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transition"
          >
            + Add Post
          </Link>
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
              {posts.length > 0 ? (
                posts.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium text-gray-900">{row.post}</td>
                    <td className="px-4">{row.platform}</td>
                    <td className="px-4 font-semibold text-indigo-600">{row.likes.toLocaleString()}</td>
                    <td className="px-4">{row.comments.toLocaleString()}</td>
                    <td className="px-4">{row.saves.toLocaleString()}</td>
                    <td className="px-4 text-green-600 font-medium">{row.conversion}</td>
                    <td className="px-4">
                      <DeleteButton onDelete={() => deletePost(row.id!)} label="post" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-gray-400">
                    No posts yet. Add one to get started!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
