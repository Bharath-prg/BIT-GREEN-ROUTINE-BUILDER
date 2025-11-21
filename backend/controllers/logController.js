import HabitLog from "../models/HabitLog.js";
import Habit from "../models/Habit.js";
import User from "../models/User.js";
import Badge from "../models/Badge.js";
import ChallengeProgress from "../models/ChallengeProgress.js";

// Impact points mapping
const IMPACT_POINTS = {
  Low: 10,
  Medium: 25,
  High: 50,
};

// Helper function to update eco score
const updateEcoScore = async (userId, habitId, oldStatus, newStatus) => {
  try {
    const habit = await Habit.findById(habitId);
    if (!habit) return;

    const user = await User.findById(userId);
    if (!user) return;

    const points = IMPACT_POINTS[habit.impactLevel] || 0;
    let scoreChange = 0;

    // Calculate score change
    if (oldStatus === "done" && newStatus === "missed") {
      scoreChange = -points; // Lost points
    } else if (oldStatus === "missed" && newStatus === "done") {
      scoreChange = points; // Gained points
    } else if (!oldStatus && newStatus === "done") {
      scoreChange = points; // New done entry
    } else if (!oldStatus && newStatus === "missed") {
      scoreChange = 0; // No points for missed
    }

    // Update user's eco score
    user.ecoScoreTotal = (user.ecoScoreTotal || 0) + scoreChange;
    await user.save();

    return scoreChange;
  } catch (error) {
    console.error("Error updating eco score:", error);
  }
};

// Helper function to calculate current streak
// Streak = consecutive days where ALL active habits were completed
const calculateStreak = async (userId) => {
  try {
    // Get all active habits for the user
    const activeHabits = await Habit.find({ userId, archived: false });
    if (activeHabits.length === 0) return 0;

    const habitIds = activeHabits.map((h) => h._id.toString());

    // Get all 'done' logs sorted by date
    const logs = await HabitLog.find({
      userId,
      status: "done",
    }).sort({ date: -1 });

    if (logs.length === 0) return 0;

    // Group logs by date and count habits completed per day
    const dateHabits = {};
    logs.forEach((log) => {
      const date = log.date;
      if (!dateHabits[date]) {
        dateHabits[date] = new Set();
      }
      dateHabits[date].add(log.habitId.toString());
    });

    // Get dates where ALL habits were completed
    const completeDates = [];
    for (const [date, completedHabitIds] of Object.entries(dateHabits)) {
      // Check if all active habits were completed on this date
      const allCompleted = habitIds.every((habitId) =>
        completedHabitIds.has(habitId)
      );
      if (allCompleted) {
        completeDates.push(date);
      }
    }

    if (completeDates.length === 0) return 0;

    // Sort dates descending
    completeDates.sort().reverse();

    // Calculate streak from today backwards
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split("T")[0];

    let streak = 0;
    let currentDate = new Date(today);

    // Start checking from today or yesterday if today not complete
    if (completeDates[0] !== todayStr) {
      // Today not complete yet, start from yesterday
      currentDate.setDate(currentDate.getDate() - 1);
    }

    // Count consecutive days
    for (let i = 0; i < completeDates.length; i++) {
      const checkDateStr = currentDate.toISOString().split("T")[0];

      if (completeDates[i] === checkDateStr) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  } catch (error) {
    console.error("Error calculating streak:", error);
    return 0;
  }
};

// Helper function to check and award badges
const checkAndAwardBadges = async (userId, streak) => {
  try {
    const milestones = [
      { days: 5, type: "streak-5" },
      { days: 15, type: "streak-15" },
      { days: 30, type: "streak-30" },
      { days: 60, type: "streak-60" },
    ];

    for (const milestone of milestones) {
      if (streak >= milestone.days) {
        // Check if badge already awarded
        const existingBadge = await Badge.findOne({
          userId,
          type: milestone.type,
        });

        if (!existingBadge) {
          await Badge.create({
            userId,
            type: milestone.type,
            value: milestone.days,
          });
          console.log(`Badge ${milestone.type} awarded to user ${userId}`);
        }
      }
    }
  } catch (error) {
    console.error("Error awarding badges:", error);
  }
};

// @desc    Create or update habit log
// @route   POST /api/logs
// @access  Private
export const createLog = async (req, res) => {
  try {
    const { habitId, date, status } = req.body;

    if (!habitId || !date || !status) {
      return res.status(400).json({
        success: false,
        message: "Please provide habitId, date, and status",
      });
    }

    // Verify habit belongs to user
    const habit = await Habit.findOne({ _id: habitId, userId: req.user.id });
    if (!habit) {
      return res.status(404).json({
        success: false,
        message: "Habit not found",
      });
    }

    // Check if log already exists
    let log = await HabitLog.findOne({
      userId: req.user.id,
      habitId,
      date,
    });

    const oldStatus = log ? log.status : null;

    if (log) {
      // Update existing log
      log.status = status;
      await log.save();
    } else {
      // Create new log
      log = await HabitLog.create({
        userId: req.user.id,
        habitId,
        date,
        status,
      });
    }

    // Update eco score
    await updateEcoScore(req.user.id, habitId, oldStatus, status);

    // --- Challenge Progress Update Logic ---
    if (status === "done") {
      // Find all active challenge progress records for this user and habit
      const todayStr = date;
      // Populate challengeId to access durationDays
      const progresses = await ChallengeProgress.find({
        userId: req.user.id,
        habitId,
        status: "active",
      }).populate("challengeId");
      for (const progress of progresses) {
        // Only increment if this day hasn't already been counted
        if (progress.lastCompletedDate !== todayStr) {
          progress.completedDays += 1;
          progress.lastCompletedDate = todayStr;
          // If completedDays reaches challenge duration, mark as completed
          if (
            progress.challengeId &&
            progress.challengeId.durationDays &&
            progress.completedDays >= progress.challengeId.durationDays
          ) {
            progress.status = "completed";
          }
          await progress.save();
        }
      }
    }

    // Calculate streak
    const streak = await calculateStreak(req.user.id);

    // Check and award badges
    await checkAndAwardBadges(req.user.id, streak);

    res.status(200).json({
      success: true,
      message: "Habit logged successfully",
      data: log,
      streak,
    });
  } catch (error) {
    console.error("Create log error:", error);
    res.status(500).json({
      success: false,
      message: "Server error creating log",
    });
  }
};

// @desc    Get logs by date
// @route   GET /api/logs/:date
// @access  Private
export const getLogsByDate = async (req, res) => {
  try {
    const logs = await HabitLog.find({
      userId: req.user.id,
      date: req.params.date,
    }).populate("habitId", "title category impactLevel");

    res.status(200).json({
      success: true,
      count: logs.length,
      data: logs,
    });
  } catch (error) {
    console.error("Get logs by date error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching logs",
    });
  }
};

// @desc    Get logs by habit
// @route   GET /api/logs/habit/:habitId
// @access  Private
export const getLogsByHabit = async (req, res) => {
  try {
    const logs = await HabitLog.find({
      userId: req.user.id,
      habitId: req.params.habitId,
    }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: logs.length,
      data: logs,
    });
  } catch (error) {
    console.error("Get logs by habit error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching logs",
    });
  }
};

// @desc    Get all logs for user
// @route   GET /api/logs
// @access  Private
export const getAllLogs = async (req, res) => {
  try {
    const logs = await HabitLog.find({ userId: req.user.id })
      .populate("habitId", "title category impactLevel")
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: logs.length,
      data: logs,
    });
  } catch (error) {
    console.error("Get all logs error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching logs",
    });
  }
};

// @desc    Get current streak
// @route   GET /api/logs/streak
// @access  Private
export const getCurrentStreak = async (req, res) => {
  try {
    const streak = await calculateStreak(req.user.id);

    res.status(200).json({
      success: true,
      data: { streak },
    });
  } catch (error) {
    console.error("Get streak error:", error);
    res.status(500).json({
      success: false,
      message: "Server error calculating streak",
    });
  }
};

// @desc    Get daily eco score for a specific date
// @route   GET /api/logs/daily-score/:date
// @access  Private
export const getDailyEcoScore = async (req, res) => {
  try {
    const { date } = req.params;
    const targetDate = date || new Date().toISOString().split("T")[0];

    console.log(
      `[getDailyEcoScore] Fetching score for user ${req.user.id} on date ${targetDate}`
    );

    // Get all logs for the specific date with status 'done'
    const doneLogs = await HabitLog.find({
      userId: req.user.id,
      date: targetDate,
      status: "done",
    }).populate("habitId", "impactLevel");

    console.log(`[getDailyEcoScore] Found ${doneLogs.length} completed habits`);

    // Calculate daily score - only from completed habits
    let dailyScore = 0;
    doneLogs.forEach((log) => {
      if (log.habitId && log.habitId.impactLevel) {
        const points = IMPACT_POINTS[log.habitId.impactLevel] || 0;
        dailyScore += points;
        console.log(
          `[getDailyEcoScore] Adding ${points} points from ${log.habitId.impactLevel} impact habit`
        );
      }
    });

    console.log(`[getDailyEcoScore] Total daily score: ${dailyScore}`);

    // If no habits were completed (all missed or none logged), score should be 0
    res.status(200).json({
      success: true,
      data: {
        date: targetDate,
        dailyScore: dailyScore, // This will be 0 if no 'done' logs exist
        completedHabits: doneLogs.length,
      },
    });
  } catch (error) {
    console.error("Get daily eco score error:", error);
    res.status(500).json({
      success: false,
      message: "Server error calculating daily eco score",
    });
  }
};
