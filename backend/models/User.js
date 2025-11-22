import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
    maxlength: [100, "Name cannot be more than 100 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    index: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  refreshTokens: [
    {
      token: String,
      createdAt: {
        type: Date,
        default: Date.now,
        expires: 604800, // 7 days in seconds
      },
    },
  ],
  settings: {
    emailReminders: {
      type: Boolean,
      default: true,
    },
    darkMode: {
      type: Boolean,
      default: false,
    },
    timezone: {
      type: String,
      default: "UTC",
    },
  },
  ecoScoreTotal: {
    type: Number,
    default: 0,
    min: 0,
  },
  profilePicture: {
    type: String,
    default: null,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  lastLogin: {
    type: Date,
    default: null,
  },
  // User-saved eco-actions
  savedActions: [{ type: mongoose.Schema.Types.ObjectId, ref: "EcoAction" }],
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update timestamp before saving
userSchema.pre("save", function (next) {
  if (!this.isNew) {
    this.updatedAt = Date.now();
  }
  next();
});

// Hash password before saving (only if modified)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Add refresh token method
userSchema.methods.addRefreshToken = function (token) {
  this.refreshTokens.push({ token });
  return this.save();
};

// Remove refresh token method
userSchema.methods.removeRefreshToken = function (token) {
  this.refreshTokens = this.refreshTokens.filter((rt) => rt.token !== token);
  return this.save();
};

// Remove all refresh tokens (logout all devices)
userSchema.methods.removeAllRefreshTokens = function () {
  this.refreshTokens = [];
  return this.save();
};

// Verify if refresh token exists
userSchema.methods.hasRefreshToken = function (token) {
  return this.refreshTokens.some((rt) => rt.token === token);
};

// Update last login
userSchema.methods.updateLastLogin = function () {
  this.lastLogin = Date.now();
  return this.save();
};

const User = mongoose.model("User", userSchema);

export default User;
