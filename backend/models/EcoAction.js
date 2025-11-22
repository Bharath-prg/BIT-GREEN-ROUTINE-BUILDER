import mongoose from "mongoose";

const EcoActionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["water", "energy", "waste", "plastic", "travel", "food", "other"],
      required: true,
    },
    description: { type: String, required: true },
    impact: { type: String, enum: ["low", "medium", "high"], required: true },
    icon: { type: String }, // Optional: for future UI
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // For user-added actions
  },
  { timestamps: true }
);

export default mongoose.model("EcoAction", EcoActionSchema);
