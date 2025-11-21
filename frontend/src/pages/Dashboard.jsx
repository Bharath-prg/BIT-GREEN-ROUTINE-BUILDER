import React, { useState, useEffect } from 'react'

const Dashboard = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">Welcome back, {user?.name || 'User'}! Here's your eco-progress overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-br from-eco-green-500 to-eco-green-600 text-white">
          <p className="text-sm opacity-90">Total Eco Score</p>
          <p className="text-4xl font-bold mt-2">1,234</p>
          <p className="text-xs mt-1 opacity-75">+15% from last week</p>
        </div>

        <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <p className="text-sm opacity-90">Current Streak</p>
          <p className="text-4xl font-bold mt-2">7 Days</p>
          <p className="text-xs mt-1 opacity-75">🔥 Keep it going!</p>
        </div>

        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <p className="text-sm opacity-90">Active Habits</p>
          <p className="text-4xl font-bold mt-2">12</p>
          <p className="text-xs mt-1 opacity-75">3 completed today</p>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <p className="text-sm opacity-90">Challenges</p>
          <p className="text-4xl font-bold mt-2">2</p>
          <p className="text-xs mt-1 opacity-75">1 active challenge</p>
        </div>
      </div>

      {/* Today's Habits */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">Todays Habits</h2>
        <div className="space-y-3">
          {['Turn off unused lights', 'Use reusable water bottle', 'Avoid single-use plastic'].map(
            (habit, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                <div className="flex items-center space-x-3">
                  <input type="checkbox" className="w-5 h-5 text-eco-green-600 dark:text-eco-green-400 rounded" />
                  <span className="font-medium text-gray-900 dark:text-gray-100">{habit}</span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">💧 Water</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Recent Activity & Upcoming Challenges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🏆</span>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Earned "5-Day Streak" badge</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Completed 8 habits yesterday</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">1 day ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">Active Challenges</h3>
          <div className="space-y-3">
            <div className="p-4 bg-eco-green-50 dark:bg-eco-green-900/30 rounded-lg transition-colors duration-300">
              <p className="font-bold text-eco-green-700 dark:text-eco-green-400">Zero Plastic Week</p>
              <div className="mt-2 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-eco-green-600 dark:bg-eco-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Day 4 of 7 • 60% complete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
