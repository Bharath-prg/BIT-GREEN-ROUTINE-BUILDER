import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import EcoAction from "../models/EcoAction.js";

const demoActions = [
  {
    title: "Use Reusable Shopping Bags",
    category: "plastic",
    description:
      "Replace single-use plastic bags with reusable cloth or jute bags.",
    impact: "high",
    icon: "🛍️",
  },
  {
    title: "Fix Leaky Faucets",
    category: "water",
    description: "A dripping faucet can waste over 3,000 gallons per year.",
    impact: "medium",
    icon: "🚰",
  },
  {
    title: "Switch to LED Bulbs",
    category: "energy",
    description: "LED bulbs use 75% less energy than traditional bulbs.",
    impact: "high",
    icon: "💡",
  },
  {
    title: "Start Composting",
    category: "waste",
    description:
      "Composting reduces landfill waste and creates natural fertilizer.",
    impact: "medium",
    icon: "🌱",
  },
  {
    title: "Take Public Transport",
    category: "travel",
    description:
      "Reduce your carbon footprint by using buses or trains instead of cars.",
    impact: "high",
    icon: "🚌",
  },
  {
    title: "Shorter Showers",
    category: "water",
    description:
      "Cutting your shower by 2 minutes saves up to 10 gallons each time.",
    impact: "medium",
    icon: "🚿",
  },
  {
    title: "Unplug Idle Electronics",
    category: "energy",
    description: "Electronics use power even when off. Unplug to save energy.",
    impact: "low",
    icon: "🔌",
  },
  {
    title: "Bring Your Own Bottle",
    category: "plastic",
    description: "Carry a reusable water bottle to avoid single-use plastics.",
    impact: "medium",
    icon: "🥤",
  },
  {
    title: "Meatless Mondays",
    category: "food",
    description: "Eating less meat reduces your environmental impact.",
    impact: "medium",
    icon: "🥗",
  },
  {
    title: "Recycle Paper",
    category: "waste",
    description: "Recycling paper saves trees and reduces landfill waste.",
    impact: "low",
    icon: "📄",
  },
];

async function seedEcoActions() {
  await mongoose.connect(process.env.MONGO_URI);
  await EcoAction.deleteMany({});
  await EcoAction.insertMany(demoActions);
  console.log("Eco-actions seeded!");
  await mongoose.disconnect();
}

seedEcoActions().catch((err) => {
  console.error(err);
  process.exit(1);
});
