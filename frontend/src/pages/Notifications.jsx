import React, { useState, useEffect } from 'react'
import api from '../utils/api'

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const response = await api.get('/notifications')
      setNotifications(response.data.data || [])
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (notificationId) => {
    try {
      await api.put(`/notifications/${notificationId}/read`)
      fetchNotifications() // Refresh
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await api.put('/notifications/read-all')
      fetchNotifications() // Refresh
    } catch (error) {
      console.error('Error marking all as read:', error)
    }
  }

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'All') return true
    if (filter === 'Unread') return !notif.read
    return notif.type.toLowerCase().includes(filter.toLowerCase().slice(0, -1))
  })

  const getNotificationIcon = (type) => {
    const icons = {
      'streak-milestone': '🔥',
      'reminder': '⏰',
      'challenge-joined': '🏆',
      'challenge-completed': '🎉',
      'badge-earned': '⭐'
    }
    return icons[type] || '📢'
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Stay updated with your eco-journey</p>
        </div>
        <button className="btn-secondary" onClick={handleMarkAllAsRead}>Mark All as Read</button>
      </div>

      {/* Filter Tabs */}
      <div className="card">
        <div className="flex space-x-2">
          {['All', 'Unread', 'Streaks', 'Challenges', 'Reminders'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                tab === filter
                  ? 'bg-eco-green-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No notifications to display</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification._id}
              className={`card cursor-pointer ${
                !notification.read ? 'border-l-4 border-eco-green-600 bg-eco-green-50 dark:bg-eco-green-900/20' : ''
              }`}
              onClick={() => !notification.read && handleMarkAsRead(notification._id)}
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">{notification.type.replace('-', ' ').toUpperCase()}</h3>
                      <p className="text-gray-700 dark:text-gray-300 mt-1">{notification.payload?.message || 'New notification'}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        {new Date(notification.sentAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                    {!notification.read && (
                      <span className="w-3 h-3 bg-eco-green-600 rounded-full"></span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Empty State (if no notifications) */}
      {/* <div className="card text-center py-12">
        <div className="text-6xl mb-4">🔔</div>
        <h3 className="text-xl font-bold text-gray-700">No Notifications</h3>
        <p className="text-gray-500 mt-2">You're all caught up!</p>
      </div> */}
    </div>
  )
}

export default Notifications
