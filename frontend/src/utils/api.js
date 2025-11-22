import axios from "axios";

// API Base URL from environment variable
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  signup: (userData) => api.post("/auth/register", userData),
  logout: () => api.post("/auth/logout"),
  refreshToken: () => api.post("/auth/refresh"),
};

// Habits API
export const habitsAPI = {
  getAll: () => api.get("/habits"),
  getById: (id) => api.get(`/habits/${id}`),
  create: (habitData) => api.post("/habits", habitData),
  update: (id, habitData) => api.put(`/habits/${id}`, habitData),
  delete: (id) => api.delete(`/habits/${id}`),
  checkIn: (id) => api.post(`/habits/${id}/check-in`),
};

// Habit Logs API
export const habitLogsAPI = {
  getByHabitId: (habitId) => api.get(`/habit-logs/habit/${habitId}`),
  getByDate: (date) => api.get(`/habit-logs/date/${date}`),
};

// Challenges API
export const challengesAPI = {
  getAll: () => api.get("/challenges"),
  getById: (id) => api.get(`/challenges/${id}`),
  join: (id) => api.post(`/challenges/${id}/join`),
  getProgress: (id) => api.get(`/challenges/${id}/progress`),
  updateProgress: (id, progress) =>
    api.put(`/challenges/${id}/progress`, progress),
  getLeaderboard: () => api.get("/challenges/leaderboard"),
};

// Eco Actions API
export const ecoActionsAPI = {
  getAll: () => api.get("/eco-actions"),
  getByCategory: (category) => api.get(`/eco-actions/category/${category}`),
  search: (query) => api.get(`/eco-actions/search?q=${query}`),
};

// Notifications API
export const notificationsAPI = {
  getAll: () => api.get("/notifications"),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put("/notifications/read-all"),
};

// User Profile API
export const userAPI = {
  getProfile: () => api.get("/user/profile"),
  updateProfile: (userData) => api.put("/user/profile", userData),
  getStats: () => api.get("/user/stats"),
  getBadges: () => api.get("/user/badges"),
  updateSettings: (settings) => api.put("/user/settings", settings),
};

export default api;
