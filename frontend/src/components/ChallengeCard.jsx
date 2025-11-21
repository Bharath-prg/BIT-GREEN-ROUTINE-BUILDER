import React from 'react'

const ChallengeCard = ({ challenge, progress, active, onJoin }) => {
  const progressPercentage = progress 
    ? Math.round((progress.completedDays / challenge.durationDays) * 100)
    : 0

  return (
    <div className="card hover:shadow-xl transition">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{challenge.title}</h3>
        {active && (
          <span className="badge badge-success">Active</span>
        )}
      </div>

      <p className="text-gray-600 dark:text-gray-400 mb-4">{challenge.description}</p>

      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
          <p className="font-bold text-gray-900 dark:text-white">{challenge.durationDays} days</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Participants</p>
          <p className="font-bold text-eco-green-600 dark:text-eco-green-400">{challenge.participants?.length || 0}</p>
        </div>
      </div>

      {active && progress ? (
        <>
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">Progress</span>
              <span className="text-sm font-bold text-eco-green-600 dark:text-eco-green-400">{progressPercentage}%</span>
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-eco-green-600 dark:bg-eco-green-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Day {progress.completedDays} of {challenge.durationDays}
            </p>
          </div>
          <button className="btn-primary w-full">View Details</button>
        </>
      ) : (
        <button 
          className="btn-primary w-full"
          onClick={() => onJoin && onJoin(challenge._id)}
        >
          Join Challenge
        </button>
      )}
    </div>
  )
}

export default ChallengeCard
