import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { getBadgeIcon } from "../utils/helpers";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [badges, setBadges] = useState([]);
  const [stats, setStats] = useState({
    totalHabits: 0,
    ecoScore: 0,
    memberSince: null,
  });
  const [settings, setSettings] = useState({
    emailReminders: true,
    darkMode: false,
    timezone: 'UTC'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);

      // Fetch user profile
      const userRes = await api.get("/auth/me");
      setUser(userRes.data.data);

      // Fetch user settings
      const settingsRes = await api.get("/user/settings");
      setSettings(settingsRes.data.settings || {
        emailReminders: true,
        darkMode: false,
        timezone: 'UTC'
      });

      // Fetch habits count
      const habitsRes = await api.get("/habits");
      const totalHabits = (habitsRes.data.data || []).filter(
        (h) => !h.archived
      ).length;

      setStats({
        totalHabits,
        ecoScore: userRes.data.data.ecoScoreTotal || 0,
        memberSince: new Date(userRes.data.data.createdAt).toLocaleDateString(
          "en-US",
          { month: "short", year: "numeric" }
        ),
      });

      // Fetch badges from backend
      const badgesRes = await api.get("/user/badges");
      setBadges(badgesRes.data.data || []);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSettingChange = async (key, value) => {
    try {
      const updatedSettings = { ...settings, [key]: value };
      setSettings(updatedSettings);

      // Update settings on backend
      await api.put("/user/settings", updatedSettings);
      
      console.log(`Setting ${key} updated to:`, value);
    } catch (error) {
      console.error("Error updating settings:", error);
      // Revert on error
      setSettings(settings);
    }
  };

  // Get initials from user name
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
          Profile & Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Card */}
      <div className="card">
        <div className="flex items-start space-x-6">
          <div className="w-24 h-24 bg-eco-green-200 dark:bg-eco-green-700 rounded-full flex items-center justify-center transition-colors duration-300">
            <span className="text-4xl font-bold text-eco-green-700 dark:text-eco-green-200">
              {user ? getInitials(user.name) : "U"}
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              {user?.name || "User"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
              {user?.email || "user@example.com"}
            </p>
            <div className="flex space-x-2 mt-3">
              <span className="badge badge-success">Eco Warrior</span>
            </div>
          </div>
          <button className="btn-secondary">Edit Profile</button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Member Since
          </p>
          <p className="text-xl font-bold text-gray-900 dark:text-white mt-2 transition-colors duration-300">
            {stats.memberSince || "N/A"}
          </p>
        </div>
        <div className="card text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Habits
          </p>
          <p className="text-xl font-bold text-eco-green-600 dark:text-eco-green-400 mt-2">
            {stats.totalHabits}
          </p>
        </div>
        <div className="card text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Badges Earned
          </p>
          <p className="text-xl font-bold text-purple-600 dark:text-purple-400 mt-2">
            {badges.length}
          </p>
        </div>
        <div className="card bg-gradient-to-br from-eco-green-500 to-eco-green-600 text-white text-center">
          <p className="text-sm opacity-90">🌍 Eco Score</p>
          <p className="text-3xl font-bold mt-2">
            {stats.ecoScore.toLocaleString()}
          </p>
          <p className="text-xs mt-1 opacity-75">Keep up the great work!</p>
        </div>
      </div>

      {/* Badges Collection */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
          🏆 Badges & Achievements
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.length === 0 && (
            <div className="col-span-full text-center text-gray-400 py-8">
              No badges earned yet. Complete challenges and streaks to earn
              badges!
            </div>
          )}
          {badges.map((badge, idx) => (
            <div
              key={badge._id || idx}
              className="p-4 rounded-lg text-center transition-colors duration-300 bg-eco-green-50 dark:bg-eco-green-900/30 border-2 border-eco-green-300 dark:border-eco-green-700"
            >
              <div className="text-4xl mb-2">{getBadgeIcon(badge.type)}</div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 capitalize">
                {badge.type.replace(/-/g, " ")}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(badge.awardedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
          ⚙️ Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Email Reminders
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Receive daily habit reminders via email
              </p>
            </div>
            <input 
              type="checkbox" 
              className="w-12 h-6" 
              checked={settings.emailReminders}
              onChange={(e) => handleSettingChange('emailReminders', e.target.checked)}
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Dark Mode
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enable dark mode theme
              </p>
            </div>
            <input 
              type="checkbox" 
              className="w-12 h-6"
              checked={settings.darkMode}
              onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Timezone
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Set your local timezone
              </p>
            </div>
            <select 
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
              value={settings.timezone}
              onChange={(e) => handleSettingChange('timezone', e.target.value)}
            >
              <option value="UTC">UTC (GMT)</option>
              <option value="America/New_York">EST (UTC-5)</option>
              <option value="America/Los_Angeles">PST (UTC-8)</option>
              <option value="Europe/London">London (GMT)</option>
              <option value="Asia/Kolkata">IST (UTC+5:30)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card border-2 border-red-200 bg-red-50">
        <h3 className="text-xl font-bold text-red-700 mb-4">⚠️ Danger Zone</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-red-700">Delete Account</p>
            <p className="text-sm text-red-600">
              Permanently delete your account and all data
            </p>
          </div>
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
