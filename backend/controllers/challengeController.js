import Challenge from '../models/Challenge.js'
import ChallengeProgress from '../models/ChallengeProgress.js'

// @desc    Get all challenges
// @route   GET /api/challenges
// @access  Private
export const getChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find()
      .sort({ createdAt: -1 })
      .select('-__v')

    res.status(200).json({
      success: true,
      count: challenges.length,
      data: challenges
    })
  } catch (error) {
    console.error('Get challenges error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error fetching challenges'
    })
  }
}

// @desc    Get single challenge
// @route   GET /api/challenges/:id
// @access  Private
export const getChallengeById = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id)

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      })
    }

    res.status(200).json({
      success: true,
      data: challenge
    })
  } catch (error) {
    console.error('Get challenge error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error fetching challenge'
    })
  }
}

// @desc    Join a challenge
// @route   POST /api/challenges/join
// @access  Private
export const joinChallenge = async (req, res) => {
  try {
    const { challengeId } = req.body

    if (!challengeId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide challengeId'
      })
    }

    const challenge = await Challenge.findById(challengeId)

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      })
    }

    // Check if user already joined
    if (challenge.participants.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: 'You have already joined this challenge'
      })
    }

    // Add user to participants
    challenge.participants.push(req.user.id)
    await challenge.save()

    // Create progress tracker
    await ChallengeProgress.create({
      userId: req.user.id,
      challengeId: challenge._id,
      completedDays: 0
    })

    res.status(200).json({
      success: true,
      message: 'Successfully joined challenge',
      data: challenge
    })
  } catch (error) {
    console.error('Join challenge error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error joining challenge'
    })
  }
}

// @desc    Get user's challenge progress
// @route   GET /api/challenges/progress
// @access  Private
export const getChallengeProgress = async (req, res) => {
  try {
    const progress = await ChallengeProgress.find({ userId: req.user.id })
      .populate('challengeId', 'title description durationDays')
      .sort({ lastUpdated: -1 })

    res.status(200).json({
      success: true,
      count: progress.length,
      data: progress
    })
  } catch (error) {
    console.error('Get progress error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error fetching progress'
    })
  }
}

// @desc    Update challenge progress
// @route   PUT /api/challenges/progress/:id
// @access  Private
export const updateChallengeProgress = async (req, res) => {
  try {
    const { completedDays } = req.body

    const progress = await ChallengeProgress.findOne({
      _id: req.params.id,
      userId: req.user.id
    })

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: 'Progress record not found'
      })
    }

    progress.completedDays = completedDays
    progress.lastUpdated = Date.now()
    await progress.save()

    res.status(200).json({
      success: true,
      message: 'Progress updated successfully',
      data: progress
    })
  } catch (error) {
    console.error('Update progress error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error updating progress'
    })
  }
}

// @desc    Create new challenge (Admin/System)
// @route   POST /api/challenges
// @access  Private
export const createChallenge = async (req, res) => {
  try {
    const { title, description, durationDays, category } = req.body

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title and description'
      })
    }

    const startDate = new Date()
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + (durationDays || 7))

    const challenge = await Challenge.create({
      title,
      description,
      durationDays: durationDays || 7,
      startDate,
      endDate,
      category: category || 'general'
    })

    res.status(201).json({
      success: true,
      message: 'Challenge created successfully',
      data: challenge
    })
  } catch (error) {
    console.error('Create challenge error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error creating challenge'
    })
  }
}
