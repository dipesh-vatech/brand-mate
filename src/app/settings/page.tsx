'use client';

import { useState } from 'react';

const tabs = ['Profile', 'Account', 'Notifications', 'Billing'];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Profile');
  const [form, setForm] = useState({ name: 'User', email: 'user@example.com' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-800">⚙️ Settings</h1>

      {/* Tab Buttons */}
      <div className="flex gap-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
              activeTab === tab
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'Profile' && (
        <div className="bg-white rounded-xl p-6 shadow-sm max-w-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-md text-sm shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-md text-sm shadow-sm"
              />
            </div>
            <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transition">
              Save Changes
            </button>
          </div>
        </div>
      )}

      {activeTab === 'Account' && (
        <div className="bg-white rounded-xl p-6 shadow-sm max-w-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Username</label>
            <input
              type="text"
              value="brandmate_user"
              disabled
              className="w-full mt-1 px-3 py-2 border bg-gray-100 rounded-md text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Change Password</label>
            <input
              type="password"
              placeholder="New password"
              className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
            />
          </div>
          <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transition">
            Update Account
          </button>
        </div>
      )}

      {activeTab === 'Notifications' && (
        <div className="bg-white rounded-xl p-6 shadow-sm max-w-lg space-y-4">
          <label className="flex items-center space-x-3">
            <input type="checkbox" defaultChecked className="accent-indigo-600" />
            <span className="text-sm text-gray-700">Enable email alerts</span>
          </label>
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="accent-indigo-600" />
            <span className="text-sm text-gray-700">Notify me about new deals</span>
          </label>
          <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transition">
            Save Preferences
          </button>
        </div>
      )}

      {activeTab === 'Billing' && (
        <div className="bg-white rounded-xl p-6 shadow-sm max-w-lg space-y-4">
          <p className="text-sm text-gray-500">You are currently on the <strong>Free Plan</strong>.</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition">
            Upgrade to Pro
          </button>
        </div>
      )}

      {/* Placeholder panels for other tabs */}
      {activeTab !== 'Profile' && (
        <div className="text-sm text-gray-500">This section is under construction.</div>
      )}
    </div>
  );
}
