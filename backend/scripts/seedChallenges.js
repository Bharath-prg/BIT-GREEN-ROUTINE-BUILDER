import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Challenge from '../models/Challenge.js'

dotenv.config()

const challenges = [
  {
    title: '5-Day Streak',
    description: 'Complete your habit for 5 consecutive days',
    durationDays: 5,
    type: 'streak',
    category: 'All',
    icon: '🔥',
    isActive: true
  },
  {
    title: '15-Day Streak',
    description: 'Complete your habit for 15 consecutive days',
    durationDays: 15,
    type: 'streak',
    category: 'All',
    icon: '⚡',
    isActive: true
  },
  {
    title: '30-Day Streak',
    description: 'Complete your habit for 30 consecutive days',
    durationDays: 30,
    type: 'streak',
    category: 'All',
    icon: '💪',
    isActive: true
  },
  {
    title: '60-Day Streak',
    description: 'Complete your habit for 60 consecutive days - Ultimate Challenge!',
    durationDays: 60,
    type: 'streak',
    category: 'All',
    icon: '🏆',
    isActive: true
  }
]

const seedChallenges = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected')

    // Clear existing challenges
    await Challenge.deleteMany({ type: 'streak' })
    console.log('Cleared existing streak challenges')

    // Insert new challenges
    await Challenge.insertMany(challenges)
    console.log('Streak challenges seeded successfully!')

    process.exit(0)
  } catch (error) {
    console.error('Error seeding challenges:', error)
    process.exit(1)
  }
}

seedChallenges()
