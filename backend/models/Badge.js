import mongoose from 'mongoose'

const badgeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['streak-5', 'streak-15', 'streak-30', 'streak-60', 'challenge-winner', 'eco-master']
  },
  value: {
    type: Number,
    default: 0
  },
  awardedAt: {
    type: Date,
    default: Date.now
  }
})

// Index for faster queries
badgeSchema.index({ userId: 1 })

const Badge = mongoose.model('Badge', badgeSchema)

export default Badge
