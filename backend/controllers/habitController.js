import Habit from '../models/Habit.js'

// @desc    Create new habit
// @route   POST /api/habits
// @access  Private
export const createHabit = async (req, res) => {
  try {
    const { title, category, frequency, reminderTime, impactLevel } = req.body

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
      frequency: frequency || 'daily',
      reminderTime: reminderTime || '09:00',
      impactLevel: impactLevel || 'medium'
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

    habit = await Habit.findByIdAndUpdate(
      req.params.id,
      req.body,
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

    // Archive instead of delete
    habit.archived = true
    await habit.save()

    res.status(200).json({
      success: true,
      message: 'Habit archived successfully',
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
