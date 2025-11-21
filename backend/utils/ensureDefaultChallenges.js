import Challenge from "../models/Challenge.js";

const defaultChallenges = [
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

export const ensureDefaultChallenges = async () => {
  for (const c of defaultChallenges) {
    const exists = await Challenge.findOne({
      durationDays: c.durationDays,
      type: "streak",
    });
    if (!exists) {
      await Challenge.create(c);
      console.log(`Created default challenge: ${c.title}`);
    }
  }
};
