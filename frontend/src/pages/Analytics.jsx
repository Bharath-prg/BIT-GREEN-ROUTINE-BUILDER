import React, { useEffect, useState } from "react";
import api from "../utils/api";
import AnalyticsComparison from "../components/AnalyticsComparison";

// Simple spinner and skeletons for loading state
const ChartSkeleton = () => (
  <div className="space-y-10">
    <div className="card p-6 animate-pulse">
      <div className="h-8 w-1/3 bg-eco-green-200 rounded mb-6" />
      <div className="h-72 w-full bg-eco-green-100 rounded-xl mb-4" />
      <div className="h-6 w-1/2 bg-eco-green-100 rounded mx-auto" />
    </div>
    <div className="card p-6 animate-pulse">
      <div className="h-8 w-1/3 bg-blue-200 rounded mb-6" />
      <div className="h-96 w-full bg-blue-100 rounded-xl" />
    </div>
  </div>
);

const Spinner = () => (
  <div className="flex justify-center items-center py-16">
    <svg
      className="animate-spin h-10 w-10 text-eco-green-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  </div>
);

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
        <>
          <Spinner />
          <ChartSkeleton />
        </>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : data ? (
        <AnalyticsComparison data={data} period={period} />
      ) : (
        <div>No analytics data available.</div>
      )}
    </div>
  );
};

export default Analytics;
