import React from 'react'
import NotificationBell from './NotificationBell'

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      {/* Left Section - Search */}
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <input
            type="text"
            placeholder="Search habits, challenges..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green-500 focus:border-transparent outline-none"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>

      {/* Right Section - User Info & Notifications */}
      <div className="flex items-center space-x-6">
        {/* Streak Info */}
        <div className="flex items-center space-x-2 bg-orange-50 px-4 py-2 rounded-lg">
          <span className="text-2xl">🔥</span>
          <div>
            <p className="text-xs text-gray-600">Current Streak</p>
            <p className="text-lg font-bold text-orange-600">7 Days</p>
          </div>
        </div>

        {/* Notification Bell */}
        <NotificationBell />

        {/* User Avatar */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">John Doe</p>
            <p className="text-xs text-gray-500">Eco Warrior</p>
          </div>
          <div className="w-10 h-10 bg-eco-green-200 rounded-full flex items-center justify-center">
            <span className="text-lg font-bold text-eco-green-700">JD</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
