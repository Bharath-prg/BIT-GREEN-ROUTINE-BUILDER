import HabitLog from '../models/HabitLog.js'
import Habit from '../models/Habit.js'

// @desc    Create habit log (daily check-in)
// @route   POST /api/logs
// @access  Private
export const createLog = async (req, res) => {
  try {
    const { habitId, date, status } = req.body

    // Validate input
    if (!habitId || !date) {
      return res.status(400).json({
        success: false,
        message: 'Please provide habitId and date'
      })
    }

    // Check if habit belongs to user
    const habit = await Habit.findOne({
      _id: habitId,
      userId: req.user.id
    })

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: 'Habit not found'
      })
    }

    // Check if log already exists for this date
    const existingLog = await HabitLog.findOne({
      userId: req.user.id,
      habitId,
      date
    })

    if (existingLog) {
      // Update existing log
      existingLog.status = status || 'done'
      await existingLog.save()

      return res.status(200).json({
        success: true,
        message: 'Habit log updated successfully',
        data: existingLog
      })
    }

    // Create new log
    const log = await HabitLog.create({
      userId: req.user.id,
      habitId,
      date,
      status: status || 'done'
    })

    res.status(201).json({
      success: true,
      message: 'Habit log created successfully',
      data: log
    })
  } catch (error) {
    console.error('Create log error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error creating log'
    })
  }
}

// @desc    Get logs by date
// @route   GET /api/logs/:date
// @access  Private
export const getLogsByDate = async (req, res) => {
  try {
    const { date } = req.params

    const logs = await HabitLog.find({
      userId: req.user.id,
      date
    }).populate('habitId', 'title category')

    res.status(200).json({
      success: true,
      count: logs.length,
      data: logs
    })
  } catch (error) {
    console.error('Get logs error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error fetching logs'
    })
  }
}

// @desc    Get logs by habit ID
// @route   GET /api/logs/habit/:habitId
// @access  Private
export const getLogsByHabit = async (req, res) => {
  try {
    const { habitId } = req.params

    const logs = await HabitLog.find({
      userId: req.user.id,
      habitId
    }).sort({ date: -1 })

    res.status(200).json({
      success: true,
      count: logs.length,
      data: logs
    })
  } catch (error) {
    console.error('Get logs by habit error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error fetching logs'
    })
  }
}

// @desc    Get all logs for user
// @route   GET /api/logs
// @access  Private
export const getAllLogs = async (req, res) => {
  try {
    const logs = await HabitLog.find({ userId: req.user.id })
      .populate('habitId', 'title category')
      .sort({ date: -1 })
      .limit(100)

    res.status(200).json({
      success: true,
      count: logs.length,
      data: logs
    })
  } catch (error) {
    console.error('Get all logs error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error fetching logs'
    })
  }
}
