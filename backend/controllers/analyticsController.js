import HabitLog from '../models/HabitLog.js';
import Habit from '../models/Habit.js';

// GET /api/analytics/comparison?period=week|month
export const getComparisonAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;
    const period = req.query.period === 'month' ? 'month' : 'week';
    const now = new Date();
    let startCurrent, startPrev, endPrev;

    if (period === 'week') {
      // Start of this week (Monday)
      const day = now.getDay() || 7;
      startCurrent = new Date(now);
      startCurrent.setDate(now.getDate() - day + 1);
      startCurrent.setHours(0,0,0,0);
      // Start of previous week
      startPrev = new Date(startCurrent);
      startPrev.setDate(startCurrent.getDate() - 7);
      endPrev = new Date(startCurrent);
      endPrev.setDate(startCurrent.getDate() - 1);
    } else {
      // Start of this month
      startCurrent = new Date(now.getFullYear(), now.getMonth(), 1);
      // Start of previous month
      startPrev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      endPrev = new Date(now.getFullYear(), now.getMonth(), 0);
    }

    // Helper to format date as YYYY-MM-DD
    const fmt = d => d.toISOString().split('T')[0];

    // Fetch logs for current and previous period
    const logsCurrent = await HabitLog.find({
      userId,
      date: { $gte: fmt(startCurrent) }
    });
    const logsPrev = await HabitLog.find({
      userId,
      date: { $gte: fmt(startPrev), $lte: fmt(endPrev) }
    });

    // Calculate completion rates
    const doneCurrent = logsCurrent.filter(l => l.status === 'done').length;
    const totalCurrent = logsCurrent.length;
    const donePrev = logsPrev.filter(l => l.status === 'done').length;
    const totalPrev = logsPrev.length;
    const rateCurrent = totalCurrent ? (doneCurrent / totalCurrent) * 100 : 0;
    const ratePrev = totalPrev ? (donePrev / totalPrev) * 100 : 0;
    const diff = rateCurrent - ratePrev;

    // Category breakdown
    const habits = await Habit.find({ userId });
    const catMap = {};
    for (const h of habits) catMap[h._id] = h.category;
    const catStats = {};
    for (const log of logsCurrent) {
      const cat = catMap[log.habitId?.toString()] || 'Other';
      if (!catStats[cat]) catStats[cat] = { done: 0, total: 0 };
      catStats[cat].total++;
      if (log.status === 'done') catStats[cat].done++;
    }
    for (const log of logsPrev) {
      const cat = catMap[log.habitId?.toString()] || 'Other';
      if (!catStats[cat]) catStats[cat] = { done: 0, total: 0 };
      // Only add prev period stats if not already present
      catStats[cat].prevDone = (catStats[cat].prevDone || 0) + (log.status === 'done' ? 1 : 0);
      catStats[cat].prevTotal = (catStats[cat].prevTotal || 0) + 1;
    }

    // Build response
    res.json({
      success: true,
      data: {
        period,
        current: {
          start: fmt(startCurrent),
          done: doneCurrent,
          total: totalCurrent,
          rate: rateCurrent
        },
        previous: {
          start: fmt(startPrev),
          end: fmt(endPrev),
          done: donePrev,
          total: totalPrev,
          rate: ratePrev
        },
        diff,
        categories: Object.entries(catStats).map(([cat, stats]) => ({
          category: cat,
          current: {
            done: stats.done,
            total: stats.total,
            rate: stats.total ? (stats.done / stats.total) * 100 : 0
          },
          previous: {
            done: stats.prevDone || 0,
            total: stats.prevTotal || 0,
            rate: stats.prevTotal ? (stats.prevDone || 0) / stats.prevTotal * 100 : 0
          }
        }))
      }
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ success: false, message: 'Analytics error' });
  }
};
