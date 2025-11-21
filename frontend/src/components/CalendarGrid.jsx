import React from 'react'

const CalendarGrid = () => {
  // Generate calendar days for current month
  const daysInMonth = 30
  const startDay = 2 // Monday

  const dayStatuses = [
    'green', 'green', 'yellow', 'green', 'red', 'green', 'green',
    'green', 'yellow', 'green', 'green', 'green', 'red', 'green',
    'green', 'green', 'green', 'yellow', 'green', 'green', 'green',
    'yellow', 'green', 'green', 'green', 'green', 'red', 'green',
    'green', 'green',
  ]

  const statusColors = {
    green: 'bg-eco-green-500',
    yellow: 'bg-yellow-400',
    red: 'bg-red-400',
    gray: 'bg-gray-200',
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">December 2024</h2>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">← Prev</button>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">Next →</button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-semibold text-gray-600 text-sm py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-2">
        {/* Empty cells for start day offset */}
        {[...Array(startDay)].map((_, idx) => (
          <div key={`empty-${idx}`} className="aspect-square"></div>
        ))}

        {/* Actual days */}
        {[...Array(daysInMonth)].map((_, idx) => {
          const day = idx + 1
          const status = dayStatuses[idx] || 'gray'

          return (
            <div
              key={day}
              className={`aspect-square ${statusColors[status]} rounded-lg flex items-center justify-center font-bold text-white cursor-pointer hover:opacity-80 transition`}
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
