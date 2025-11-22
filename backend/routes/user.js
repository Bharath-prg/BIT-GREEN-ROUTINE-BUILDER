import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getUserBadges } from "../controllers/badgeController.js";

const router = express.Router();

// GET /api/user/badges - Get all badges for the current user
router.get("/badges", protect, getUserBadges);

export default router;
