import express from 'express'
import {
  createLog,
  getLogsByDate,
  getLogsByHabit,
  getAllLogs
} from '../controllers/logController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

// All routes are protected
router.use(protect)

router.route('/')
  .post(createLog)
  .get(getAllLogs)

router.get('/:date', getLogsByDate)
router.get('/habit/:habitId', getLogsByHabit)

export default router
