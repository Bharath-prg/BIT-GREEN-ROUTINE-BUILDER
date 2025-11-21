import React from 'react'
import CalendarGrid from '../components/CalendarGrid'

const Calendar = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Calendar View</h1>
        <p className="text-gray-600 mt-1">Visual representation of your habit completion</p>
      </div>

      {/* Legend */}
      <div className="card">
        <h3 className="font-semibold mb-3">Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-eco-green-500 rounded"></div>
            <span className="text-sm">All habits completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-yellow-400 rounded"></div>
            <span className="text-sm">Partial completion</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-red-400 rounded"></div>
            <span className="text-sm">Habits missed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <span className="text-sm">No data</span>
          </div>
        </div>
      </div>

      {/* Calendar Component */}
      <CalendarGrid />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <p className="text-sm text-gray-600">This Month</p>
          <p className="text-3xl font-bold text-eco-green-600 mt-2">23</p>
          <p className="text-xs text-gray-500 mt-1">Perfect Days</p>
        </div>
        <div className="card text-center">
          <p className="text-sm text-gray-600">Completion Rate</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">87%</p>
          <p className="text-xs text-gray-500 mt-1">This Month</p>
        </div>
        <div className="card text-center">
          <p className="text-sm text-gray-600">Longest Streak</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">15</p>
          <p className="text-xs text-gray-500 mt-1">Days</p>
        </div>
      </div>
    </div>
  )
}

export default Calendar
