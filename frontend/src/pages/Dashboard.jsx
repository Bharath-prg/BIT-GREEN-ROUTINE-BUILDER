import React, { useState, useEffect } from 'react'
import api from '../utils/api'
import { formatDateForAPI } from '../utils/helpers'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({
    ecoScore: 0,
    currentStreak: 0,
    activeHabits: 0,
    activeChallenges: 0
  })
  const [todayHabits, setTodayHabits] = useState([])
  const [todayLogs, setTodayLogs] = useState({})
  const [challenges, setChallenges] = useState([])
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      // Fetch user profile
      const userRes = await api.get('/auth/me')
      setUser(userRes.data.data)

      // Fetch habits
      const habitsRes = await api.get('/habits')
      const habits = habitsRes.data.data || []
      setTodayHabits(habits.filter(h => !h.archived))

      // Fetch today's logs
      const today = formatDateForAPI(new Date())
      const logsRes = await api.get(`/logs/${today}`)
      const logs = logsRes.data.data || []
      const logsMap = {}
      logs.forEach(log => {
        logsMap[log.habitId] = log.status
      })
      setTodayLogs(logsMap)

      // Fetch challenges progress
      const challengesRes = await api.get('/challenges/progress')
      const userChallenges = challengesRes.data.data || []
      setChallenges(userChallenges)

      // Fetch recent notifications
      const notifRes = await api.get('/notifications')
      setNotifications((notifRes.data.data || []).slice(0, 5))

      // Fetch current streak
      let streak = 0
      try {
        const streakRes = await api.get('/logs/streak')
        streak = streakRes.data.data?.streak || 0
      } catch (error) {
        console.error('Error fetching streak:', error)
      }

      // Calculate stats
      const completedToday = logs.filter(l => l.status === 'done').length
      const activeHabitsCount = habits.filter(h => !h.archived).length
      const activeChallengesCount = userChallenges.length

      setStats({
        ecoScore: userRes.data.data.ecoScoreTotal || 0,
        currentStreak: streak,
        activeHabits: activeHabitsCount,
        activeChallenges: activeChallengesCount
      })

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleHabitCheck = async (habitId, status) => {
    try {
      const today = formatDateForAPI(new Date())

      await api.post('/logs', {
        habitId,
        date: today,
        status: status
      })

      // Update local state
      setTodayLogs(prev => ({
        ...prev,
        [habitId]: status
      }))

      // Refresh stats
      fetchDashboardData()
    } catch (error) {
      console.error('Error logging habit:', error)
      alert('Failed to log habit. Please try again.')
    }
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">Welcome back, {user?.name || 'User'}! Here's your eco-progress overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-br from-eco-green-500 to-eco-green-600 text-white">
          <p className="text-sm opacity-90">🌍 Eco Score</p>
          <p className="text-4xl font-bold mt-2">{stats.ecoScore.toLocaleString()}</p>
          <p className="text-xs mt-1 opacity-75">Keep up the great work!</p>
        </div>

        <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <p className="text-sm opacity-90">Current Streak</p>
          <p className="text-4xl font-bold mt-2">{stats.currentStreak} Days</p>
          <p className="text-xs mt-1 opacity-75">{stats.currentStreak > 0 ? '🔥 Keep it going!' : 'Start your streak today!'}</p>
        </div>

        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <p className="text-sm opacity-90">Active Habits</p>
          <p className="text-4xl font-bold mt-2">{stats.activeHabits}</p>
          <p className="text-xs mt-1 opacity-75">{Object.values(todayLogs).filter(s => s === 'done').length} completed today</p>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <p className="text-sm opacity-90">Challenges</p>
          <p className="text-4xl font-bold mt-2">{stats.activeChallenges}</p>
          <p className="text-xs mt-1 opacity-75">{stats.activeChallenges > 0 ? 'In progress' : 'Join a challenge!'}</p>
        </div>
      </div>

      {/* Today's Habits */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">Today's Habits</h2>
        {todayHabits.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No habits yet. Create your first eco-habit!</p>
            <a href="/habits" className="btn-primary mt-4 inline-block">
              Create Habit
            </a>
          </div>
        ) : (
          <div className="space-y-3">
            {todayHabits.map((habit) => (
              <div key={habit._id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                <div className="flex items-center space-x-3 flex-1">
                  <span className={`font-medium ${todayLogs[habit._id] === 'done' ? 'line-through text-gray-500' : 'text-gray-900 dark:text-gray-100'}`}>
                    {habit.title}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {habit.category === 'Water' && '💧'}
                    {habit.category === 'Energy' && '⚡'}
                    {habit.category === 'Transport' && '🚗'}
                    {habit.category === 'Food' && '🍃'}
                    {habit.category === 'Waste' && '♻️'}
                    {' '}{habit.category}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleHabitCheck(habit._id, 'done')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      todayLogs[habit._id] === 'done'
                        ? 'bg-eco-green-600 dark:bg-eco-green-500 text-white shadow-lg'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-eco-green-100 dark:hover:bg-eco-green-900/30'
                    }`}
                  >
                    ✓ Done
                  </button>
                  <button
                    onClick={() => handleHabitCheck(habit._id, 'missed')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      todayLogs[habit._id] === 'missed'
                        ? 'bg-red-600 dark:bg-red-500 text-white shadow-lg'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/30'
                    }`}
                  >
                    ✗ Missed
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Activity & Upcoming Challenges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">Recent Activity</h3>
          {notifications.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">No recent activity</p>
          ) : (
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div key={notif._id} className="flex items-start space-x-3">
                  <span className="text-2xl">
                    {notif.type === 'streak-milestone' && '🏆'}
                    {notif.type === 'reminder' && '⏰'}
                    {notif.type === 'challenge-joined' && '🚀'}
                    {notif.type === 'challenge-completed' && '✅'}
                    {!['streak-milestone', 'reminder', 'challenge-joined', 'challenge-completed'].includes(notif.type) && '📢'}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{notif.payload?.message || 'New notification'}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(notif.sentAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">Active Challenges</h3>
          {challenges.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-gray-500 dark:text-gray-400 mb-3">No active challenges</p>
              <a href="/challenges" className="btn-primary inline-block">
                Browse Challenges
              </a>
            </div>
          ) : (
            <div className="space-y-3">
              {challenges.slice(0, 2).map((progress) => (
                <div key={progress._id} className="p-4 bg-eco-green-50 dark:bg-eco-green-900/30 rounded-lg transition-colors duration-300">
                  <p className="font-bold text-eco-green-700 dark:text-eco-green-400">
                    {progress.challengeId?.title || 'Challenge'}
                  </p>
                  <div className="mt-2 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-eco-green-600 dark:bg-eco-green-500 h-2 rounded-full" 
                      style={{ width: `${(progress.completedDays / (progress.challengeId?.durationDays || 7)) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Day {progress.completedDays} of {progress.challengeId?.durationDays || 7} • 
                    {' '}{Math.round((progress.completedDays / (progress.challengeId?.durationDays || 7)) * 100)}% complete
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
