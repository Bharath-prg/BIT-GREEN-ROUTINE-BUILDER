import React from 'react'

const EcoStore = () => {
  const offsetOptions = [
    {
      id: 1,
      icon: '🌲',
      title: 'Plant a Tree',
      description: 'Partner with organizations that plant trees worldwide',
      impact: 'One tree absorbs ~48 lbs of CO2 per year',
      organizations: ['One Tree Planted', 'Trees for the Future', 'The Nature Conservancy'],
    },
    {
      id: 2,
      icon: '📱',
      title: 'Recycle Electronics',
      description: 'Proper e-waste disposal and recycling centers',
      impact: 'Prevents toxic materials from polluting the environment',
      organizations: ['Best Buy Recycling', 'Call2Recycle', 'Earth911'],
    },
    {
      id: 3,
      icon: '👕',
      title: 'Donate Reusable Clothes',
      description: 'Give clothes a second life through donation',
      impact: 'Reduces textile waste and carbon footprint',
      organizations: ['Goodwill', 'Salvation Army', 'ThreadUp'],
    },
    {
      id: 4,
      icon: '🌾',
      title: 'Composting Guide',
      description: 'Learn how to start composting at home',
      impact: 'Diverts organic waste from landfills',
      organizations: ['Local composting programs', 'Community gardens'],
    },
    {
      id: 5,
      icon: '🧹',
      title: 'Join Cleanup Drives',
      description: 'Participate in local environmental cleanup events',
      impact: 'Direct positive impact on your community',
      organizations: ['Ocean Conservancy', 'Keep America Beautiful', 'Local NGOs'],
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Carbon Offset & Eco Actions</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 transition-colors duration-300">Learn how to reduce and offset your carbon footprint</p>
      </div>

      {/* Info Banner */}
      <div className="card bg-eco-green-50 dark:bg-eco-green-900/30 border-2 border-eco-green-200 dark:border-eco-green-700 transition-colors duration-300">
        <div className="flex items-start space-x-4">
          <span className="text-4xl">ℹ️</span>
          <div>
            <h3 className="font-bold text-eco-green-800 dark:text-eco-green-400 text-lg transition-colors duration-300">Educational Resource Only</h3>
            <p className="text-gray-700 dark:text-gray-300 mt-1 transition-colors duration-300">
              This page provides information about carbon offset options and sustainable practices.
              Links to verified organizations are provided for your convenience.
            </p>
          </div>
        </div>
      </div>

      {/* Carbon Calculator */}
      <div className="card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 transition-colors duration-300">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">🧮 Your Estimated Carbon Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-700 rounded-lg p-4 text-center transition-colors duration-300">
            <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
            <p className="text-3xl font-bold text-eco-green-600 dark:text-eco-green-400">-12kg</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">CO2 Saved</p>
          </div>
          <div className="bg-white dark:bg-gray-700 rounded-lg p-4 text-center transition-colors duration-300">
            <p className="text-sm text-gray-600 dark:text-gray-400">This Year</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">-89kg</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">CO2 Saved</p>
          </div>
          <div className="bg-white dark:bg-gray-700 rounded-lg p-4 text-center transition-colors duration-300">
            <p className="text-sm text-gray-600 dark:text-gray-400">Equivalent to</p>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">4</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Trees Planted</p>
          </div>
        </div>
      </div>

      {/* Offset Options */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">Ways to Offset & Reduce Your Impact</h2>
        <div className="space-y-6">
          {offsetOptions.map((option) => (
            <div key={option.id} className="card hover:shadow-xl transition">
              <div className="flex items-start space-x-4">
                <div className="text-5xl">{option.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white transition-colors duration-300">{option.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">{option.description}</p>
                  <div className="bg-eco-green-50 dark:bg-eco-green-900/30 rounded-lg p-3 mb-3 transition-colors duration-300">
                    <p className="text-sm font-semibold text-eco-green-700 dark:text-eco-green-400 transition-colors duration-300">
                      💡 Impact: {option.impact}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                      Verified Organizations:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {option.organizations.map((org, idx) => (
                        <span
                          key={idx}
                          className="badge badge-success text-xs"
                        >
                          {org}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Resources */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">📋 Additional Resources</h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300 transition-colors duration-300">
          <li>• <strong>Carbon Footprint Calculator:</strong> Calculate your personal carbon footprint</li>
          <li>• <strong>Local Recycling Centers:</strong> Find recycling facilities near you</li>
          <li>• <strong>Sustainable Living Guide:</strong> Comprehensive eco-friendly lifestyle tips</li>
          <li>• <strong>Environmental Organizations:</strong> Connect with local and global eco-groups</li>
        </ul>
      </div>
    </div>
  )
}

export default EcoStore
