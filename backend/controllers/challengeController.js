import Challenge from "../models/Challenge.js";
import ChallengeProgress from "../models/ChallengeProgress.js";
import Habit from "../models/Habit.js";
import Badge from "../models/Badge.js";

// @desc    Get all challenges
// @route   GET /api/challenges
// @access  Private
export const getChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find({ isActive: true })
      .sort({ durationDays: 1 })
      .select("-__v");

    res.status(200).json({
      success: true,
      count: challenges.length,
      data: challenges,
    });
  } catch (error) {
    console.error("Get challenges error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching challenges",
    });
  }
};

// @desc    Get single challenge
// @route   GET /api/challenges/:id
// @access  Private
export const getChallengeById = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: "Challenge not found",
      });
    }

    res.status(200).json({
      success: true,
      data: challenge,
    });
  } catch (error) {
    console.error("Get challenge error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching challenge",
    });
  }
};

// @desc    Join a challenge for specific habit
// @route   POST /api/challenges/join
// @access  Private
export const joinChallenge = async (req, res) => {
  try {
    const { challengeId, habitId } = req.body;

    if (!challengeId || !habitId) {
      return res.status(400).json({
        success: false,
        message: "Please provide challengeId and habitId",
      });
    }

    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: "Challenge not found",
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

    // Check if already joined
    const existing = await ChallengeProgress.findOne({
      userId: req.user.id,
      challengeId,
      habitId,
      status: "active",
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Already joined this challenge for this habit",
      });
    }

    const today = new Date().toISOString().split("T")[0];
    const progress = await ChallengeProgress.create({
      userId: req.user.id,
      challengeId,
      habitId,
      startDate: today,
      completedDays: 0,
      status: "active",
    });

    const populated = await ChallengeProgress.findById(progress._id)
      .populate("challengeId")
      .populate("habitId", "title category");

    res.status(200).json({
      success: true,
      message: "Successfully joined challenge",
      data: populated,
    });
  } catch (error) {
    console.error("Join challenge error:", error);
    res.status(500).json({
      success: false,
      message: "Server error joining challenge",
    });
  }
};

// @desc    Get user's challenge progress
// @route   GET /api/challenges/progress
// @access  Private
export const getChallengeProgress = async (req, res) => {
  try {
    const progress = await ChallengeProgress.find({ userId: req.user.id })
      .populate("challengeId")
      .populate("habitId", "title category impactLevel")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: progress.length,
      data: progress,
    });
  } catch (error) {
    console.error("Get progress error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching progress",
    });
  }
};

// @desc    Update challenge progress
// @route   PUT /api/challenges/progress/:id
// @access  Private
export const updateChallengeProgress = async (req, res) => {
  try {
    const { completedDays } = req.body;

    const progress = await ChallengeProgress.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Progress record not found",
      });
    }

    progress.completedDays = completedDays;
    await progress.save();

    res.status(200).json({
      success: true,
      message: "Progress updated successfully",
      data: progress,
    });
  } catch (error) {
    console.error("Update progress error:", error);
    res.status(500).json({
      success: false,
      message: "Server error updating progress",
    });
  }
};

// @desc    Create new challenge (Admin/System or Custom)
// @route   POST /api/challenges
// @access  Private
export const createChallenge = async (req, res) => {
  try {
    const { title, description, durationDays, category, type, icon } = req.body;

    if (!title || !description || !durationDays) {
      return res.status(400).json({
        success: false,
        message: "Please provide title, description, and durationDays",
      });
    }

    // Prevent duplicate default streaks
    const exists = await Challenge.findOne({
      title,
      durationDays,
      type: type || "streak",
      category: category || "All",
    });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "A challenge with these details already exists.",
      });
    }

    const challenge = await Challenge.create({
      title,
      description,
      durationDays,
      category: category || "All",
      type: type || "streak",
      icon: icon || "🔥",
    });

    res.status(201).json({
      success: true,
      message: "Challenge created successfully",
      data: challenge,
    });
  } catch (error) {
    console.error("Create challenge error:", error);
    res.status(500).json({
      success: false,
      message: "Server error creating challenge",
    });
  }
};
