import User from '../models/User.js'

// @desc    Update user settings
// @route   PUT /api/user/settings
// @access  Private
export const updateSettings = async (req, res) => {
  try {
    const { emailReminders, darkMode } = req.body

    // Find user
    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    // Update settings
    if (emailReminders !== undefined) {
      user.settings.emailReminders = emailReminders
    }
    if (darkMode !== undefined) {
      user.settings.darkMode = darkMode
    }

    await user.save()

    res.status(200).json({
      success: true,
      message: 'Settings updated successfully',
      settings: user.settings
    })
  } catch (error) {
    console.error('Error updating settings:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update settings',
      error: error.message
    })
  }
}

// @desc    Get user settings
// @route   GET /api/user/settings
// @access  Private
export const getSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('settings')

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    res.status(200).json({
      success: true,
      settings: user.settings
    })
  } catch (error) {
    console.error('Error getting settings:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to get settings',
      error: error.message
    })
  }
}
