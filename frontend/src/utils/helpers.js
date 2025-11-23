// Date formatting helpers
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

export const formatDateForAPI = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });
};

export const formatRelativeTime = (date) => {
  const now = new Date();
  const targetDate = new Date(date);
  
  const diff = now - targetDate;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return formatDate(date);
};

// Streak calculation
export const calculateStreak = (logs) => {
  if (!logs || logs.length === 0) return 0;

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Sort logs by date descending
  const sortedLogs = [...logs].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  for (let i = 0; i < sortedLogs.length; i++) {
    const logDate = new Date(sortedLogs[i].date);
    logDate.setHours(0, 0, 0, 0);

    const expectedDate = new Date(today);
    expectedDate.setDate(today.getDate() - i);

    if (
      logDate.getTime() === expectedDate.getTime() &&
      sortedLogs[i].status === "done"
    ) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

// Category helpers
export const categoryColors = {
  water: { bg: "bg-blue-100", text: "text-blue-800", icon: "💧" },
  energy: { bg: "bg-yellow-100", text: "text-yellow-800", icon: "⚡" },
  waste: { bg: "bg-green-100", text: "text-green-800", icon: "♻️" },
  plastic: { bg: "bg-red-100", text: "text-red-800", icon: "🚫" },
  travel: { bg: "bg-purple-100", text: "text-purple-800", icon: "🚗" },
};

export const getCategoryIcon = (category) => {
  return categoryColors[category]?.icon || "🌍";
};

// Badge helpers
export const getBadgeIcon = (badgeType) => {
  const badges = {
    "streak-5": "🔥",
    "streak-15": "⭐",
    "streak-30": "💎",
    "streak-60": "👑",
    "challenge-winner": "🏆",
    "eco-master": "🌟",
  };
  return badges[badgeType] || "🏅";
};

// Completion calculation
export const calculateCompletionRate = (total, completed) => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

// Week comparison helper
export const calculateWeekComparison = (currentWeek, previousWeek) => {
  if (previousWeek === 0) return 100;
  const change = ((currentWeek - previousWeek) / previousWeek) * 100;
  return Math.round(change);
};

// Calendar status helper
export const getCalendarDayStatus = (habits, logs) => {
  if (!habits || habits.length === 0) return "gray";

  const completedCount = logs.filter((log) => log.status === "done").length;
  const totalHabits = habits.length;

  if (completedCount === totalHabits) return "green";
  if (completedCount > 0) return "yellow";
  return "red";
};

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Local storage helpers
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      if (key === "token") return item || null;
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  },
  set: (key, value) => {
    try {
      if (key === "token") {
        localStorage.setItem(key, value);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  },
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  },
};

// Debounce helper
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Copy to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy:", error);
    return false;
  }
};

export default {
  formatDate,
  formatTime,
  formatRelativeTime,
  calculateStreak,
  categoryColors,
  getCategoryIcon,
  getBadgeIcon,
  calculateCompletionRate,
  calculateWeekComparison,
  getCalendarDayStatus,
  isValidEmail,
  storage,
  debounce,
  copyToClipboard,
};
