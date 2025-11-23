import { useState, useEffect, createContext, useContext } from "react";
import { authAPI } from "../utils/api";
import { storage } from "../utils/helpers";
import api from "../utils/api";

// Create Auth Context
const AuthContext = createContext(null);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = storage.get("token");
    const userData = storage.get("user");

    if (token && userData) {
      setUser({
        ...userData,
        settings: userData.settings || {}
      });
      setIsAuthenticated(true);
    }
    setLoading(false);
  };

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      const { token, user: userData } = response.data;

      // Store token and user data
      storage.set("token", token);
      storage.set("user", userData);

      setUser({
        ...userData,
        settings: userData.settings || {}
      });
      setIsAuthenticated(true);

      // Auto-detect and send device timezone for accurate reminders
      try {
        const deviceTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        await api.put("/user/settings", { timezone: deviceTimezone });
      } catch (tzError) {
        console.error("Failed to update timezone:", tzError);
      }

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await authAPI.signup(userData);
      const { token, user: newUser } = response.data;

      // Store token and user data
      storage.set("token", token);
      storage.set("user", newUser);

      setUser({
        ...newUser,
        settings: newUser.settings || {}
      });
      setIsAuthenticated(true);

      // Auto-detect and send device timezone for accurate reminders
      try {
        const deviceTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        await api.put("/user/settings", { timezone: deviceTimezone });
      } catch (tzError) {
        console.error("Failed to update timezone:", tzError);
      }

      return { success: true };
    } catch (error) {
      console.error("Signup error:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Signup failed",
      };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear storage and state regardless of API call result
      storage.remove("token");
      storage.remove("user");
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateUser = (userData) => {
    storage.set("user", userData);
    setUser({
      ...userData,
      settings: userData.settings || {}
    });
  };

  const refreshUser = async () => {
    try {
      const res = await api.get("/auth/me");
      const userData = res.data.data;
      storage.set("user", userData);
      setUser({
        ...userData,
        settings: userData.settings || {}
      });
    } catch (e) {
      console.error("Failed to refresh user", e);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    signup,
    logout,
    updateUser,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
