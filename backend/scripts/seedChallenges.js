import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Challenge from "../models/Challenge.js";

dotenv.config();

const challenges = [
  {
    title: "5-Day Streak",
    description:
      "Build a 5-day habit streak to kickstart your sustainable routine.",
    durationDays: 5,
    type: "streak",
    category: "All",
    icon: "🔥",
  },
  {
    title: "15-Day Streak",
    description: "Keep the momentum going with a 15-day streak challenge.",
    durationDays: 15,
    type: "streak",
    category: "All",
    icon: "🚀",
  },
  {
    title: "30-Day Streak",
    description: "A 30-day streak to form long-lasting eco-friendly habits.",
    durationDays: 30,
    type: "streak",
    category: "All",
    icon: "🏆",
  },
  {
    title: "60-Day Streak",
    description: "Commit to a 60-day streak and become an Eco Master.",
    durationDays: 60,
    type: "streak",
    category: "All",
    icon: "👑",
  },
];

const seed = async () => {
  try {
    await connectDB();

    for (const c of challenges) {
      const exists = await Challenge.findOne({
        durationDays: c.durationDays,
        type: "streak",
      });
      if (exists) {
        console.log(`Skipping existing challenge: ${c.title}`);
        continue;
      }

      await Challenge.create(c);
      console.log(`Created challenge: ${c.title}`);
    }

    console.log("Seeding complete");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seed();
