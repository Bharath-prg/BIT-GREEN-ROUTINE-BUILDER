import Notification from '../models/Notification.js'
import { sendEmail } from '../services/emailService.js'

// @desc    Get all notifications for user
// @route   GET /api/notifications
// @access  Private
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id })
      .sort({ sentAt: -1 })
      .limit(50)

    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications
    })
  } catch (error) {
    console.error('Get notifications error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error fetching notifications'
    })
  }
}

// @desc    Send notification
// @route   POST /api/notifications/send
// @access  Private
export const sendNotification = async (req, res) => {
  try {
    const { type, payload } = req.body

    if (!type) {
      return res.status(400).json({
        success: false,
        message: 'Please provide notification type'
      })
    }

    const notification = await Notification.create({
      userId: req.user.id,
      type,
      payload: payload || {},
      status: 'sent'
    })

    res.status(201).json({
      success: true,
      message: 'Notification sent successfully',
      data: notification
    })
  } catch (error) {
    console.error('Send notification error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error sending notification'
    })
  }
}

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      userId: req.user.id
    })

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      })
    }

    notification.read = true
    await notification.save()

    res.status(200).json({
      success: true,
      message: 'Notification marked as read',
      data: notification
    })
  } catch (error) {
    console.error('Mark as read error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error marking notification'
    })
  }
}

// @desc    Mark all notifications as read
// @route   PUT /api/notifications/read-all
// @access  Private
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { userId: req.user.id, read: false },
      { read: true }
    )

    res.status(200).json({
      success: true,
      message: 'All notifications marked as read'
    })
  } catch (error) {
    console.error('Mark all as read error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error marking notifications'
    })
  }
}
