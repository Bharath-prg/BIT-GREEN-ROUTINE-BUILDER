import mongoose from 'mongoose'

const habitLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  habitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit',
    required: true
  },
  date: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['done', 'missed'],
    default: 'done'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Compound index to prevent duplicate logs for same habit on same day
habitLogSchema.index({ userId: 1, habitId: 1, date: 1 }, { unique: true })

const HabitLog = mongoose.model('HabitLog', habitLogSchema)

export default HabitLog
