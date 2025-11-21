import React, { useState } from 'react'
import HabitCard from '../components/HabitCard'

const Habits = () => {
  const [showModal, setShowModal] = useState(false)

  const habits = [
    { id: 1, title: 'Turn off unused lights', category: 'energy', streak: 7, completed: true },
    { id: 2, title: 'Use reusable water bottle', category: 'water', streak: 12, completed: false },
    { id: 3, title: 'Avoid single-use plastic', category: 'plastic', streak: 5, completed: true },
    { id: 4, title: 'Compost food waste', category: 'waste', streak: 3, completed: false },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">My Habits</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">Track and manage your eco-friendly habits</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary">
          + Add New Habit
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700">
        {['All', 'Water', 'Energy', 'Waste', 'Plastic', 'Travel'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium transition ${
              tab === 'All'
                ? 'border-b-2 border-eco-green-600 dark:border-eco-green-400 text-eco-green-600 dark:text-eco-green-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Habits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {habits.map((habit) => (
          <HabitCard key={habit.id} habit={habit} />
        ))}
      </div>

      {/* Create Habit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 transition-colors duration-300">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Create New Habit</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">Habit Name</label>
                <input type="text" className="input-field" placeholder="e.g., Turn off lights" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">Category</label>
                <select className="input-field">
                  <option>Water</option>
                  <option>Energy</option>
                  <option>Waste</option>
                  <option>Plastic</option>
                  <option>Travel</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">Frequency</label>
                <select className="input-field">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Custom</option>
                </select>
              </div>
              <div className="flex space-x-3 mt-6">
                <button type="submit" className="btn-primary flex-1">
                  Create Habit
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Habits
