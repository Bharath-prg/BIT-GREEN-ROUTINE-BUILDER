import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'

// Import routes
import authRoutes from './routes/auth.js'
import habitRoutes from './routes/habits.js'
import logRoutes from './routes/logs.js'
import challengeRoutes from './routes/challenges.js'
import notificationRoutes from './routes/notifications.js'

// Import cron jobs
import { startCronJobs } from './jobs/reminderJob.js'

// Load environment variables
dotenv.config()

// Initialize Express app
const app = express()

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Green Routine Builder API is running! 🌱',
    version: '1.0.0'
  })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/habits', habitRoutes)
app.use('/api/logs', logRoutes)
app.use('/api/challenges', challengeRoutes)
app.use('/api/notifications', notificationRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

// Start cron jobs
startCronJobs()

// Start server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📡 API: http://localhost:${PORT}`)
  console.log(`🌱 Environment: ${process.env.NODE_ENV}`)
})
