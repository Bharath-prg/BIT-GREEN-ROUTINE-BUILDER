import React, { useState, useEffect } from "react";
import api from "../utils/api";

const Challenges = () => {
  const [activeTab, setActiveTab] = useState("available");
  const [challenges, setChallenges] = useState([]);
  const [userProgress, setUserProgress] = useState([]);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showHabitModal, setShowHabitModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customForm, setCustomForm] = useState({
    title: "",
    description: "",
    durationDays: "",
    icon: "",
    category: "All",
  });
  const [customLoading, setCustomLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [challengesRes, progressRes, habitsRes] = await Promise.all([
        api.get("/challenges"),
        api.get("/challenges/progress"),
        api.get("/habits"),
      ]);

      setChallenges(challengesRes.data.data || []);
      setUserProgress(progressRes.data.data || []);
      setHabits((habitsRes.data.data || []).filter((h) => !h.archived));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChallenge = (challenge) => {
    setSelectedChallenge(challenge);
    setShowHabitModal(true);
  };

  const handleCustomInput = (e) => {
    const { name, value } = e.target;
    setCustomForm((f) => ({ ...f, [name]: value }));
  };

  const handleCreateCustomChallenge = async (e) => {
    e.preventDefault();
    setCustomLoading(true);
    try {
      await api.post("/challenges", {
        ...customForm,
        durationDays: Number(customForm.durationDays),
        type: "streak",
      });
      setShowCustomModal(false);
      setCustomForm({
        title: "",
        description: "",
        durationDays: "",
        icon: "",
        category: "All",
      });
      fetchData();
      alert("Custom challenge created!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create challenge");
    } finally {
      setCustomLoading(false);
    }
  };
  const handleJoinChallenge = async (habitId) => {
    try {
      await api.post("/challenges/join", {
        challengeId: selectedChallenge._id,
        habitId,
      });
      alert("Successfully joined the challenge!");
      setShowHabitModal(false);
      setSelectedChallenge(null);
      fetchData();
    } catch (error) {
      console.error("Error joining challenge:", error);
      alert(error.response?.data?.message || "Failed to join challenge");
    }
  };

  // Filter challenges by tab
  const activeChallenges = userProgress.filter((p) => p.status === "active");
  const completedChallenges = userProgress.filter(
    (p) => p.status === "completed"
  );

  // Get challenge IDs user is currently doing
  const activeChallengeCombos = activeChallenges.map(
    (p) => `${p.challengeId?._id}-${p.habitId?._id}`
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Streak Challenges
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Take on streak challenges for your habits and earn badges!
          </p>
        </div>
        <button
          className="btn-primary"
          onClick={() => setShowCustomModal(true)}
        >
          + Create Custom Challenge
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab("available")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "available"
              ? "border-b-2 border-eco-green-600 text-eco-green-600"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          }`}
        >
          Available Challenges
        </button>
        <button
          onClick={() => setActiveTab("active")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "active"
              ? "border-b-2 border-eco-green-600 text-eco-green-600"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          }`}
        >
          Active ({activeChallenges.length})
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "completed"
              ? "border-b-2 border-eco-green-600 text-eco-green-600"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          }`}
        >
          Completed ({completedChallenges.length})
        </button>
      </div>

      {/* Custom Challenge Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="card rounded-xl shadow-lg max-w-md w-full p-0 bg-gray-50 dark:bg-gray-700">
            <div className="flex items-center justify-between px-8 pt-8 pb-4 border-b border-gray-100 dark:border-gray-600">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Create Custom Challenge
              </h2>
              <button
                onClick={() => setShowCustomModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl font-bold px-2 py-1 rounded-lg transition"
                title="Close"
              >
                ✕
              </button>
            </div>
            <form
              onSubmit={handleCreateCustomChallenge}
              className="space-y-5 px-8 py-8"
            >
              <div>
                <label className="block text-gray-700 dark:text-gray-200 mb-2 font-semibold">
                  Title
                </label>
                <input
                  name="title"
                  value={customForm.title}
                  onChange={handleCustomInput}
                  required
                  className="input w-full bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-200 mb-2 font-semibold">
                  Description
                </label>
                <textarea
                  name="description"
                  value={customForm.description}
                  onChange={handleCustomInput}
                  required
                  className="input w-full bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 min-h-[60px]"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-200 mb-2 font-semibold">
                  Streak Days
                </label>
                <input
                  name="durationDays"
                  type="number"
                  min="1"
                  value={customForm.durationDays}
                  onChange={handleCustomInput}
                  required
                  className="input w-full bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-200 mb-2 font-semibold">
                  Icon (emoji)
                </label>
                <input
                  name="icon"
                  value={customForm.icon}
                  onChange={handleCustomInput}
                  className="input w-full bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2"
                  placeholder="e.g. 🌟"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-200 mb-2 font-semibold">
                  Category
                </label>
                <select
                  name="category"
                  value={customForm.category}
                  onChange={handleCustomInput}
                  className="input w-full bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 appearance-none"
                >
                  <option value="All">All</option>
                  <option value="Water">Water</option>
                  <option value="Energy">Energy</option>
                  <option value="Waste">Waste</option>
                  <option value="Food">Food</option>
                  <option value="Transport">Transport</option>
                  <option value="Plastic">Plastic</option>
                  <option value="Greenery">Greenery</option>
                </select>
              </div>
              <div className="flex space-x-2 pt-2">
                <button
                  type="submit"
                  className="btn-primary flex-1 py-2 text-base font-semibold"
                  disabled={customLoading}
                >
                  {customLoading ? "Creating..." : "Create"}
                </button>
                <button
                  type="button"
                  className="btn-secondary flex-1 py-2 text-base font-semibold"
                  onClick={() => setShowCustomModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Available Challenges Tab */}
      {activeTab === "available" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {challenges.map((challenge) => (
            <div
              key={challenge._id}
              className="card hover:shadow-lg transition-shadow"
            >
              <div className="text-center">
                <div className="text-5xl mb-3">{challenge.icon || "🔥"}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {challenge.durationDays}-Day Streak
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {challenge.description}
                </p>
                <button
                  onClick={() => handleSelectChallenge(challenge)}
                  className="btn-primary w-full"
                >
                  Start Challenge
                </button>
              </div>
            </div>
          ))}
          {challenges.length === 0 && (
            <div className="col-span-full card text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                No challenges available
              </p>
            </div>
          )}
        </div>
      )}

      {/* Active Challenges Tab */}
      {activeTab === "active" && (
        <div className="space-y-4">
          {activeChallenges.map((progress) => {
            const challenge = progress.challengeId;
            const habit = progress.habitId;
            const percentage =
              (progress.completedDays / challenge.durationDays) * 100;

            return (
              <div key={progress._id} className="card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{challenge.icon || "🔥"}</span>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                        {challenge.durationDays}-Day Challenge
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Habit: {habit.title}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-eco-green-600">
                      {progress.completedDays}/{challenge.durationDays}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      days
                    </p>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-eco-green-500 to-eco-green-600 h-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {challenge.durationDays - progress.completedDays} days
                  remaining
                </p>
              </div>
            );
          })}
          {activeChallenges.length === 0 && (
            <div className="card text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                No active challenges. Start one from the Available tab!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Completed Challenges Tab */}
      {activeTab === "completed" && (
        <div className="space-y-4">
          {completedChallenges.map((progress) => {
            const challenge = progress.challengeId;
            const habit = progress.habitId;

            return (
              <div
                key={progress._id}
                className="card bg-gradient-to-r from-eco-green-50 to-green-50 dark:from-gray-800 dark:to-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">✅</span>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                        {challenge.durationDays}-Day Challenge Completed!
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Habit: {habit.title}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-eco-green-600">
                      {challenge.durationDays}/{challenge.durationDays}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      days
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          {completedChallenges.length === 0 && (
            <div className="card text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                No completed challenges yet. Keep going!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Habit Selection Modal */}
      {showHabitModal && selectedChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Select a Habit
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Which habit do you want to take the{" "}
              {selectedChallenge.durationDays}-day challenge for?
            </p>
            <div className="space-y-2 max-h-96 overflow-y-auto mb-6">
              {habits.map((habit) => (
                <button
                  key={habit._id}
                  onClick={() => handleJoinChallenge(habit._id)}
                  className="w-full p-4 text-left bg-gray-50 dark:bg-gray-700 hover:bg-eco-green-50 dark:hover:bg-eco-green-900/30 rounded-lg transition-colors"
                >
                  <div className="font-medium text-gray-900 dark:text-white">
                    {habit.title}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center space-x-2 mt-1">
                    <span>
                      {habit.category === "Water" && "💧"}
                      {habit.category === "Energy" && "⚡"}
                      {habit.category === "Transport" && "🚗"}
                      {habit.category === "Food" && "🍃"}
                      {habit.category === "Waste" && "♻️"}
                    </span>
                    <span>{habit.category}</span>
                    <span>•</span>
                    <span
                      className={`
                      ${habit.impactLevel === "High" ? "text-red-600" : ""}
                      ${habit.impactLevel === "Medium" ? "text-yellow-600" : ""}
                      ${habit.impactLevel === "Low" ? "text-green-600" : ""}
                    `}
                    >
                      {habit.impactLevel} Impact
                    </span>
                  </div>
                </button>
              ))}
              {habits.length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                  No habits available. Create a habit first!
                </p>
              )}
            </div>
            <button
              onClick={() => {
                setShowHabitModal(false);
                setSelectedChallenge(null);
              }}
              className="w-full btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Challenges;
