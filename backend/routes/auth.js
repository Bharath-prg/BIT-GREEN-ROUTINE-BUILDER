import express from 'express'
import {
  register,
  login,
  refreshAccessToken,
  getMe,
  logout,
  logoutAll
} from '../controllers/authController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

// ===== PUBLIC ROUTES =====

// User Registration
// POST /api/auth/register
// Body: { name, email, password, confirmPassword }
router.post('/register', register)

// User Login
// POST /api/auth/login
// Body: { email, password }
router.post('/login', login)

// Refresh Access Token
// POST /api/auth/refresh
// Body: { refreshToken }
router.post('/refresh', refreshAccessToken)

// ===== PROTECTED ROUTES =====

// Get Current User Profile
// GET /api/auth/me
// Headers: Authorization: Bearer <accessToken>
router.get('/me', protect, getMe)

// Logout Current Session
// POST /api/auth/logout
// Headers: Authorization: Bearer <accessToken>
// Body: { refreshToken } (optional)
router.post('/logout', protect, logout)

// Logout All Sessions
// POST /api/auth/logout-all
// Headers: Authorization: Bearer <accessToken>
router.post('/logout-all', protect, logoutAll)

export default router
