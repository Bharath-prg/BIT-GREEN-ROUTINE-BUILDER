import React from 'react';

const HabitDeleteDialog = ({ isOpen, onClose, onDeleteHabitOnly, onDeleteBoth, habitTitle, challenges }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full p-6 transition-colors duration-300">
        <div className="flex items-start mb-4">
          <div className="flex-shrink-0">
            <span className="text-4xl">⚠️</span>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Active Streak Challenge Detected
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              This habit has an active streak challenge. Deleting this habit will also delete the streak challenge progress.
            </p>
            
            {challenges && challenges.length > 0 && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-3 mb-4">
                <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                  Active Challenges:
                </p>
                {challenges.map((challenge, idx) => (
                  <div key={idx} className="text-sm text-yellow-700 dark:text-yellow-300">
                    • {challenge.challengeTitle} ({challenge.completedDays}/{challenge.durationDays} days)
                  </div>
                ))}
              </div>
            )}

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Habit:</strong> {habitTitle}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold transition-colors"
          >
            ❌ Don't Delete
          </button>
          <button
            onClick={onDeleteBoth}
            className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
          >
            🗑️ Delete Both Habit and Challenge
          </button>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
          This action cannot be undone
        </p>
      </div>
    </div>
  );
};

export default HabitDeleteDialog;
