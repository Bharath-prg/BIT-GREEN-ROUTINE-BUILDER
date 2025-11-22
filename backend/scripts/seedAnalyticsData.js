import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Habit from "../models/Habit.js";
import HabitLog from "../models/HabitLog.js";
import Challenge from "../models/Challenge.js";
import ChallengeProgress from "../models/ChallengeProgress.js";
import Badge from "../models/Badge.js";
import Notification from "../models/Notification.js";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

// Helper data
const categories = [
  "Plastic",
  "Transport",
  "Water",
  "Energy",
  "Waste",
  "Food",
  "Greenery",
];
const impactLevels = ["Low", "Medium", "High"];
const challengeTypes = ["streak", "general"];
const badgeTypes = [
  "streak-5",
  "streak-15",
  "streak-30",
  "challenge-winner",
  "eco-master",
];

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomName() {
  const first = [
    "Alex",
    "Sam",
    "Jordan",
    "Taylor",
    "Morgan",
    "Casey",
    "Jamie",
    "Robin",
    "Drew",
    "Sky",
    "Riley",
    "Avery",
    "Peyton",
    "Quinn",
    "Reese",
    "Sawyer",
    "Rowan",
    "Emery",
    "Finley",
    "Harper",
  ];
  const last = [
    "Green",
    "Blue",
    "Eco",
    "Leaf",
    "River",
    "Stone",
    "Hill",
    "Woods",
    "Lake",
    "Sky",
    "Sun",
    "Rain",
    "Cloud",
    "Forest",
    "Field",
    "Vale",
    "Dale",
    "Brook",
    "Grove",
    "Shore",
  ];
  return `${randomChoice(first)} ${randomChoice(last)}`;
}

function randomEmail(name, i) {
  return `${name.toLowerCase().replace(/ /g, "")}${i}@example.com`;
}

async function seed() {
  await mongoose.connect(MONGO_URI);
  await User.deleteMany({});
  await Habit.deleteMany({});
  await HabitLog.deleteMany({});
  await Challenge.deleteMany({});
  await ChallengeProgress.deleteMany({});
  await Badge.deleteMany({});
  await Notification.deleteMany({});

  // USERS
  const userCount = 50;
  let usersData = [];
  const saltRounds = 10;
  for (let i = 0; i < userCount; i++) {
    const name = randomName();
    const hashedPassword = await bcrypt.hash("Password123!", saltRounds);
    usersData.push({
      name,
      email: randomEmail(name, i),
      password: hashedPassword,
      ecoScoreTotal: randomInt(50, 500),
    });
  }
  const users = await User.insertMany(usersData);

  // HABITS
  let allHabits = [];
  for (const user of users) {
    let habits = [];
    for (let i = 0; i < 10; i++) {
      habits.push({
        title: `${randomChoice(["No", "Less", "More"])} ${randomChoice([
          "Plastic",
          "Car",
          "Shower",
          "Lights",
          "Meat",
          "Paper",
          "Waste",
        ])} ${randomChoice(["Use", "Trips", "Time", "Days"])}`,
        category: randomChoice(categories),
        impactLevel: randomChoice(impactLevels),
        userId: user._id,
      });
    }
    const userHabits = await Habit.insertMany(habits);
    allHabits = allHabits.concat(userHabits);
  }

  // LOGS (30 days per habit)
  const today = new Date();
  let allLogs = [];
  // For the first 5 users, make all habits 'done' for the last 7 days (to ensure streaks)
  const streakUserIds = users.slice(0, 5).map((u) => u._id.toString());
  for (const habit of allHabits) {
    const isStreakUser = streakUserIds.includes(habit.userId.toString());
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      let status;
      if (isStreakUser && i < 7) {
        status = "done";
      } else {
        status = randomChoice(["done", "missed"]);
      }
      allLogs.push({
        userId: habit.userId,
        habitId: habit._id,
        date: date.toISOString().split("T")[0],
        status,
      });
    }
  }
  await HabitLog.insertMany(allLogs);

  // CHALLENGES
  let challengesData = [];
  for (let i = 0; i < 10; i++) {
    challengesData.push({
      title: `${randomChoice([
        "Plastic Free",
        "Eco Commute",
        "Water Saver",
        "Energy Star",
        "Waste Warrior",
      ])} ${randomInt(1, 12)}`,
      description: "Auto-generated challenge",
      durationDays: randomInt(5, 30),
      type: randomChoice(challengeTypes),
      category: randomChoice(categories),
      icon: randomChoice(["🚫", "🚲", "💧", "⚡", "♻️"]),
      isActive: true,
    });
  }
  const challenges = await Challenge.insertMany(challengesData);

  // CHALLENGE PROGRESS
  let allProgress = [];
  for (const user of users) {
    for (const challenge of challenges) {
      const habit = await Habit.findOne({ userId: user._id });
      allProgress.push({
        userId: user._id,
        challengeId: challenge._id,
        habitId: habit._id,
        startDate: today.toISOString().split("T")[0],
        completedDays: randomInt(0, challenge.durationDays),
        status: randomChoice(["active", "completed", "failed"]),
        lastCompletedDate: today.toISOString().split("T")[0],
      });
    }
  }
  await ChallengeProgress.insertMany(allProgress);

  // BADGES
  let allBadges = [];
  for (const user of users) {
    for (let i = 0; i < randomInt(1, 4); i++) {
      allBadges.push({
        userId: user._id,
        type: randomChoice(badgeTypes),
        awardedAt: new Date(
          today.getTime() - randomInt(0, 30) * 24 * 60 * 60 * 1000
        ),
      });
    }
  }
  await Badge.insertMany(allBadges);

  // NOTIFICATIONS
  let allNotifications = [];
  for (const user of users) {
    for (let i = 0; i < randomInt(2, 6); i++) {
      allNotifications.push({
        userId: user._id,
        type: randomChoice([
          "reminder",
          "streak-warning",
          "challenge-update",
          "badge-earned",
          "general",
        ]),
        payload: { message: `Auto notification ${i + 1}` },
        read: Math.random() > 0.5,
        sentAt: new Date(
          today.getTime() - randomInt(0, 30) * 24 * 60 * 60 * 1000
        ),
        status: randomChoice(["sent", "pending", "failed"]),
      });
    }
  }
  await Notification.insertMany(allNotifications);

  console.log(
    "Seeded large dataset: users, habits, logs, challenges, progress, badges, notifications!"
  );
  process.exit();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
