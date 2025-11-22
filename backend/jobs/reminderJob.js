import cron from "node-cron";
import User from "../models/User.js";
import Habit from "../models/Habit.js";
import { sendNotificationWithEmail } from "../services/notificationService.js";
import { weeklyChallengeJob } from "./weeklyChallengeJob.js";

// Helper to format time for comparison (HH:MM format)
const formatTime = (date) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

// Daily reminder job - runs every minute to check for habits due
export const dailyReminderJob = cron.schedule(
  "* * * * *",
  async () => {
    try {
      const currentTime = formatTime(new Date());
      console.log(`[Reminder Job] Running at ${currentTime}`);

      // Find all active habits with reminders set for current time
      const habits = await Habit.find({
        archived: false,
        reminderTime: { $exists: true, $ne: null },
      }).populate("userId", "name email settings");

      for (const habit of habits) {
        // Check if habit's reminder time matches current time (within 1 minute window)
        if (
          habit.reminderTime === currentTime ||
          habit.reminderTime ===
            `${currentTime.split(":")[0]}:${(
              parseInt(currentTime.split(":")[1]) - 1
            )
              .toString()
              .padStart(2, "0")}`
        ) {
          // Check if user has email reminders enabled
          if (habit.userId && habit.userId.settings?.emailReminders) {
            console.log(
              `[Reminder Job] Sending reminder for habit: ${habit.title} to user: ${habit.userId.name}`
            );

            await sendNotificationWithEmail(habit.userId, "reminder", {
              habitId: habit._id,
              habitTitle: habit.title,
              reminderTime: habit.reminderTime,
              message: `Time to complete your eco-habit: ${habit.title}`,
            });
          }
        }
      }
    } catch (error) {
      console.error("[Reminder Job] Error:", error);
    }
  },
  {
    scheduled: false, // Don't start automatically, will be started manually in server.js
  }
);

// Weekly digest job - runs every Sunday at 9 AM
export const weeklyDigestJob = cron.schedule(
  "0 9 * * 0",
  async () => {
    try {
      console.log("[Weekly Digest] Running weekly digest job");

      const users = await User.find({ "settings.emailReminders": true });

      for (const user of users) {
        // Calculate user's weekly stats (this is a placeholder - implement actual calculation)
        const weeklyStats = {
          habitsCompleted: 0,
          currentStreak: 0,
          ecoScoreGained: 0,
          challengesJoined: 0,
        };

        // Send weekly digest email
        await sendNotificationWithEmail(user, "weekly-digest", {
          userName: user.name,
          ...weeklyStats,
        });
      }

      console.log(`[Weekly Digest] Sent digest to ${users.length} users`);
    } catch (error) {
      console.error("[Weekly Digest] Error:", error);
    }
  },
  {
    scheduled: false,
  }
);

// Start all cron jobs
export const startCronJobs = () => {
  console.log("Starting cron jobs...");
  dailyReminderJob.start();
  weeklyDigestJob.start();
  weeklyChallengeJob.start();
  console.log("Cron jobs started successfully");
};

// Stop all cron jobs (useful for graceful shutdown)
export const stopCronJobs = () => {
  console.log("Stopping cron jobs...");
  dailyReminderJob.stop();
  weeklyDigestJob.stop();
  weeklyChallengeJob.stop();
  console.log("Cron jobs stopped");
};

export default {
  dailyReminderJob,
  weeklyDigestJob,
  startCronJobs,
  stopCronJobs,
};
