import express from 'express'
import {
  getChallenges,
  getChallengeById,
  joinChallenge,
  getChallengeProgress,
  updateChallengeProgress,
  createChallenge
} from '../controllers/challengeController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

// All routes are protected
router.use(protect)

router.route('/')
  .get(getChallenges)
  .post(createChallenge)

router.get('/:id', getChallengeById)
router.post('/join', joinChallenge)
router.get('/progress', getChallengeProgress)
router.put('/progress/:id', updateChallengeProgress)

export default router
