import mongoose from 'mongoose'

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  durationDays: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['streak', 'general'],
    default: 'streak'
  },
  category: {
    type: String,
    enum: ['Water', 'Energy', 'Waste', 'Food', 'Transport', 'All'],
    default: 'All'
  },
  icon: {
    type: String,
    default: '🔥'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Challenge = mongoose.model('Challenge', challengeSchema)

export default Challenge
