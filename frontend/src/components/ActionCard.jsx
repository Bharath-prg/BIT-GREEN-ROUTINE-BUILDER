import React, { useState } from 'react'

const ActionCard = ({ action }) => {
  const [saved, setSaved] = useState(action.saved)

  const impactColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  }

  const categoryIcons = {
    water: '💧',
    energy: '⚡',
    waste: '♻️',
    plastic: '🚫',
    travel: '🚗',
  }

  const handleSave = () => {
    setSaved(!saved)
  }

  return (
    <div className="card hover:shadow-xl transition">
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{categoryIcons[action.category]}</span>
        <button
          onClick={handleSave}
          className={`text-2xl transition ${saved ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-400'}`}
        >
          {saved ? '★' : '☆'}
        </button>
      </div>

      <h3 className="text-lg font-bold mb-2">{action.title}</h3>
      <p className="text-gray-600 text-sm mb-3">{action.description}</p>

      <div className="flex items-center justify-between">
        <span className={`badge ${impactColors[action.impact]} text-xs`}>
          {action.impact.toUpperCase()} Impact
        </span>
        <button className="text-eco-green-600 text-sm font-semibold hover:text-eco-green-700">
          Learn More →
        </button>
      </div>
    </div>
  )
}

export default ActionCard
