import React, { useState, useEffect } from 'react'
import CalendarGrid from '../components/CalendarGrid'
import api from '../utils/api'

const Calendar = () => {
  const [logs, setLogs] = useState([])
  const [stats, setStats] = useState({
    perfectDays: 0,
    completionRate: 0,
    longestStreak: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCalendarData()
  }, [])

  const fetchCalendarData = async () => {
    try {
      setLoading(true)
      
      // Fetch all logs for the user
      const logsRes = await api.get('/logs')
      const allLogs = logsRes.data.data || []
      setLogs(allLogs)

      // Calculate stats
      const perfectDays = calculatePerfectDays(allLogs)
      const completionRate = calculateCompletionRate(allLogs)
      const longestStreak = calculateLongestStreak(allLogs)

      setStats({
        perfectDays,
        completionRate,
        longestStreak
      })
    } catch (error) {
      console.error('Error fetching calendar data:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculatePerfectDays = (logs) => {
    const dateGroups = {}
    logs.forEach(log => {
      if (log.status === 'done') {
        dateGroups[log.date] = (dateGroups[log.date] || 0) + 1
      }
    })
    // Count days where all habits were completed (this is simplified)
    return Object.keys(dateGroups).length
  }

  const calculateCompletionRate = (logs) => {
    if (logs.length === 0) return 0
    const completedLogs = logs.filter(l => l.status === 'done').length
    return Math.round((completedLogs / logs.length) * 100)
  }

  const calculateLongestStreak = (logs) => {
    // Simplified streak calculation
    const doneDates = logs.filter(l => l.status === 'done').map(l => l.date).sort()
    let longestStreak = 0
    let currentStreak = 0
    
    for (let i = 0; i < doneDates.length; i++) {
      if (i === 0 || isConsecutiveDay(doneDates[i - 1], doneDates[i])) {
        currentStreak++
        longestStreak = Math.max(longestStreak, currentStreak)
      } else {
        currentStreak = 1
      }
    }
    
    return longestStreak
  }

  const isConsecutiveDay = (date1, date2) => {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    const diffTime = d2 - d1
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays === 1
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-green-600"></div>
      </div>
    )
  }
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
      <CalendarGrid logs={logs} />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
          <p className="text-3xl font-bold text-eco-green-600 dark:text-eco-green-400 mt-2">{stats.perfectDays}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Perfect Days</p>
        </div>
        <div className="card text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{stats.completionRate}%</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Overall</p>
        </div>
        <div className="card text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">Longest Streak</p>
          <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mt-2">{stats.longestStreak}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Days</p>
        </div>
      </div>
    </div>
  )
}

export default Calendar
