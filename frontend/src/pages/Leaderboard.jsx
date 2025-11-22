import React, { useEffect, useState } from "react";
import { challengesAPI } from "../utils/api";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await challengesAPI.getLeaderboard();
        setLeaderboard(res.data.data);
      } catch (err) {
        setError("Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading)
    return <div className="p-8 text-center">Loading leaderboard...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Challenge Leaderboard
      </h1>
      <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <thead>
          <tr>
            <th className="py-3 px-4 bg-green-100 dark:bg-green-900">Rank</th>
            <th className="py-3 px-4 bg-green-100 dark:bg-green-900">User</th>
            <th className="py-3 px-4 bg-green-100 dark:bg-green-900">
              Completed
            </th>
            <th className="py-3 px-4 bg-green-100 dark:bg-green-900">Total</th>
            <th className="py-3 px-4 bg-green-100 dark:bg-green-900">
              Success %
            </th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-4 text-center">
                No leaderboard data available.
              </td>
            </tr>
          ) : (
            leaderboard.map((entry, idx) => (
              <tr
                key={entry.user._id}
                className={idx % 2 === 0 ? "bg-gray-50 dark:bg-gray-700" : ""}
              >
                <td className="py-2 px-4 text-center font-semibold">
                  {idx + 1}
                </td>
                <td className="py-2 px-4 text-center">
                  {entry.user.name || entry.user.email}
                </td>
                <td className="py-2 px-4 text-center">{entry.completed}</td>
                <td className="py-2 px-4 text-center">{entry.total}</td>
                <td className="py-2 px-4 text-center">{entry.successRate}%</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
