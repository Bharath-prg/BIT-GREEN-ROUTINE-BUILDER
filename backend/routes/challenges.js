import express from "express";
import {
  getChallenges,
  getChallengeById,
  joinChallenge,
  getChallengeProgress,
  updateChallengeProgress,
  createChallenge,
} from "../controllers/challengeController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes are protected
router.use(protect);

router.route("/").get(getChallenges).post(createChallenge);

// Specific routes MUST come before parameterized routes to avoid conflicts
router.post("/join", joinChallenge);
router.get("/progress", getChallengeProgress);
router.put("/progress/:id", updateChallengeProgress);

// Parameterized route must be last
router.get("/:id", getChallengeById);

export default router;
