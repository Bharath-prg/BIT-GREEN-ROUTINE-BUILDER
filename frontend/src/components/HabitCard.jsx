import React from 'react'

const HabitCard = ({ habit, onDelete }) => {
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

  return (
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
        <button className="flex-1 btn-secondary text-sm py-2">View Details</button>
        <a href="/dashboard" className="flex-1 btn-primary text-sm py-2 text-center">Track Today</a>
      </div>
    </div>
  )
}

export default HabitCard
