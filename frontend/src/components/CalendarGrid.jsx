import React, { useState } from 'react'
import { formatDateForAPI } from '../utils/helpers'

const CalendarGrid = ({ logs = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  
  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  
  // Month names
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']

  // Get status for a specific day
  const getDayStatus = (day) => {
    const dateStr = formatDateForAPI(new Date(year, month, day))
    const dayLogs = logs.filter(log => 
      formatDateForAPI(new Date(log.date)) === dateStr
    )
    
    if (dayLogs.length === 0) return 'gray'
    
    const doneCount = dayLogs.filter(log => log.status === 'done').length
    const totalCount = dayLogs.length
    const completionRate = doneCount / totalCount
    
    if (completionRate === 1) return 'green'
    if (completionRate >= 0.5) return 'yellow'
    return 'red'
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const statusColors = {
    green: 'bg-eco-green-500 dark:bg-eco-green-400',
    yellow: 'bg-yellow-400 dark:bg-yellow-500',
    red: 'bg-red-400 dark:bg-red-500',
    gray: 'bg-gray-200 dark:bg-gray-600',
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
          {monthNames[month]} {year}
        </h2>
        <div className="flex space-x-2">
          <button 
            onClick={handlePrevMonth}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-lg transition-colors duration-300"
          >
            ← Prev
          </button>
          <button 
            onClick={handleNextMonth}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-lg transition-colors duration-300"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-semibold text-gray-600 dark:text-gray-400 text-sm py-2 transition-colors duration-300">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-2">
        {/* Empty cells for start day offset */}
        {[...Array(firstDay)].map((_, idx) => (
          <div key={`empty-${idx}`} className="aspect-square"></div>
        ))}

        {/* Actual days */}
        {[...Array(daysInMonth)].map((_, idx) => {
          const day = idx + 1
          const status = getDayStatus(day)

          return (
            <div
              key={day}
              className={`aspect-square ${statusColors[status]} rounded-lg flex items-center justify-center font-bold text-white cursor-pointer hover:opacity-80 transition`}
              title={`${monthNames[month]} ${day}, ${year}`}
            >
              {day}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarGrid
