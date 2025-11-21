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
    required: true,
    default: 7
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  category: {
    type: String,
    enum: ['water', 'energy', 'waste', 'plastic', 'travel', 'general'],
    default: 'general'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Challenge = mongoose.model('Challenge', challengeSchema)

export default Challenge
