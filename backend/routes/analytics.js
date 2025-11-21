import express from 'express';
import { getComparisonAnalytics } from '../controllers/analyticsController.js';

const router = express.Router();

// GET /api/analytics/comparison?period=week|month
router.get('/comparison', getComparisonAnalytics);

export default router;
