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
    enum: ['Water', 'Energy', 'Waste', 'Food', 'Transport', 'Plastic', 'Greenery']
  },
  frequency: {
    type: String,
    default: 'Daily',
    enum: ['Daily', 'Weekly', 'Monthly']
  },
  reminderTime: {
    type: String,
    default: '09:00'
  },
  reminderTimezone: {
    type: String,
    default: null
  },
  impactLevel: {
    type: String,
    default: 'Medium',
    enum: ['Low', 'Medium', 'High']
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
