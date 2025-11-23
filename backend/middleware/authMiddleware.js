import jwt from "jsonwebtoken";
import User from "../models/User.js";
import fs from "fs";

// Protect routes - verify JWT access token
export const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.slice(7); // Remove 'Bearer ' prefix
    }

    // Check if token exists
    if (!token) {
      const errorMsg = `[${new Date().toISOString()}] Auth error: Missing token. Headers: ${JSON.stringify(
        req.headers
      )}\n`;
      try {
        fs.appendFileSync("auth-error.log", errorMsg);
      } catch (e) {
        console.error("Failed to write auth error log:", e);
      }
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this route - missing token",
      });
    }

    try {
      // Verify access token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Verify user still exists
      const user = await User.findById(decoded.id);
      if (!user) {
        const errorMsg = `[${new Date().toISOString()}] Auth error: User not found for decoded id ${
          decoded.id
        }\n`;
        try {
          fs.appendFileSync("auth-error.log", errorMsg);
        } catch (e) {
          console.error("Failed to write auth error log:", e);
        }
        return res.status(401).json({
          success: false,
          message: "User no longer exists",
        });
      }
      // Attach user ID to request object
      req.user = {
        id: decoded.id
      };
      next();
    } catch (error) {
      const errorMsg = `[${new Date().toISOString()}] Auth error: ${
        error.name
      } - ${error.message}\nToken: ${token}\n`;
      try {
        fs.appendFileSync("auth-error.log", errorMsg);
      } catch (e) {
        console.error("Failed to write auth error log:", e);
      }
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Access token expired - please refresh",
          code: "TOKEN_EXPIRED",
        });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          success: false,
          message: "Invalid access token",
        });
      }
      throw error;
    }
  } catch (error) {
    const errorMsg = `[${new Date().toISOString()}] Auth middleware error: ${
      error.message
    }\n`;
    try {
      fs.appendFileSync("auth-error.log", errorMsg);
    } catch (e) {
      console.error("Failed to write auth error log:", e);
    }
    console.error("Auth middleware error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error in authentication",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Optional: Advanced role-based middleware
export const authorize = (...roles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Check if user has required role (extend User model as needed)
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Authorization error",
      });
    }
  };
};

export default protect;
