import express from 'express'
import {
  getNotifications,
  sendNotification,
  markAsRead,
  markAllAsRead
} from '../controllers/notificationController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

// All routes are protected
router.use(protect)

router.route('/')
  .get(getNotifications)

router.post('/send', sendNotification)
router.put('/:id/read', markAsRead)
router.put('/read-all', markAllAsRead)

export default router
