import ChallengeProgress from "../models/ChallengeProgress.js";
import User from "../models/User.js";

// @desc    Get leaderboard by challenge success percentage
// @route   GET /api/challenges/leaderboard
// @access  Private
export const getChallengeLeaderboard = async (req, res) => {
  try {
    // Aggregate challenge progress by user
    const agg = await ChallengeProgress.aggregate([
      {
        $group: {
          _id: "$userId",
          total: { $sum: 1 },
          completed: {
            $sum: {
              $cond: [{ $eq: ["$status", "completed"] }, 1, 0],
            },
          },
        },
      },
      {
        $addFields: {
          successRate: {
            $cond: [
              { $eq: ["$total", 0] },
              0,
              { $multiply: [{ $divide: ["$completed", "$total"] }, 100] },
            ],
          },
        },
      },
      { $sort: { successRate: -1, completed: -1 } },
      { $limit: 20 }, // Top 20
    ]);

    // Populate user info
    const userIds = agg.map((a) => a._id);
    const users = await User.find({ _id: { $in: userIds } }).select(
      "name email"
    );
    const userMap = Object.fromEntries(users.map((u) => [u._id.toString(), u]));

    const leaderboard = agg.map((entry) => ({
      user: userMap[entry._id.toString()] || {},
      total: entry.total,
      completed: entry.completed,
      successRate: Math.round(entry.successRate),
    }));

    res.status(200).json({
      success: true,
      data: leaderboard,
    });
  } catch (error) {
    console.error("Leaderboard error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching leaderboard",
    });
  }
};
