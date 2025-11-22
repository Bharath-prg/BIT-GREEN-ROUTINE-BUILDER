import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getUserBadges } from "../controllers/badgeController.js";
import { updateSettings, getSettings } from "../controllers/userController.js";

const router = express.Router();

// GET /api/user/badges - Get all badges for the current user
router.get("/badges", protect, getUserBadges);

// GET /api/user/settings - Get user settings
router.get("/settings", protect, getSettings);

// PUT /api/user/settings - Update user settings
router.put("/settings", protect, updateSettings);

export default router;
