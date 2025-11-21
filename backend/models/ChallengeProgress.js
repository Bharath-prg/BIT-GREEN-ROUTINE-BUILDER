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
  completedDays: {
    type: Number,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
})

// Compound index for user-challenge combination
challengeProgressSchema.index({ userId: 1, challengeId: 1 }, { unique: true })

const ChallengeProgress = mongoose.model('ChallengeProgress', challengeProgressSchema)

export default ChallengeProgress
