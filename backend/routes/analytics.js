import express from "express";
import { getComparisonAnalytics } from "../controllers/analyticsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/analytics/comparison?period=week|month
router.get("/comparison", protect, getComparisonAnalytics);

export default router;
