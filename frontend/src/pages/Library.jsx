import React, { useState } from 'react'
import ActionCard from '../components/ActionCard'

const Library = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  const ecoActions = [
    {
      id: 1,
      title: 'Use Reusable Shopping Bags',
      category: 'plastic',
      description: 'Replace single-use plastic bags with reusable cloth or jute bags',
      impact: 'high',
      saved: false,
    },
    {
      id: 2,
      title: 'Fix Leaky Faucets',
      category: 'water',
      description: 'A dripping faucet can waste over 3,000 gallons per year',
      impact: 'medium',
      saved: true,
    },
    {
      id: 3,
      title: 'Switch to LED Bulbs',
      category: 'energy',
      description: 'LED bulbs use 75% less energy than traditional bulbs',
      impact: 'high',
      saved: false,
    },
    {
      id: 4,
      title: 'Start Composting',
      category: 'waste',
      description: 'Turn food scraps into nutrient-rich soil',
      impact: 'medium',
      saved: false,
    },
  ]

  const categories = [
    { id: 'all', label: 'All', icon: '🌍' },
    { id: 'water', label: 'Water', icon: '💧' },
    { id: 'energy', label: 'Energy', icon: '⚡' },
    { id: 'waste', label: 'Waste', icon: '♻️' },
    { id: 'plastic', label: 'Plastic', icon: '🚫' },
    { id: 'travel', label: 'Travel', icon: '🚗' },
  ]

  const filteredActions =
    activeCategory === 'all'
      ? ecoActions
      : ecoActions.filter((action) => action.category === activeCategory)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Eco-Action Library</h1>
        <p className="text-gray-600 mt-1">Browse curated sustainability tips and actions</p>
      </div>

      {/* Category Filter */}
      <div className="card">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeCategory === cat.id
                  ? 'bg-eco-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="card">
        <input
          type="text"
          placeholder="Search eco-actions..."
          className="input-field"
        />
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActions.map((action) => (
          <ActionCard key={action.id} action={action} />
        ))}
      </div>

      {/* Saved Actions */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">💾 Saved Actions</h3>
        <p className="text-gray-600">
          You have {ecoActions.filter((a) => a.saved).length} saved action(s) to try later
        </p>
      </div>
    </div>
  )
}

export default Library
