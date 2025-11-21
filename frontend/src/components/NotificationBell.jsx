import React, { useState } from 'react'

const NotificationBell = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const unreadCount = 3

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 hover:bg-gray-100 rounded-lg transition"
      >
        <span className="text-2xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-bold text-lg">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {[
              {
                id: 1,
                icon: '🔥',
                title: 'Streak Warning',
                message: "Don't break your streak!",
                time: '2h ago',
              },
              {
                id: 2,
                icon: '🏆',
                title: 'Challenge Update',
                message: 'Day 4 of Zero Plastic Week',
                time: '5h ago',
              },
              {
                id: 3,
                icon: '⭐',
                title: 'New Badge',
                message: 'You earned 5-Day Streak!',
                time: '1d ago',
              },
            ].map((notif) => (
              <div
                key={notif.id}
                className="p-4 hover:bg-gray-50 border-b border-gray-100 cursor-pointer"
              >
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{notif.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{notif.title}</p>
                    <p className="text-sm text-gray-600">{notif.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-gray-200 text-center">
            <button className="text-eco-green-600 text-sm font-semibold hover:text-eco-green-700">
              View All Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationBell
