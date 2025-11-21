import React from 'react'

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: 'streak',
      icon: '🔥',
      title: 'Streak Warning!',
      message: "Don't break your 7-day streak! Complete today's habits.",
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      type: 'challenge',
      icon: '🏆',
      title: 'Challenge Update',
      message: "You're on Day 4 of Zero Plastic Week challenge!",
      time: '5 hours ago',
      read: false,
    },
    {
      id: 3,
      type: 'badge',
      icon: '⭐',
      title: 'New Badge Earned!',
      message: 'Congratulations! You earned the "5-Day Streak" badge.',
      time: '1 day ago',
      read: true,
    },
    {
      id: 4,
      type: 'reminder',
      icon: '⏰',
      title: 'Habit Reminder',
      message: "Time to turn off unused lights! You've set this for 9:00 PM.",
      time: '1 day ago',
      read: true,
    },
    {
      id: 5,
      type: 'achievement',
      icon: '🎉',
      title: 'Milestone Reached!',
      message: 'You have completed 50 habits this month!',
      time: '2 days ago',
      read: true,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">Stay updated with your eco-journey</p>
        </div>
        <button className="btn-secondary">Mark All as Read</button>
      </div>

      {/* Filter Tabs */}
      <div className="card">
        <div className="flex space-x-2">
          {['All', 'Unread', 'Streaks', 'Challenges', 'Reminders'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                tab === 'All'
                  ? 'bg-eco-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`card ${
              !notification.read ? 'border-l-4 border-eco-green-600 bg-eco-green-50' : ''
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="text-3xl">{notification.icon}</div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{notification.title}</h3>
                    <p className="text-gray-700 mt-1">{notification.message}</p>
                    <p className="text-sm text-gray-500 mt-2">{notification.time}</p>
                  </div>
                  {!notification.read && (
                    <span className="w-3 h-3 bg-eco-green-600 rounded-full"></span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (if no notifications) */}
      {/* <div className="card text-center py-12">
        <div className="text-6xl mb-4">🔔</div>
        <h3 className="text-xl font-bold text-gray-700">No Notifications</h3>
        <p className="text-gray-500 mt-2">You're all caught up!</p>
      </div> */}
    </div>
  )
}

export default Notifications
