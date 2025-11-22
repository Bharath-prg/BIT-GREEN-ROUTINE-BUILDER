import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const AnalyticsComparison = ({ data, period }) => {
  if (!data) return null;

  // Prepare data for overall comparison
  const overallData = [
    {
      name: period === "week" ? "This Week" : "This Month",
      rate: data.current.rate,
    },
    {
      name: period === "week" ? "Last Week" : "Last Month",
      rate: data.previous.rate,
    },
  ];

  // Prepare data for category-wise comparison
  const categoryData = data.categories.map((cat) => ({
    category: cat.category,
    Current: cat.current.rate,
    Previous: cat.previous.rate,
    diff: cat.current.rate - cat.previous.rate,
  }));

  // Improvement statement
  const improvement = data.diff;
  const improvementText =
    improvement > 0
      ? `You did ${improvement.toFixed(1)}% better compared to ${
          period === "week" ? "last week" : "last month"
        }.`
      : improvement < 0
      ? `You did ${Math.abs(improvement).toFixed(1)}% worse compared to ${
          period === "week" ? "last week" : "last month"
        }.`
      : `Your performance was the same as ${
          period === "week" ? "last week" : "last month"
        }.`;

  return (
    <div className="space-y-10">
      <div className="card p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-eco-green-700">
          Overall Completion Rate
        </h2>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart
            data={overallData}
            barSize={60}
            margin={{ top: 30, right: 40, left: 0, bottom: 10 }}
          >
            <defs>
              <linearGradient id="overallBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#059669" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 16, fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
              tick={{ fontSize: 14 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(v) => `${v.toFixed(1)}%`}
              contentStyle={{ borderRadius: 12, fontSize: 16 }}
            />
            <Bar dataKey="rate" fill="url(#overallBar)" radius={[12, 12, 0, 0]}>
              <LabelList
                dataKey="rate"
                position="top"
                formatter={(v) => `${v.toFixed(1)}%`}
                style={{ fontWeight: 700, fontSize: 18 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-5 text-xl font-semibold text-center text-eco-green-800">
          {improvementText}
        </div>
      </div>

      <div className="card p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">
          Category-wise Comparison
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={categoryData}
            barSize={32}
            margin={{ top: 30, right: 40, left: 0, bottom: 10 }}
          >
            <defs>
              <linearGradient id="catCurrent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="catPrev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a1a1aa" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#6b7280" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="category"
              tick={{ fontSize: 15, fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
              tick={{ fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(v) => `${v.toFixed(1)}%`}
              contentStyle={{ borderRadius: 12, fontSize: 15 }}
            />
            <Legend wrapperStyle={{ fontSize: 15, fontWeight: 600 }} />
            <Bar
              dataKey="Current"
              fill="url(#catCurrent)"
              radius={[10, 10, 0, 0]}
            >
              <LabelList
                dataKey="Current"
                position="top"
                formatter={(v) => `${v.toFixed(1)}%`}
                style={{ fontWeight: 600, fontSize: 15 }}
              />
            </Bar>
            <Bar
              dataKey="Previous"
              fill="url(#catPrev)"
              radius={[10, 10, 0, 0]}
            >
              <LabelList
                dataKey="Previous"
                position="top"
                formatter={(v) => `${v.toFixed(1)}%`}
                style={{ fontWeight: 600, fontSize: 15 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsComparison;
