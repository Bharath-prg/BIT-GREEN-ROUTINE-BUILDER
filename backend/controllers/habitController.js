import Habit from '../models/Habit.js'
import ChallengeProgress from '../models/ChallengeProgress.js'

// @desc    Create new habit
// @route   POST /api/habits
// @access  Private
export const createHabit = async (req, res) => {
  try {
    const { title, category, frequency, reminderTime, impactLevel, reminderTimezone } = req.body

    // Validate required fields
    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title and category'
      })
    }

    const habit = await Habit.create({
      userId: req.user.id,
      title,
      category,
      frequency: frequency || 'Daily',
      reminderTime: reminderTime || '09:00',
      impactLevel: impactLevel || 'Medium',
      reminderTimezone: reminderTimezone || 'UTC'
    })

    res.status(201).json({
      success: true,
      message: 'Habit created successfully',
      data: habit
    })
  } catch (error) {
    console.error('Create habit error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error creating habit'
    })
  }
}

// @desc    Get all habits for logged-in user
// @route   GET /api/habits
// @access  Private
export const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ 
      userId: req.user.id,
      archived: false 
    }).sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: habits.length,
      data: habits
    })
  } catch (error) {
    console.error('Get habits error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error fetching habits'
    })
  }
}

// @desc    Get single habit by ID
// @route   GET /api/habits/:id
// @access  Private
export const getHabitById = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      userId: req.user.id
    })

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: 'Habit not found'
      })
    }

    res.status(200).json({
      success: true,
      data: habit
    })
  } catch (error) {
    console.error('Get habit error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error fetching habit'
    })
  }
}

// @desc    Update habit
// @route   PUT /api/habits/:id
// @access  Private
export const updateHabit = async (req, res) => {
  try {
    let habit = await Habit.findOne({
      _id: req.params.id,
      userId: req.user.id
    })

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: 'Habit not found'
      })
    }

    // Accept reminderTimezone from request body
    const updateData = { ...req.body };
    if (req.body.reminderTimezone) {
      updateData.reminderTimezone = req.body.reminderTimezone;
    }

    habit = await Habit.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )

    res.status(200).json({
      success: true,
      message: 'Habit updated successfully',
      data: habit
    })
  } catch (error) {
    console.error('Update habit error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error updating habit'
    })
  }
}

// @desc    Delete/Archive habit
// @route   DELETE /api/habits/:id
// @access  Private
export const deleteHabit = async (req, res) => {
  try {
    const { forceDelete } = req.query; // Check if force delete is requested

    const habit = await Habit.findOne({
      _id: req.params.id,
      userId: req.user.id
    })

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: 'Habit not found'
      })
    }

    // Check if habit has active streak challenges
    const activeChallenges = await ChallengeProgress.find({
      habitId: habit._id,
      userId: req.user.id,
      status: 'active'
    }).populate('challengeId')

    // If active challenges exist and not force delete, return warning
    if (activeChallenges.length > 0 && forceDelete !== 'true') {
      return res.status(409).json({
        success: false,
        message: 'This habit has active streak challenges',
        hasActiveChallenges: true,
        challenges: activeChallenges.map(cp => ({
          challengeId: cp.challengeId._id,
          challengeTitle: cp.challengeId.title,
          completedDays: cp.completedDays,
          durationDays: cp.challengeId.durationDays
        }))
      })
    }

    // If force delete, also delete/fail the associated challenges
    if (forceDelete === 'true' && activeChallenges.length > 0) {
      await ChallengeProgress.updateMany(
        {
          habitId: habit._id,
          userId: req.user.id,
          status: 'active'
        },
        {
          status: 'failed'
        }
      )
    }

    // Archive the habit
    habit.archived = true
    await habit.save()

    res.status(200).json({
      success: true,
      message: forceDelete === 'true' 
        ? 'Habit and associated challenges deleted successfully' 
        : 'Habit archived successfully',
      data: {}
    })
  } catch (error) {
    console.error('Delete habit error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error deleting habit'
    })
  }
}
