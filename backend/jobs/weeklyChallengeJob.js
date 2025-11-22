import cron from "node-cron";
import Challenge from "../models/Challenge.js";

// Weekly challenge creation job - runs every Monday at 8 AM
export const weeklyChallengeJob = cron.schedule(
  "0 8 * * 1",
  async () => {
    try {
      const weekNumber = getISOWeek(new Date());
      const year = new Date().getFullYear();
      const title = `Weekly Challenge - Week ${weekNumber}`;
      const description = `Take on a new eco-friendly challenge for week ${weekNumber} of ${year}!`;
      const durationDays = 7;
      const type = "general";
      const category = "All";
      const icon = "📅";

      // Prevent duplicate for the same week
      const exists = await Challenge.findOne({
        title,
        durationDays,
        type,
        category,
        isActive: true,
      });
      if (exists) {
        console.log(
          `[Weekly Challenge] Challenge for week ${weekNumber} already exists.`
        );
        return;
      }

      await Challenge.create({
        title,
        description,
        durationDays,
        type,
        category,
        icon,
        isActive: true,
      });
      console.log(`[Weekly Challenge] Created: ${title}`);
    } catch (error) {
      console.error("[Weekly Challenge] Error:", error);
    }
  },
  { scheduled: false }
);

// Helper to get ISO week number
function getISOWeek(date) {
  const tmp = new Date(date.valueOf());
  const dayNum = date.getDay() || 7;
  tmp.setDate(tmp.getDate() + 4 - dayNum);
  const yearStart = new Date(tmp.getFullYear(), 0, 1);
  return Math.ceil(((tmp - yearStart) / 86400000 + 1) / 7);
}
