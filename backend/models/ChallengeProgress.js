import mongoose from 'mongoose'

const challengeProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  challengeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge',
    required: true
  },
  habitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit',
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  completedDays: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'failed'],
    default: 'active'
  },
  lastCompletedDate: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Compound index for user-challenge-habit combination
challengeProgressSchema.index({ userId: 1, challengeId: 1, habitId: 1 }, { unique: true })

const ChallengeProgress = mongoose.model('ChallengeProgress', challengeProgressSchema)

export default ChallengeProgress
