import React, { useState, useEffect } from 'react'
import api from '../utils/api'

const HabitCard = ({ habit, onDelete, onUpdate }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [habitLogs, setHabitLogs] = useState([])
  const [stats, setStats] = useState({
    totalDays: 0,
    completedDays: 0,
    missedDays: 0,
    completionRate: 0,
    currentStreak: 0
  })
  const [loadingStats, setLoadingStats] = useState(false)

  const categoryColors = {
    Water: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Energy: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Waste: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Food: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    Transport: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  }

  const categoryIcons = {
    Water: '💧',
    Energy: '⚡',
    Waste: '♻️',
    Food: '🍃',
    Transport: '🚗',
  }

  const fetchHabitDetails = async () => {
    if (!showDetailsModal) return
    
    try {
      setLoadingStats(true)
      const response = await api.get(`/logs/habit/${habit._id}`)
      const logs = response.data.data || []
      setHabitLogs(logs)

      // Calculate statistics
      const completed = logs.filter(l => l.status === 'done').length
      const missed = logs.filter(l => l.status === 'missed').length
      const total = logs.length
      const rate = total > 0 ? Math.round((completed / total) * 100) : 0

      // Calculate current streak
      let streak = 0
      const sortedLogs = logs.sort((a, b) => new Date(b.date) - new Date(a.date))
      const today = new Date().toISOString().split('T')[0]
      let currentDate = new Date()
      
      for (const log of sortedLogs) {
        const logDate = log.date
        const checkDate = currentDate.toISOString().split('T')[0]
        
        if (logDate === checkDate && log.status === 'done') {
          streak++
          currentDate.setDate(currentDate.getDate() - 1)
        } else if (logDate < checkDate) {
          break
        }
      }

      setStats({
        totalDays: total,
        completedDays: completed,
        missedDays: missed,
        completionRate: rate,
        currentStreak: streak
      })
    } catch (error) {
      console.error('Error fetching habit details:', error)
    } finally {
      setLoadingStats(false)
    }
  }

  useEffect(() => {
    fetchHabitDetails()
  }, [showDetailsModal])

  const handleViewDetails = () => {
    setShowDetailsModal(true)
  }

  const impactPoints = {
    Low: 10,
    Medium: 25,
    High: 50
  }

  return (
    <>
      <div className="card hover:shadow-xl transition">
        <div className="flex items-start justify-between mb-4">
          <span className={`badge ${categoryColors[habit.category] || 'bg-gray-100 text-gray-800'}`}>
            {categoryIcons[habit.category] || '📌'} {habit.category}
          </span>
          <button 
            onClick={() => onDelete && onDelete(habit._id)}
            className="text-gray-400 hover:text-red-600 transition"
            title="Delete habit"
          >
            🗑️
          </button>
        </div>

        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{habit.title}</h3>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🔥</span>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Impact</p>
              <p className="text-lg font-bold text-orange-600 dark:text-orange-400">{habit.impactLevel || 'Medium'}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {habit.frequency || 'Daily'}
            </span>
          </div>
        </div>

        {habit.reminderTime && (
          <div className="mb-3 text-sm text-gray-600 dark:text-gray-400">
            ⏰ Reminder: {habit.reminderTime}
          </div>
        )}

        <div className="flex space-x-2">
          <button 
            onClick={handleViewDetails}
            className="flex-1 btn-secondary text-sm py-2"
          >
            View Details
          </button>
          <a href="/dashboard" className="flex-1 btn-primary text-sm py-2 text-center">Track Today</a>
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{habit.title}</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            {loadingStats ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-green-600"></div>
              </div>
            ) : (
              <>
                {/* Habit Info */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Category</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {categoryIcons[habit.category]} {habit.category}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Frequency</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{habit.frequency}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Impact</p>
                      <p className="font-semibold text-orange-600 dark:text-orange-400">{habit.impactLevel}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Points/Day</p>
                      <p className="font-semibold text-eco-green-600 dark:text-eco-green-400">
                        +{impactPoints[habit.impactLevel] || 25}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Statistics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.totalDays}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Days</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.completedDays}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Completed</p>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 text-center">
                      <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{stats.completionRate}%</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Success Rate</p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
                      <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.currentStreak}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Current Streak</p>
                    </div>
                  </div>
                </div>

                {/* Recent History */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent History</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {habitLogs.length === 0 ? (
                      <p className="text-center text-gray-500 dark:text-gray-400 py-8">No history yet. Start tracking!</p>
                    ) : (
                      habitLogs.slice(0, 10).map((log, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="text-gray-900 dark:text-white">
                            {new Date(log.date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            log.status === 'done' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                            {log.status === 'done' ? '✓ Done' : '✗ Missed'}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="flex-1 btn-secondary"
                  >
                    Close
                  </button>
                  <a
                    href="/dashboard"
                    className="flex-1 btn-primary text-center"
                  >
                    Track Today
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default HabitCard
