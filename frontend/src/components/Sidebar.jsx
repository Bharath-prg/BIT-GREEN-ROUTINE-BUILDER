import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import api from "../utils/api";

const Sidebar = () => {
  const location = useLocation();
  const [ecoScore, setEcoScore] = useState(0);

  useEffect(() => {
    fetchEcoScore();
  }, []);

  const fetchEcoScore = async () => {
    try {
      const userRes = await api.get("/auth/me");
      setEcoScore(userRes.data.data.ecoScoreTotal || 0);
    } catch (error) {
      console.error("Error fetching eco score:", error);
    }
  };

  const menuItems = [
    { path: "/dashboard", icon: "📊", label: "Dashboard" },
    { path: "/habits", icon: "✅", label: "My Habits" },
    { path: "/calendar", icon: "📅", label: "Calendar" },
    { path: "/challenges", icon: "🏆", label: "Challenges" },
    { path: "/analytics", icon: "📈", label: "Analytics" },
    { path: "/library", icon: "📚", label: "Eco Library" },
    { path: "/eco-store", icon: "🌳", label: "Carbon Offset" },
    { path: "/profile", icon: "👤", label: "Profile" },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 h-screen fixed left-0 top-0 shadow-lg flex flex-col z-20 transition-colors duration-300 border-r border-gray-200 dark:border-gray-700">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <Link to="/dashboard">
          <Logo size="md" showText={true} />
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition duration-200 ${
                  location.pathname === item.path
                    ? "bg-eco-green-100 dark:bg-eco-green-900/30 text-eco-green-700 dark:text-eco-green-400 font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="bg-eco-green-50 dark:bg-eco-green-900/30 rounded-lg p-4 transition-colors duration-300">
          <p className="text-sm font-semibold text-eco-green-700 dark:text-eco-green-400 transition-colors duration-300">
            🌍 Eco Score
          </p>
          <p className="text-2xl font-bold text-eco-green-600 dark:text-eco-green-400 transition-colors duration-300">
            {ecoScore.toLocaleString()}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-300 transition-colors duration-300">
            Keep up the great work!
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
