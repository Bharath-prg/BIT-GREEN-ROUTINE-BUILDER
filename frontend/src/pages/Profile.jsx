import React from 'react'

const Profile = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Profile & Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">Manage your account and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="card">
        <div className="flex items-start space-x-6">
          <div className="w-24 h-24 bg-eco-green-200 dark:bg-eco-green-700 rounded-full flex items-center justify-center transition-colors duration-300">
            <span className="text-4xl font-bold text-eco-green-700 dark:text-eco-green-200">JD</span>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">John Doe</h2>
            <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">john.doe@example.com</p>
            <div className="flex space-x-2 mt-3">
              <span className="badge badge-success">Eco Warrior</span>
              <span className="badge bg-orange-100 text-orange-800">7-Day Streak</span>
            </div>
          </div>
          <button className="btn-secondary">Edit Profile</button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">Member Since</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white mt-2 transition-colors duration-300">Jan 2024</p>
        </div>
        <div className="card text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Habits</p>
          <p className="text-xl font-bold text-eco-green-600 dark:text-eco-green-400 mt-2">12</p>
        </div>
        <div className="card text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">Badges Earned</p>
          <p className="text-xl font-bold text-purple-600 dark:text-purple-400 mt-2">8</p>
        </div>
        <div className="card text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">Eco Score</p>
          <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-2">1,234</p>
        </div>
      </div>

      {/* Badges Collection */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">🏆 Badges & Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '🔥', label: '5-Day Streak', earned: true },
            { icon: '⭐', label: '15-Day Streak', earned: true },
            { icon: '💎', label: '30-Day Streak', earned: false },
            { icon: '👑', label: '60-Day Streak', earned: false },
            { icon: '🏆', label: 'Challenge Winner', earned: true },
            { icon: '🌟', label: 'Eco Master', earned: false },
            { icon: '💧', label: 'Water Saver', earned: true },
            { icon: '⚡', label: 'Energy Efficient', earned: true },
          ].map((badge, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg text-center transition-colors duration-300 ${
                badge.earned ? 'bg-eco-green-50 dark:bg-eco-green-900/30 border-2 border-eco-green-300 dark:border-eco-green-700' : 'bg-gray-100 dark:bg-gray-700 opacity-50'
              }`}
            >
              <div className="text-4xl mb-2">{badge.icon}</div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{badge.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">⚙️ Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">Email Reminders</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Receive daily habit reminders via email</p>
            </div>
            <input type="checkbox" className="w-12 h-6" defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">Browser Notifications</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get push notifications in your browser</p>
            </div>
            <input type="checkbox" className="w-12 h-6" />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">Timezone</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Set your local timezone</p>
            </div>
            <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg">
              <option>UTC-5 (EST)</option>
              <option>UTC-8 (PST)</option>
              <option>UTC+0 (GMT)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card border-2 border-red-200 bg-red-50">
        <h3 className="text-xl font-bold text-red-700 mb-4">⚠️ Danger Zone</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-red-700">Delete Account</p>
            <p className="text-sm text-red-600">Permanently delete your account and all data</p>
          </div>
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
