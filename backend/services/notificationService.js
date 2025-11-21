import Notification from '../models/Notification.js'
import { sendEmail } from './emailService.js'

// Create in-app notification
export const createNotification = async (userId, type, payload) => {
  try {
    const notification = await Notification.create({
      userId,
      type,
      payload,
      status: 'sent',
      sentAt: new Date()
    })

    return { success: true, notification }
  } catch (error) {
    console.error('Error creating notification:', error)
    return { success: false, error: error.message }
  }
}

// Send notification with email (if user has email reminders enabled)
export const sendNotificationWithEmail = async (user, type, payload) => {
  try {
    // Create in-app notification
    const notificationResult = await createNotification(user._id, type, payload)

    if (!notificationResult.success) {
      throw new Error('Failed to create in-app notification')
    }

    // Send email if user has email reminders enabled
    if (user.settings?.emailReminders) {
      let emailTemplate = null
      let templateData = {}

      switch (type) {
        case 'reminder':
          emailTemplate = 'reminder'
          templateData = {
            userName: user.name,
            habitTitle: payload.habitTitle,
            reminderTime: payload.reminderTime
          }
          break

        case 'streak-milestone':
          emailTemplate = 'streakMilestone'
          templateData = {
            userName: user.name,
            habitTitle: payload.habitTitle,
            streakCount: payload.streakCount
          }
          break

        case 'challenge-joined':
          emailTemplate = 'challengeJoined'
          templateData = {
            userName: user.name,
            challengeTitle: payload.challengeTitle,
            durationDays: payload.durationDays
          }
          break

        case 'challenge-completed':
          emailTemplate = 'challengeCompleted'
          templateData = {
            userName: user.name,
            challengeTitle: payload.challengeTitle
          }
          break

        default:
          console.log(`No email template for notification type: ${type}`)
      }

      if (emailTemplate) {
        const emailResult = await sendEmail(user.email, emailTemplate, templateData)
        
        if (!emailResult.success) {
          console.error(`Failed to send email to ${user.email}:`, emailResult.error)
        }
      }
    }

    return {
      success: true,
      notification: notificationResult.notification,
      emailSent: user.settings?.emailReminders || false
    }
  } catch (error) {
    console.error('Error sending notification with email:', error)
    return { success: false, error: error.message }
  }
}

// Send bulk notifications (for challenges, milestones, etc.)
export const sendBulkNotifications = async (users, type, getPayloadFn) => {
  try {
    const results = []

    for (const user of users) {
      const payload = getPayloadFn(user)
      const result = await sendNotificationWithEmail(user, type, payload)
      results.push({
        userId: user._id,
        success: result.success,
        emailSent: result.emailSent
      })
    }

    return {
      success: true,
      total: results.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      results
    }
  } catch (error) {
    console.error('Error sending bulk notifications:', error)
    return { success: false, error: error.message }
  }
}

export default {
  createNotification,
  sendNotificationWithEmail,
  sendBulkNotifications
}
