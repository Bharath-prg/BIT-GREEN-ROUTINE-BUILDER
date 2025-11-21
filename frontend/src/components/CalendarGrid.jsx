import React, { useState, useEffect } from 'react'
import { formatDateForAPI } from '../utils/helpers'
import api from '../utils/api'

const CalendarGrid = ({ logs = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [dateHabits, setDateHabits] = useState([])
  const [loadingDetails, setLoadingDetails] = useState(false)
  
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

  const handleDateClick = async (day) => {
    const dateStr = formatDateForAPI(new Date(year, month, day))
    setSelectedDate({ date: dateStr, day, month: monthNames[month], year })
    setShowDetailsModal(true)
    setLoadingDetails(true)

    try {
      // Fetch logs for this specific date
      const logsRes = await api.get(`/logs/${dateStr}`)
      const dayLogs = logsRes.data.data || []
      
      // Group logs by habit with populated habit info
      const habitsMap = []
      dayLogs.forEach(log => {
        if (log.habitId) {
          habitsMap.push({
            habitTitle: log.habitId.title || 'Deleted Habit',
            category: log.habitId.category || 'Unknown',
            impactLevel: log.habitId.impactLevel || 'Medium',
            status: log.status,
            isDeleted: !log.habitId.title // Check if habit data is missing (deleted)
          })
        }
      })
      
      setDateHabits(habitsMap)
    } catch (error) {
      console.error('Error fetching date details:', error)
      setDateHabits([])
    } finally {
      setLoadingDetails(false)
    }
  }

  const statusColors = {
    green: 'bg-eco-green-500 dark:bg-eco-green-400',
    yellow: 'bg-yellow-400 dark:bg-yellow-500',
    red: 'bg-red-400 dark:bg-red-500',
    gray: 'bg-gray-200 dark:bg-gray-600',
  }

  return (
    <>
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
                onClick={() => handleDateClick(day)}
                className={`aspect-square ${statusColors[status]} rounded-lg flex items-center justify-center font-bold text-white cursor-pointer hover:opacity-80 hover:scale-105 transition-all`}
                title={`Click to view details for ${monthNames[month]} ${day}, ${year}`}
              >
                {day}
              </div>
            )
          })}
        </div>
      </div>

      {/* Date Details Modal */}
      {showDetailsModal && selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowDetailsModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedDate.month} {selectedDate.day}, {selectedDate.year}
              </h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl"
              >
                ×
              </button>
            </div>

            {loadingDetails ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-green-600"></div>
              </div>
            ) : dateHabits.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No habits tracked on this day</p>
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Habits Tracked ({dateHabits.length})
                </h3>
                {dateHabits.map((habit, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 ${
                      habit.status === 'done'
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                        : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                          {habit.habitTitle}
                          {habit.isDeleted && (
                            <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                              Deleted
                            </span>
                          )}
                        </h4>
                        <div className="flex items-center gap-3 mt-2 text-sm text-gray-600 dark:text-gray-400">
                          <span>
                            {habit.category === 'Water' && '💧'}
                            {habit.category === 'Energy' && '⚡'}
                            {habit.category === 'Transport' && '🚗'}
                            {habit.category === 'Food' && '🍃'}
                            {habit.category === 'Waste' && '♻️'}
                            {habit.category === 'Unknown' && '📌'}
                            {' '}{habit.category}
                          </span>
                          <span className="flex items-center gap-1">
                            🔥 {habit.impactLevel}
                          </span>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        habit.status === 'done'
                          ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
                          : 'bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200'
                      }`}>
                        {habit.status === 'done' ? '✓ Done' : '✗ Missed'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowDetailsModal(false)}
              className="w-full mt-6 btn-primary"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default CalendarGrid
