import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()

  const menuItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/habits', icon: '✅', label: 'My Habits' },
    { path: '/calendar', icon: '📅', label: 'Calendar' },
    { path: '/challenges', icon: '🏆', label: 'Challenges' },
    { path: '/library', icon: '📚', label: 'Eco Library' },
    { path: '/eco-store', icon: '🌳', label: 'Carbon Offset' },
    { path: '/profile', icon: '👤', label: 'Profile' },
  ]

  return (
    <aside className="w-64 bg-white h-screen fixed left-0 top-0 shadow-lg flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <span className="text-3xl">🌱</span>
          <div>
            <h1 className="text-xl font-bold text-eco-green-700">Green Routine</h1>
            <p className="text-xs text-gray-500">Build Better Habits</p>
          </div>
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition duration-200 ${
                  location.pathname === item.path
                    ? 'bg-eco-green-100 text-eco-green-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-eco-green-50 rounded-lg p-4">
          <p className="text-sm font-semibold text-eco-green-700">🌍 Eco Score</p>
          <p className="text-2xl font-bold text-eco-green-600">1,234</p>
          <p className="text-xs text-gray-600">Keep up the great work!</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
