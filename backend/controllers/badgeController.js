import Badge from "../models/Badge.js";

// @desc    Get all badges for the current user
// @route   GET /api/user/badges
// @access  Private
export const getUserBadges = async (req, res) => {
  try {
    const badges = await Badge.find({ userId: req.user.id }).sort({
      awardedAt: -1,
    });
    res.status(200).json({
      success: true,
      count: badges.length,
      data: badges,
    });
  } catch (error) {
    console.error("Get badges error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching badges",
    });
  }
};
