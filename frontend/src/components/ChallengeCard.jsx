import React from 'react'

const ChallengeCard = ({ challenge }) => {
  return (
    <div className="card hover:shadow-xl transition">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold">{challenge.title}</h3>
        {challenge.active && (
          <span className="badge badge-success">Active</span>
        )}
      </div>

      <p className="text-gray-600 mb-4">{challenge.description}</p>

      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600">Duration</p>
          <p className="font-bold">{challenge.duration} days</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Participants</p>
          <p className="font-bold text-eco-green-600">{challenge.participants}</p>
        </div>
      </div>

      {challenge.active ? (
        <>
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold">Progress</span>
              <span className="text-sm font-bold text-eco-green-600">{challenge.progress}%</span>
            </div>
            <div className="bg-gray-200 rounded-full h-3">
              <div
                className="bg-eco-green-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${challenge.progress}%` }}
              ></div>
            </div>
          </div>
          <button className="btn-primary w-full">Continue Challenge</button>
        </>
      ) : (
        <button className="btn-primary w-full">Join Challenge</button>
      )}
    </div>
  )
}

export default ChallengeCard
