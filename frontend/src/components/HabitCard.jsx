import React from 'react'

const HabitCard = ({ habit }) => {
  const categoryColors = {
    water: 'bg-blue-100 text-blue-800',
    energy: 'bg-yellow-100 text-yellow-800',
    waste: 'bg-green-100 text-green-800',
    plastic: 'bg-red-100 text-red-800',
    travel: 'bg-purple-100 text-purple-800',
  }

  const categoryIcons = {
    water: '💧',
    energy: '⚡',
    waste: '♻️',
    plastic: '🚫',
    travel: '🚗',
  }

  return (
    <div className="card hover:shadow-xl transition">
      <div className="flex items-start justify-between mb-4">
        <span className={`badge ${categoryColors[habit.category]}`}>
          {categoryIcons[habit.category]} {habit.category}
        </span>
        <button className="text-gray-400 hover:text-gray-600">⋮</button>
      </div>

      <h3 className="text-xl font-bold mb-3">{habit.title}</h3>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🔥</span>
          <div>
            <p className="text-sm text-gray-600">Streak</p>
            <p className="text-lg font-bold text-orange-600">{habit.streak} days</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={habit.completed}
            className="w-6 h-6 text-eco-green-600 rounded"
            readOnly
          />
          <span className="text-sm text-gray-600">Today</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <button className="flex-1 btn-secondary text-sm py-2">Edit</button>
        <button className="flex-1 btn-primary text-sm py-2">Check In</button>
      </div>
    </div>
  )
}

export default HabitCard
