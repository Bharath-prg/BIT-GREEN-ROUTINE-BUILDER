import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['reminder', 'streak-warning', 'challenge-update', 'badge-earned', 'general']
  },
  payload: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  sentAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['sent', 'pending', 'failed'],
    default: 'pending'
  },
  read: {
    type: Boolean,
    default: false
  }
})

// Index for faster queries
notificationSchema.index({ userId: 1, read: 1 })

const Notification = mongoose.model('Notification', notificationSchema)

export default Notification
