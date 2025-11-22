import React, { useEffect, useState } from "react";
import api from "../utils/api";

const Analytics = () => {
  const [period, setPeriod] = useState("week");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
    // eslint-disable-next-line
  }, [period]);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/analytics/comparison?period=${period}`);
      setData(res.data.data);
    } catch (err) {
      setError("Failed to fetch analytics");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics & Comparison</h1>
      <div className="mb-4 flex gap-2">
        <button
          className={`btn ${
            period === "week" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => setPeriod("week")}
        >
          This Week vs Last Week
        </button>
        <button
          className={`btn ${
            period === "month" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => setPeriod("month")}
        >
          This Month vs Last Month
        </button>
      </div>
      {loading ? (
        <div>Loading analytics...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : data ? (
        <div className="space-y-6">
          <div className="card p-4">
            <h2 className="text-xl font-semibold mb-2">
              Overall Completion Rate
            </h2>
            <p>
              <span className="font-bold">Current:</span>{" "}
              {data.current.rate.toFixed(1)}%<br />
              <span className="font-bold">Previous:</span>{" "}
              {data.previous.rate.toFixed(1)}%<br />
              <span className="font-bold">Difference:</span>{" "}
              {data.diff >= 0 ? "+" : ""}
              {data.diff.toFixed(1)}%
            </p>
          </div>
          <div className="card p-4">
            <h2 className="text-xl font-semibold mb-2">Category Breakdown</h2>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="py-1">Category</th>
                  <th className="py-1">Current %</th>
                  <th className="py-1">Previous %</th>
                </tr>
              </thead>
              <tbody>
                {data.categories.map((cat) => (
                  <tr key={cat.category}>
                    <td className="py-1">{cat.category}</td>
                    <td className="py-1">{cat.current.rate.toFixed(1)}%</td>
                    <td className="py-1">{cat.previous.rate.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>No analytics data available.</div>
      )}
    </div>
  );
};

export default Analytics;
