import express from 'express'
import {
  createHabit,
  getHabits,
  getHabitById,
  updateHabit,
  deleteHabit
} from '../controllers/habitController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

// All routes are protected
router.use(protect)

router.route('/')
  .get(getHabits)
  .post(createHabit)

router.route('/:id')
  .get(getHabitById)
  .put(updateHabit)
  .delete(deleteHabit)

export default router
