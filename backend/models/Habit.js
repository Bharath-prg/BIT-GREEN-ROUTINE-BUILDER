import mongoose from 'mongoose'

const habitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please provide a habit title'],
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['water', 'energy', 'waste', 'plastic', 'travel'],
    lowercase: true
  },
  frequency: {
    type: String,
    default: 'daily',
    enum: ['daily', 'weekly', 'custom']
  },
  reminderTime: {
    type: String,
    default: '09:00'
  },
  impactLevel: {
    type: String,
    default: 'medium',
    enum: ['low', 'medium', 'high']
  },
  archived: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Index for faster queries
habitSchema.index({ userId: 1, archived: 1 })

const Habit = mongoose.model('Habit', habitSchema)

export default Habit
