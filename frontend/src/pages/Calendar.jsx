import React from 'react'
import CalendarGrid from '../components/CalendarGrid'

const Calendar = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Calendar View</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">Visual representation of your habit completion</p>
      </div>

      {/* Legend */}
      <div className="card">
        <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-eco-green-500 dark:bg-eco-green-400 rounded"></div>
            <span className="text-sm text-gray-900 dark:text-gray-200">All habits completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-yellow-400 rounded"></div>
            <span className="text-sm text-gray-900 dark:text-gray-200">Partial completion</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-red-400 rounded"></div>
            <span className="text-sm text-gray-900 dark:text-gray-200">Habits missed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded"></div>
            <span className="text-sm text-gray-900 dark:text-gray-200">No data</span>
          </div>
        </div>
      </div>

      {/* Calendar Component */}
      <CalendarGrid />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
          <p className="text-3xl font-bold text-eco-green-600 dark:text-eco-green-400 mt-2">23</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Perfect Days</p>
        </div>
        <div className="card text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">87%</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">This Month</p>
        </div>
        <div className="card text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">Longest Streak</p>
          <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mt-2">15</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Days</p>
        </div>
      </div>
    </div>
  )
}

export default Calendar
