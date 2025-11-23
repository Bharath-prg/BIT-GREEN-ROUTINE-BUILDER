import cron from "node-cron";
import User from "../models/User.js";
import Habit from "../models/Habit.js";
import { sendNotificationWithEmail } from "../services/notificationService.js";
import { weeklyChallengeJob } from "./weeklyChallengeJob.js";

// Daily reminder job - runs every minute to check for habits due
export const dailyReminderJob = cron.schedule(
  "* * * * *",
  async () => {
    try {
      console.log(`[Reminder Job] Running at ${new Date().toISOString()}`);

      // Find all active habits with reminders enabled
      const habits = await Habit.find({
        archived: false,
        reminderTime: { $exists: true, $ne: null },
        reminderTimezone: { $exists: true, $ne: null }
      }).populate("userId", "name email settings");

      console.log(`[Reminder Job] Found ${habits.length} habits with reminders`);

      for (const habit of habits) {
        try {
          // Skip if user doesn't exist or email reminders disabled
          if (!habit.userId || !habit.userId.settings?.emailReminders) {
            continue;
          }

          // Get habit's reminder timezone (from device)
          const habitTimezone = habit.reminderTimezone;
          
          // Convert current server time to habit's timezone
          const localTimeStr = new Date().toLocaleString("en-US", {
            timeZone: habitTimezone,
            hour12: false
          });
          const localTime = new Date(localTimeStr);
          
          // Extract HH:MM from local time
          const currentHHMM = localTime.toTimeString().slice(0, 5);
          
          // Check if current time matches habit's reminder time
          if (currentHHMM === habit.reminderTime) {
            console.log(
              `[Reminder Job] ✓ Sending reminder for habit: "${habit.title}" to ${habit.userId.email} (${habitTimezone} time: ${currentHHMM})`
            );

            await sendNotificationWithEmail(habit.userId, "reminder", {
              habitId: habit._id,
              habitTitle: habit.title,
              reminderTime: habit.reminderTime,
              message: `Time to complete your eco-habit: ${habit.title}`,
            });
          }
        } catch (habitError) {
          console.error(
            `[Reminder Job] Error processing habit ${habit._id}:`,
            habitError.message
          );
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
