import React, { useState, useEffect } from 'react'
import HabitCard from '../components/HabitCard'
import api from '../utils/api'

const Habits = () => {
  const [showModal, setShowModal] = useState(false)
  const [habits, setHabits] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterCategory, setFilterCategory] = useState('All')
  const [formData, setFormData] = useState({
    title: '',
    category: 'Water',
    frequency: 'Daily',
    reminderTime: '09:00',
    impactLevel: 'Medium'
  })

  useEffect(() => {
    fetchHabits()
  }, [])

  const fetchHabits = async () => {
    try {
      setLoading(true)
      const response = await api.get('/habits')
      setHabits(response.data.data || [])
    } catch (error) {
      console.error('Error fetching habits:', error)
      alert('Failed to fetch habits')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/habits', formData)
      setShowModal(false)
      setFormData({
        title: '',
        category: 'Water',
        frequency: 'Daily',
        reminderTime: '09:00',
        impactLevel: 'Medium'
      })
      fetchHabits()
    } catch (error) {
      console.error('Error creating habit:', error)
      alert('Failed to create habit')
    }
  }

  const handleDelete = async (habitId) => {
    if (!window.confirm('Are you sure you want to delete this habit?')) return
    
    try {
      await api.delete(`/habits/${habitId}`)
      fetchHabits()
    } catch (error) {
      console.error('Error deleting habit:', error)
      alert('Failed to delete habit')
    }
  }

  const filteredHabits = filterCategory === 'All' 
    ? habits.filter(h => !h.archived)
    : habits.filter(h => !h.archived && h.category === filterCategory)

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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">My Habits</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">Track and manage your eco-friendly habits</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary">
          + Add New Habit
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700">
        {['All', 'Water', 'Energy', 'Waste', 'Food', 'Transport', 'Plastic', 'Greenery'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterCategory(tab)}
            className={`px-4 py-2 font-medium transition ${
              tab === filterCategory
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
        {filteredHabits.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {filterCategory === 'All' ? 'No habits yet. Create your first eco-habit!' : `No ${filterCategory} habits yet.`}
            </p>
          </div>
        ) : (
          filteredHabits.map((habit) => (
            <HabitCard key={habit._id} habit={habit} onDelete={handleDelete} />
          ))
        )}
      </div>

      {/* Create Habit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 transition-colors duration-300">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Create New Habit</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">Habit Name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="e.g., Turn off lights" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">Category</label>
                <select 
                  className="input-field"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option>Water</option>
                  <option>Energy</option>
                  <option>Waste</option>
                  <option>Food</option>
                  <option>Transport</option>
                  <option>Plastic</option>
                  <option>Greenery</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">Frequency</label>
                <select 
                  className="input-field"
                  value={formData.frequency}
                  onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                >
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">Reminder Time</label>
                <input 
                  type="time" 
                  className="input-field"
                  value={formData.reminderTime}
                  onChange={(e) => setFormData({...formData, reminderTime: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">Impact Level</label>
                <select 
                  className="input-field"
                  value={formData.impactLevel}
                  onChange={(e) => setFormData({...formData, impactLevel: e.target.value})}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
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
