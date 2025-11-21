import React from 'react'
import ChallengeCard from '../components/ChallengeCard'

const Challenges = () => {
  const challenges = [
    {
      id: 1,
      title: 'Zero Plastic Week',
      description: 'Avoid all single-use plastic for 7 days',
      duration: 7,
      participants: 234,
      progress: 60,
      active: true,
    },
    {
      id: 2,
      title: 'Water Saver Challenge',
      description: 'Reduce water usage by 30%',
      duration: 14,
      participants: 156,
      progress: 0,
      active: false,
    },
    {
      id: 3,
      title: 'Energy Cut-down Week',
      description: 'Minimize electricity consumption',
      duration: 7,
      participants: 189,
      progress: 0,
      active: false,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Eco Challenges</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">Join challenges and compete with eco-warriors worldwide</p>
      </div>

      {/* Active Challenges */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">My Active Challenges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challenges
            .filter((c) => c.active)
            .map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
        </div>
      </div>

      {/* Available Challenges */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">Available Challenges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges
            .filter((c) => !c.active)
            .map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
        </div>
      </div>

      {/* Challenge Stats */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">Your Challenge Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-eco-green-600 dark:text-eco-green-400">5</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">1</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">3</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Badges Earned</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">87%</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Challenges
