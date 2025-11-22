import React from "react";
import { useNavigate } from "react-router-dom";

const ActionCard = ({ action, saved, onToggleSave }) => {
  const navigate = useNavigate();

  const impactColors = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-green-100 text-green-800",
  };

  const categoryIcons = {
    water: "💧",
    energy: "⚡",
    waste: "♻️",
    plastic: "🚫",
    travel: "🚗",
    food: "🥗",
    other: "✨",
  };

  const handleSave = () => {
    if (onToggleSave) onToggleSave(action._id);
  };

  return (
    <div className="card hover:shadow-xl transition">
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">
          {categoryIcons[action.category] || "🌱"}
        </span>
        <button
          onClick={handleSave}
          className={`text-2xl transition ${
            saved ? "text-yellow-500" : "text-gray-300 hover:text-yellow-400"
          }`}
          title={saved ? "Unsave" : "Save"}
        >
          {saved ? "★" : "☆"}
        </button>
      </div>

      <h3 className="text-lg font-bold mb-2">{action.title}</h3>
      <p className="text-gray-600 text-sm mb-3">{action.description}</p>

      <div className="flex items-center justify-between">
        <span className={`badge ${impactColors[action.impact]} text-xs`}>
          {action.impact.toUpperCase()} Impact
        </span>
        <button
          className="text-eco-green-600 text-sm font-semibold hover:text-eco-green-700"
          onClick={() =>
            navigate("/habits", {
              state: {
                prefill: {
                  title: action.title,
                  category:
                    action.category.charAt(0).toUpperCase() +
                    action.category.slice(1),
                  impactLevel:
                    action.impact.charAt(0).toUpperCase() +
                    action.impact.slice(1),
                },
              },
            })
          }
        >
          Try this habit
        </button>
      </div>
    </div>
  );
};

export default ActionCard;
