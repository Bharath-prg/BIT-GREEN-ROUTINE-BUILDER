import React, { useState, useEffect } from 'react'
import NotificationBell from './NotificationBell'
import DarkModeToggle from './DarkModeToggle'
import api from '../utils/api'

const Navbar = () => {
  const [user, setUser] = useState(null)
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const userRes = await api.get('/auth/me')
      setUser(userRes.data.data)
      // TODO: Fetch actual streak from backend
      setStreak(0)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  const getInitials = (name) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between relative z-10 transition-colors duration-300">
      {/* Left Section - Search */}
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <input
            type="text"
            placeholder="Search habits, challenges..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-eco-green-500 dark:focus:ring-eco-green-400 focus:border-transparent outline-none transition-colors duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
          <span className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500">🔍</span>
        </div>
      </div>

      {/* Right Section - User Info & Notifications */}
      <div className="flex items-center space-x-6">
        {/* Dark Mode Toggle */}
        <DarkModeToggle />
        
        {/* Streak Info */}
        <div className="flex items-center space-x-2 bg-orange-50 dark:bg-orange-900/30 px-4 py-2 rounded-lg transition-colors duration-300">
          <span className="text-2xl">🔥</span>
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Current Streak</p>
            <p className="text-lg font-bold text-orange-600 dark:text-orange-400">{streak} Days</p>
          </div>
        </div>

        {/* Notification Bell */}
        <NotificationBell />

        {/* User Avatar */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Eco Warrior</p>
          </div>
          <div className="w-10 h-10 bg-eco-green-200 dark:bg-eco-green-700 rounded-full flex items-center justify-center transition-colors duration-300">
            <span className="text-lg font-bold text-eco-green-700 dark:text-eco-green-200">{getInitials(user?.name)}</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
