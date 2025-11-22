import express from "express";
import {
  getEcoActions,
  addEcoAction,
  toggleSaveEcoAction,
  getSavedEcoActions,
} from "../controllers/ecoActionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public: Get all eco-actions (optionally filter by category)
router.get("/", getEcoActions);

// Protected: Add a new eco-action (admin/user)
router.post("/", protect, addEcoAction);

// Protected: Save/unsave an action for user
router.post("/save", protect, toggleSaveEcoAction);

// Protected: Get user's saved actions
router.get("/saved", protect, getSavedEcoActions);

export default router;
