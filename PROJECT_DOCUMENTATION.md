# Green Routine Builder - Complete Project Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Architecture](#project-architecture)
4. [Backend Architecture](#backend-architecture)
5. [Frontend Architecture](#frontend-architecture)
6. [Database Schema](#database-schema)
7. [API Endpoints](#api-endpoints)
8. [Features & Functionality](#features--functionality)
9. [Workflow & User Journey](#workflow--user-journey)
10. [Authentication & Security](#authentication--security)
11. [Automated Jobs & Notifications](#automated-jobs--notifications)
12. [State Management](#state-management)
13. [Styling & Theming](#styling--theming)
14. [Setup & Installation](#setup--installation)
15. [Environment Variables](#environment-variables)

---

## 🌱 Project Overview

**Green Routine Builder** is a full-stack web application designed to help users build and track sustainable, eco-friendly habits. The application gamifies environmental consciousness through habit tracking, challenges, streaks, badges, and a comprehensive analytics system.

### Purpose
- Enable users to create and track eco-friendly habits across multiple categories (Water, Energy, Waste, Food, Transport, Plastic, Greenery)
- Motivate users through streaks, challenges, and a badge system
- Provide visual analytics and insights into sustainability progress
- Build community engagement through leaderboards
- Offer a curated library of eco-actions for inspiration

### Author
**Bharath PR**

### License
MIT

---

## 💻 Technology Stack

### Backend
- **Runtime**: Node.js with ES6 modules
- **Framework**: Express.js v4.18.2
- **Database**: MongoDB with Mongoose ODM v8.0.3
- **Authentication**: JWT (jsonwebtoken v9.0.2) with access/refresh token pattern
- **Password Hashing**: bcrypt v6.0.0 & bcryptjs v2.4.3
- **Email Service**: Nodemailer v6.9.7
- **Task Scheduling**: node-cron v3.0.3
- **Validation**: express-validator v7.0.1
- **Security**: CORS, bcrypt password hashing
- **Dev Tools**: nodemon v3.0.2

### Frontend
- **Framework**: React 18.2.0
- **Build Tool**: Vite 5.0.8
- **Routing**: React Router DOM v6.20.0
- **HTTP Client**: Axios v1.6.2
- **Charts**: Recharts v2.10.3
- **Styling**: Tailwind CSS v3.3.6 with PostCSS & Autoprefixer
- **Dark Mode**: CSS custom properties with system preference detection

### Development Environment
- **Module System**: ES Modules (type: "module")
- **Code Quality**: ESLint with React plugins
- **Package Manager**: npm

---

## 🏗 Project Architecture

### Directory Structure

```
BIT-GREEN-ROUTINE-BUILDER/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers & business logic
│   ├── jobs/            # Cron jobs (reminders, challenges)
│   ├── middleware/      # Authentication & validation
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API route definitions
│   ├── scripts/         # Seed data & utility scripts
│   ├── services/        # Email & notification services
│   ├── utils/           # Helper functions
│   ├── server.js        # Express server entry point
│   └── package.json     # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── auth/        # Login & Signup components
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # React Context providers
│   │   ├── hooks/       # Custom React hooks
│   │   ├── layout/      # Layout components
│   │   ├── pages/       # Page-level components
│   │   ├── router/      # Route configuration
│   │   ├── utils/       # Helper functions & API client
│   │   ├── App.jsx      # Root component
│   │   ├── main.jsx     # Application entry point
│   │   └── index.css    # Global styles with Tailwind
│   ├── index.html       # HTML template
│   ├── package.json     # Frontend dependencies
│   ├── vite.config.js   # Vite configuration
│   └── tailwind.config.js # Tailwind CSS configuration
│
├── LICENSE
└── logo-preview.html
```

---

## 🔧 Backend Architecture

### Server Configuration (server.js)
- **Port**: 5000 (default) or from environment
- **CORS**: Configured for frontend (http://localhost:5173)
- **Middleware**: JSON parsing, URL encoding, CORS
- **Database**: MongoDB connection with IPv4 forcing
- **Initialization**: Ensures default challenges on startup
- **Cron Jobs**: Auto-starts reminder and challenge jobs
- **Error Handling**: Centralized error middleware with development mode details

### Database Configuration (config/db.js)
```javascript
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 60000,
  socketTimeoutMS: 60000,
  family: 4  // Force IPv4
}
```

### Models (Mongoose Schemas)

#### 1. **User Model** (models/User.js)
```javascript
{
  name: String (required, max 100 chars),
  email: String (required, unique, validated),
  password: String (hashed, min 6 chars, select: false),
  refreshTokens: [{ token, createdAt }],  // 7-day TTL
  settings: {
    emailReminders: Boolean (default: true),
    darkMode: Boolean (default: false),
    timezone: String (default: UTC)
  },
  ecoScoreTotal: Number (default: 0),
  profilePicture: String,
  isEmailVerified: Boolean,
  lastLogin: Date,
  savedActions: [ObjectId ref EcoAction],
  createdAt: Date (immutable),
  updatedAt: Date
}
```
**Methods**:
- `comparePassword(enteredPassword)` - bcrypt comparison
- `addRefreshToken(token)` - Add new refresh token
- `removeRefreshToken(token)` - Remove specific token
- `removeAllRefreshTokens()` - Logout all devices
- `hasRefreshToken(token)` - Verify token exists
- `updateLastLogin()` - Update last login timestamp

**Hooks**:
- Pre-save: Updates timestamp, hashes password if modified

#### 2. **Habit Model** (models/Habit.js)
```javascript
{
  userId: ObjectId (ref User, required),
  title: String (required),
  category: Enum [Water, Energy, Waste, Food, Transport, Plastic, Greenery],
  frequency: Enum [Daily, Weekly, Monthly] (default: Daily),
  reminderTime: String (default: 09:00),
  reminderTimezone: String,
  impactLevel: Enum [Low, Medium, High] (default: Medium),
  archived: Boolean (default: false),
  createdAt: Date
}
```
**Indexes**: `userId + archived` for faster queries

#### 3. **HabitLog Model** (models/HabitLog.js)
```javascript
{
  userId: ObjectId (ref User, required),
  habitId: ObjectId (ref Habit, required),
  date: String (YYYY-MM-DD format, required),
  status: Enum [done, missed] (default: done),
  createdAt: Date
}
```
**Unique Constraint**: `userId + habitId + date` prevents duplicate logs

#### 4. **Challenge Model** (models/Challenge.js)
```javascript
{
  title: String (required),
  description: String (required),
  durationDays: Number (required),
  type: Enum [streak, general] (default: streak),
  category: Enum [Water, Energy, Waste, Food, Transport, Plastic, Greenery, All],
  icon: String (default: 🔥),
  isActive: Boolean (default: true),
  createdAt: Date
}
```

#### 5. **ChallengeProgress Model** (models/ChallengeProgress.js)
```javascript
{
  userId: ObjectId (ref User, required),
  challengeId: ObjectId (ref Challenge, required),
  habitId: ObjectId (ref Habit, required),
  startDate: String (YYYY-MM-DD),
  completedDays: Number (default: 0),
  status: Enum [active, completed, failed] (default: active),
  lastCompletedDate: String,
  createdAt: Date
}
```
**Unique Constraint**: `userId + challengeId + habitId`

#### 6. **Badge Model** (models/Badge.js)
```javascript
{
  userId: ObjectId (ref User, required),
  type: Enum [streak-5, streak-15, streak-30, streak-60, challenge-winner, eco-master],
  value: Number (default: 0),
  awardedAt: Date
}
```

#### 7. **EcoAction Model** (models/EcoAction.js)
```javascript
{
  title: String (required),
  category: Enum [water, energy, waste, plastic, travel, food, other],
  description: String (required),
  impact: Enum [low, medium, high],
  icon: String,
  createdBy: ObjectId (ref User),
  timestamps: true
}
```

#### 8. **Notification Model** (models/Notification.js)
```javascript
{
  userId: ObjectId (ref User, required),
  type: Enum [reminder, streak-warning, challenge-update, badge-earned, general],
  payload: Mixed (flexible data object),
  sentAt: Date (default: now),
  status: Enum [sent, pending, failed] (default: pending),
  read: Boolean (default: false)
}
```
**Index**: `userId + read` for efficient queries

### Controllers

#### **AuthController** (controllers/authController.js)
**Endpoints**:
- `register`: User registration with validation
  - Validates name (min 2 chars), email format, password (min 6 chars)
  - Checks for duplicate emails (409 conflict)
  - Hashes password with bcrypt
  - Generates access + refresh tokens
  - Returns user data without password

- `login`: User authentication
  - Validates credentials
  - Compares password with bcrypt
  - Updates last login timestamp
  - Returns access + refresh tokens

- `refreshAccessToken`: Token refresh
  - Validates refresh token from DB
  - Issues new access token
  - Maintains security without re-login

- `getMe`: Get current user profile
  - Protected route
  - Returns user data with settings

- `logout`: Single session logout
  - Removes specific refresh token

- `logoutAll`: All devices logout
  - Removes all refresh tokens

**Security Features**:
- Password strength validation
- Email format validation
- Refresh token rotation
- Token expiry (1h access, 7d refresh)

#### **HabitController** (controllers/habitController.js)
**Endpoints**:
- `createHabit`: Create new habit
  - Validates title & category
  - Stores device timezone for accurate reminders
  - Returns created habit

- `getHabits`: Get all user habits
  - Filters out archived habits
  - Sorted by creation date (newest first)

- `getHabitById`: Get single habit
  - Validates ownership
  - Returns 404 if not found

- `updateHabit`: Update habit details
  - Validates ownership
  - Supports timezone updates
  - Runs validators

- `deleteHabit`: Delete/Archive habit
  - Checks for active challenges (409 if found)
  - Force delete option removes habit + challenges
  - Returns challenge info for user decision

#### **LogController** (controllers/logController.js)
**Core Functions**:

1. **Eco Score System**:
   - Low Impact: 10 points
   - Medium Impact: 25 points
   - High Impact: 50 points
   - Updates user's total eco score on log creation/update

2. **Streak Calculation Algorithm**:
   - Counts consecutive days where ALL active habits completed
   - Checks from today backwards
   - Handles both current day and yesterday scenarios
   - Returns 0 if any habit missed in sequence

3. **Badge Award System**:
   - Auto-awards badges at milestones: 5, 15, 30, 60 days
   - Prevents duplicate badge awards
   - Triggered on log creation

**Endpoints**:
- `createLog`: Log habit completion/miss
  - Creates/updates log for date
  - Updates eco score
  - Updates challenge progress
  - Checks and awards badges
  - Calculates streak

- `getAllLogs`: Get all user logs
- `getLogsByDate`: Get logs for specific date
- `getLogsByHabit`: Get all logs for a habit
- `getCurrentStreak`: Get user's current streak
- `getDailyScore`: Get eco score for specific date

#### **ChallengeController** (controllers/challengeController.js)
**Endpoints**:
- `getChallenges`: Get all active challenges
- `getChallengeById`: Get specific challenge
- `joinChallenge`: Join challenge with a habit
  - Validates challenge & habit existence
  - Checks ownership
  - Prevents duplicate joins
  - Creates progress record

- `getChallengeProgress`: Get user's challenge progress
  - Populates challenge & habit details
  - Returns all user challenges (active/completed/failed)

- `updateChallengeProgress`: Update challenge progress
  - Auto-updates when habit logged
  - Marks completed when duration reached
  - Tracks consecutive days

- `createChallenge`: Create custom challenge
  - Allows user-created challenges
  - Validates duration & type

#### **AnalyticsController** (controllers/analyticsController.js)
**Endpoint**: `getComparisonAnalytics`
- **Period Options**: week or month
- **Week Calculation**: Monday to Sunday
- **Month Calculation**: 1st to last day
- **Returns**:
  - Current vs Previous period comparison
  - Completion rates
  - Percentage difference
  - Category-wise breakdown
  - Done/Total counts per category

**Error Logging**: Writes to `analytics-error.log` for debugging

#### **UserController** (controllers/userController.js)
**Endpoints**:
- `getSettings`: Get user settings
- `updateSettings`: Update user preferences
  - Email reminders toggle
  - Dark mode preference
  - Timezone updates

#### **EcoActionController** (controllers/ecoActionController.js)
**Endpoints**:
- `getEcoActions`: Get all eco-actions (filterable by category)
- `addEcoAction`: Add new eco-action
- `toggleSaveEcoAction`: Save/unsave action for user
- `getSavedEcoActions`: Get user's saved actions (populated)

#### **NotificationController** (controllers/notificationController.js)
**Endpoints**:
- `getNotifications`: Get user notifications (last 50)
- `sendNotification`: Create notification
- `markAsRead`: Mark single notification as read
- `markAllAsRead`: Mark all notifications as read

### Middleware

#### **authMiddleware.js**
**protect** function:
- Extracts JWT from Authorization header (Bearer token)
- Verifies token with JWT_SECRET
- Checks user still exists in database
- Attaches user ID to request object
- Handles token expiration (401 with TOKEN_EXPIRED code)
- Logs errors to `auth-error.log`

**authorize** function:
- Role-based access control (extensible)

### Routes

#### 1. **Auth Routes** (/api/auth)
```
POST   /register       - User registration
POST   /login          - User login
POST   /refresh        - Refresh access token
GET    /me             - Get current user (protected)
POST   /logout         - Logout current session (protected)
POST   /logout-all     - Logout all sessions (protected)
```

#### 2. **Habit Routes** (/api/habits)
```
All routes protected with JWT middleware
GET    /               - Get all user habits
POST   /               - Create new habit
GET    /:id            - Get specific habit
PUT    /:id            - Update habit
DELETE /:id            - Delete/Archive habit
```

#### 3. **Log Routes** (/api/logs)
```
GET    /               - Get all user logs
POST   /               - Create/Update log
GET    /streak         - Get current streak
GET    /daily-score/:date - Get daily eco score
GET    /:date          - Get logs for date
GET    /habit/:habitId - Get logs for habit
```

#### 4. **Challenge Routes** (/api/challenges)
```
GET    /               - Get all challenges
POST   /               - Create custom challenge
GET    /leaderboard    - Get challenge leaderboard
POST   /join           - Join challenge
GET    /progress       - Get user progress
PUT    /progress/:id   - Update progress
GET    /:id            - Get specific challenge
```

#### 5. **Notification Routes** (/api/notifications)
```
GET    /               - Get all notifications
POST   /send           - Send notification
PUT    /:id/read       - Mark as read
PUT    /read-all       - Mark all as read
```

#### 6. **Analytics Routes** (/api/analytics)
```
GET    /comparison?period=week|month - Get comparison analytics
```

#### 7. **Eco Actions Routes** (/api/eco-actions)
```
GET    /               - Get all actions
POST   /               - Add new action
POST   /save           - Toggle save action
GET    /saved          - Get saved actions
```

#### 8. **User Routes** (/api/user)
```
GET    /settings       - Get user settings
PUT    /settings       - Update settings
GET    /badges         - Get user badges
GET    /profile        - Get user profile
PUT    /profile        - Update profile
GET    /stats          - Get user stats
```

### Services

#### **emailService.js**
**Transporter Configuration**:
- Host: smtp.gmail.com (default)
- Port: 587 (TLS)
- Authentication: EMAIL_USER, EMAIL_PASS from .env
- Verification: Auto-verifies connection on creation

**Email Templates**:
1. **Reminder Email**:
   - Subject: Time for your eco-habit
   - Content: Habit name, scheduled time
   - CTA: Mark as Complete button

2. **Streak Milestone**:
   - Subject: Streak milestone reached
   - Content: Streak count, encouragement
   - CTA: View Your Progress

3. **Challenge Joined**:
   - Subject: You joined a challenge
   - Content: Challenge details, duration
   - CTA: View Challenge Details

4. **Challenge Completed**:
   - Subject: Challenge completed
   - Content: Congratulations, badge info
   - CTA: View Your Badges

**sendEmail Function**:
- Parameters: to, templateType, templateData
- Returns: success/error object
- Handles errors gracefully

#### **notificationService.js**
**sendNotificationWithEmail**:
- Creates in-app notification
- Optionally sends email if user has email reminders enabled
- Stores notification in database
- Integrates with emailService

### Jobs (Cron)

#### **reminderJob.js**
**dailyReminderJob**:
- **Schedule**: Every minute (`* * * * *`)
- **Function**:
  1. Finds all active habits with reminders
  2. Converts server time to habit's timezone
  3. Matches current time to reminderTime
  4. Sends email if match found
  5. Respects user email preferences

**weeklyDigestJob**:
- **Schedule**: Sunday 9 AM (`0 9 * * 0`)
- **Function**: Send weekly summary email

**startCronJobs**:
- Starts all cron jobs
- Called from server.js on startup

#### **weeklyChallengeJob.js**
- Manages weekly challenge rotations
- Auto-completes expired challenges

### Utilities

#### **ensureDefaultChallenges.js**
**Default Challenges**:
1. 5-Day Streak (🔥)
2. 15-Day Streak (🚀)
3. 30-Day Streak (🏆)
4. 60-Day Streak (👑)

**Function**: Creates challenges if they don't exist on server startup

---

## 🎨 Frontend Architecture

### Entry Point (main.jsx)
```jsx
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
```

### Context Providers

#### **ThemeContext.jsx**
- **State**: darkMode (boolean)
- **Storage**: localStorage + system preference detection
- **Methods**: toggleDarkMode()
- **Effects**: Adds/removes 'dark' class on document root
- **Initial Value**: Checks localStorage → system preference

#### **AuthProvider** (hooks/useAuth.jsx)
**State**:
- user: Current user object
- loading: Authentication check in progress
- isAuthenticated: Boolean flag

**Methods**:
- `login(credentials)`: Authenticate user, store tokens, detect timezone
- `signup(userData)`: Register user, store tokens, detect timezone
- `logout()`: Clear tokens and state
- `updateUser(userData)`: Update user in state and storage
- `refreshUser()`: Fetch latest user data from API
- `checkAuth()`: Validate existing tokens on mount

**Storage**: localStorage for token and user data

### Routing (router/AppRouter.jsx)

**Public Routes**:
- `/` - Landing page
- `/login` - Login page
- `/signup` - Signup page

**Protected Routes** (with MainLayout):
- `/dashboard` - Dashboard overview
- `/habits` - Habit management
- `/calendar` - Calendar view
- `/challenges` - Challenge system
- `/library` - Eco-action library
- `/eco-store` - Eco store (future feature)
- `/profile` - User profile
- `/notifications` - Notifications center
- `/leaderboard` - Challenge leaderboard
- `/analytics` - Analytics dashboard (lazy loaded)

### Pages

#### **Dashboard.jsx**
**Features**:
- 4 stat cards: Eco Score, Streak, Active Habits, Challenges
- Today's habit quick-check list
- Active challenges progress
- Recent notifications
- Real-time updates on habit check

**State Management**:
- Fetches user, habits, logs, challenges, notifications
- Calculates daily eco score
- Displays streak information
- Allows quick habit completion/miss

**UI Elements**:
- Gradient stat cards
- Habit cards with status indicators
- Challenge progress bars
- Notification list

#### **Habits.jsx**
**Features**:
- Create new habits modal
- Category filter tabs (All, Water, Energy, etc.)
- Habit cards grid
- Edit/Delete functionality
- Pre-fill from eco-action library

**Special Handling**:
- Delete dialog for habits with active challenges
- Option to delete both or keep challenges
- Timezone auto-detection for reminders

**Form Fields**:
- Title, Category, Frequency, Reminder Time, Impact Level

#### **Challenges.jsx**
**Tabs**:
1. Available Challenges - Join new challenges
2. Active Challenges - In-progress challenges
3. Completed Challenges - Finished challenges

**Features**:
- Create custom challenges
- Select habit for challenge
- Progress tracking
- Visual progress bars
- Challenge filtering

**Challenge Creation**:
- Title, Description, Duration (days), Icon, Category

#### **Library.jsx**
**Features**:
- Category filter buttons (Water, Energy, Waste, etc.)
- Search functionality
- Action cards with save/unsave
- "Try this habit" button (prefills habit form)
- Saved actions section

**Action Card Info**:
- Title, Description, Category, Impact Level
- Save to favorites
- Direct conversion to habit

#### **Profile.jsx**
**Sections**:
1. **Profile Card**:
   - Avatar with initials
   - Name, Email
   - Member since date
   - Edit profile button

2. **Stats Overview**:
   - Total Eco Score
   - Active Habits
   - Member Since

3. **Badges**:
   - Grid of earned badges
   - Badge icons and descriptions
   - Empty state

4. **Settings**:
   - Email Reminders toggle
   - Dark Mode toggle
   - Instantly synced

#### **Calendar.jsx**
**Features**:
- Month view calendar grid
- Color-coded completion status
- Perfect days counter
- Completion rate percentage
- Longest streak display

**Calendar Legend**:
- Green: All habits completed
- Yellow: Some habits completed
- Red: No habits completed
- Gray: Future date

#### **Analytics.jsx** (Lazy Loaded)
**Features**:
- Week/Month toggle
- Current vs Previous period comparison
- Completion rate charts (Recharts)
- Category breakdown
- Trend analysis
- Performance insights

#### **Landing.jsx**
**Sections**:
- Hero with CTA
- Features showcase
- How it works
- Benefits
- Call to action

#### **Login.jsx & Signup.jsx**
**Features**:
- Form validation
- Error messaging
- Loading states
- Dark mode toggle
- Logo and branding
- Link to opposite page

### Components

#### **HabitCard.jsx**
**Display**:
- Habit title and category
- Category icon and color
- Impact level badge
- Frequency
- Created date

**Actions**:
- View Details modal
- Edit habit
- Delete habit

**Details Modal**:
- Total days tracked
- Completed vs Missed
- Completion rate
- Current streak
- Historical data

#### **ChallengeCard.jsx**
**Display**:
- Challenge title and icon
- Description
- Duration
- Participants count

**Progress** (if active):
- Progress bar
- Days completed / Total days
- Percentage

**Actions**:
- Join challenge
- View details

#### **ActionCard.jsx**
**Display**:
- Category icon
- Title and description
- Impact badge (High/Medium/Low)

**Actions**:
- Save/Unsave (star icon)
- "Try this habit" - navigates to habits page with prefilled form

#### **CalendarGrid.jsx**
**Rendering**:
- Month header
- Day cells (7x5/6 grid)
- Previous/Next month navigation
- Color coding based on completion

#### **Navbar.jsx**
**Elements**:
- Page title
- Search bar
- Notification bell with unread count
- User avatar dropdown
- Dark mode toggle

#### **Sidebar.jsx**
**Navigation Links**:
- Dashboard
- My Habits
- Calendar
- Challenges
- Library
- Analytics
- Leaderboard
- Profile
- Logout

**Features**:
- Active link highlighting
- Icons for each section
- Logo at top

#### **Logo.jsx**
**Props**: size, showText
**Variants**: Small, medium, large
**Usage**: Consistent branding across app

#### **DarkModeToggle.jsx**
**Function**: Toggle between light/dark themes
**Icon**: Sun/Moon based on current theme

#### **EcoDoodles.jsx**
**Variants**: dashboard, minimal
**Purpose**: Background decorative SVG elements

#### **NotificationBell.jsx**
**Features**:
- Unread count badge
- Dropdown list
- Mark as read
- Click to navigate

#### **ConfirmDialog.jsx**
**Usage**: Habit deletion confirmation
**Props**: title, message, onConfirm, onCancel

#### **HabitDeleteDialog.jsx**
**Special Dialog**: Shows when deleting habit with active challenges
**Options**:
- Delete both habit and challenges
- Cancel deletion

### Utilities

#### **api.js**
**Axios Instance**:
- Base URL: VITE_API_URL or http://localhost:5000/api
- Headers: Content-Type: application/json

**Request Interceptor**:
- Adds Authorization: Bearer {token}

**Response Interceptor**:
- Handles 401 (clears token, redirects to login)

**API Modules**:
- authAPI: login, signup, logout, refresh
- habitsAPI: CRUD operations
- habitLogsAPI: getByHabitId, getByDate
- challengesAPI: CRUD, join, progress, leaderboard
- ecoActionsAPI: getAll, getByCategory, search
- notificationsAPI: getAll, markAsRead, markAllAsRead
- userAPI: profile, stats, badges, settings

#### **helpers.js**
**Date Functions**:
- `formatDate(date)`: Long format (e.g., January 1, 2024)
- `formatDateForAPI(date)`: YYYY-MM-DD
- `formatTime(date)`: HH:MM AM/PM
- `formatRelativeTime(date)`: "5m ago", "2h ago", etc.

**Calculation Functions**:
- `calculateStreak(logs)`: Consecutive days calculation
- `getCategoryIcon(category)`: Returns emoji for category
- `getBadgeIcon(badgeType)`: Returns emoji for badge

**Storage Object**:
- Wrapper for localStorage
- Methods: get, set, remove

---

## 🗄 Database Schema

### Collections

1. **users**
   - Stores user accounts, settings, eco scores
   - Indexed: email (unique)

2. **habits**
   - User's eco-friendly habits
   - Indexed: userId + archived

3. **habitlogs**
   - Daily habit completion records
   - Unique: userId + habitId + date
   - Indexed: userId + habitId + date

4. **challenges**
   - Available challenges (streak-based)
   - Indexed: durationDays + type

5. **challengeprogresses**
   - User's challenge participation
   - Unique: userId + challengeId + habitId

6. **badges**
   - User achievements
   - Indexed: userId

7. **ecoactions**
   - Library of eco-friendly actions
   - Indexed: category

8. **notifications**
   - User notifications
   - Indexed: userId + read
   - TTL: Auto-cleanup after 30 days (optional)

---

## 🔐 Authentication & Security

### JWT Token Strategy

**Access Token**:
- Lifetime: 1 hour (configurable)
- Payload: `{ id: userId }`
- Secret: JWT_SECRET
- Usage: API authentication

**Refresh Token**:
- Lifetime: 7 days (configurable)
- Payload: `{ id: userId, type: 'refresh' }`
- Secret: JWT_REFRESH_SECRET
- Storage: Database (array in User model)
- Auto-expires: MongoDB TTL index

### Authentication Flow

1. **Registration/Login**:
   - User provides credentials
   - Server validates and creates/finds user
   - Generates access + refresh tokens
   - Stores refresh token in DB
   - Returns both tokens to client
   - Client stores in localStorage

2. **API Requests**:
   - Client sends: `Authorization: Bearer {accessToken}`
   - Server validates token
   - Allows/denies request

3. **Token Refresh**:
   - Access token expires (1h)
   - Client sends refresh token
   - Server validates from DB
   - Issues new access token
   - Client updates token

4. **Logout**:
   - Single: Removes one refresh token
   - All devices: Removes all refresh tokens

### Security Measures

- **Password Hashing**: bcrypt with salt rounds (10)
- **Password Requirements**: Minimum 6 characters
- **Email Validation**: Regex pattern matching
- **CORS**: Configured for specific frontend origin
- **Token Expiry**: Short-lived access tokens
- **Refresh Token Rotation**: Optional implementation
- **Database Indexes**: Prevent duplicate emails
- **Error Logging**: Separate log files for auth/analytics errors
- **Environment Variables**: Sensitive data in .env

---

## 📊 Features & Functionality

### 1. Habit Management
- **Create**: Define eco-friendly habits with categories
- **Track**: Daily completion/miss logging
- **Edit**: Update habit details anytime
- **Delete**: Archive or permanently remove
- **Filter**: Category-based filtering
- **Reminders**: Time-based email notifications

### 2. Streak System
- **Calculation**: Consecutive days with ALL habits completed
- **Display**: Current streak on dashboard
- **Motivation**: Visual streak counters
- **Badges**: Auto-award at milestones (5, 15, 30, 60 days)

### 3. Challenge System
- **Types**: Streak-based challenges
- **Duration**: 5, 15, 30, 60 days
- **Custom**: Users can create own challenges
- **Progress**: Real-time tracking per challenge
- **Status**: Active, Completed, Failed
- **Leaderboard**: Compare with other users

### 4. Eco Score System
- **Points**:
  - Low Impact: 10 points
  - Medium Impact: 25 points
  - High Impact: 50 points
- **Accumulation**: Lifetime total eco score
- **Daily Score**: Points earned per day
- **Display**: Dashboard and profile

### 5. Badge System
- **Streak Badges**:
  - 🔥 5-Day Streak
  - ⭐ 15-Day Streak
  - 💎 30-Day Streak
  - 👑 60-Day Streak
- **Special Badges**:
  - 🏆 Challenge Winner
  - 🌟 Eco Master
- **Auto-Award**: Triggered on log creation
- **Prevention**: No duplicate badges

### 6. Calendar Visualization
- **Month View**: Full month calendar grid
- **Color Coding**:
  - Green: Perfect day (all habits done)
  - Yellow: Partial completion
  - Red: No completion
- **Stats**: Perfect days, completion rate, longest streak
- **Navigation**: Previous/Next month

### 7. Analytics Dashboard
- **Period Comparison**: Week vs Week, Month vs Month
- **Metrics**:
  - Completion rates
  - Percentage change
  - Category breakdown
- **Charts**: Line/Bar charts with Recharts
- **Insights**: Performance trends

### 8. Eco-Action Library
- **Categories**: Water, Energy, Waste, Plastic, Travel, Food, Other
- **Search**: Filter by keyword
- **Save**: Bookmark favorite actions
- **Convert**: Create habit from action
- **Impact Levels**: High, Medium, Low

### 9. Notification System
- **Types**:
  - Reminders: Habit due notifications
  - Streak Warnings: About to lose streak
  - Challenge Updates: Progress milestones
  - Badge Earned: New achievements
  - General: System notifications
- **Delivery**: In-app + Email (optional)
- **Management**: Mark as read, view all

### 10. Settings & Preferences
- **Email Reminders**: Toggle on/off
- **Dark Mode**: System preference + manual toggle
- **Timezone**: Auto-detected for accurate reminders
- **Profile**: Name, email, avatar

### 11. Leaderboard
- **Rankings**: By eco score
- **Challenges**: Challenge-specific leaderboards
- **Community**: Engage with other users

---

## 🔄 Workflow & User Journey

### New User Flow

1. **Landing Page**:
   - View features and benefits
   - Click "Get Started" or "Sign Up"

2. **Registration**:
   - Enter name, email, password
   - System auto-detects timezone
   - Redirects to dashboard

3. **Dashboard** (First Visit):
   - Zero stats (no habits yet)
   - Empty state with "Create Habit" CTA

4. **Create First Habit**:
   - Navigate to Habits page
   - Click "+ Add New Habit"
   - Fill form: title, category, reminder time, impact
   - Habit created

5. **Daily Routine**:
   - Receive email reminder at scheduled time
   - Visit dashboard
   - Check off habit as done/missed
   - Earn eco points
   - Streak increments (if all habits done)

6. **Join Challenge**:
   - Navigate to Challenges
   - Browse available challenges
   - Click "Join Challenge"
   - Select habit for challenge
   - Challenge progress starts

7. **Earn Badges**:
   - Complete habits daily
   - Reach 5-day streak → 🔥 Badge awarded
   - Complete challenge → 🏆 Badge awarded
   - View badges on profile

8. **Explore Library**:
   - Browse eco-actions
   - Save interesting actions
   - Click "Try this habit" to create habit

9. **Track Progress**:
   - View calendar for visual history
   - Check analytics for trends
   - Compare week-over-week performance

### Daily User Flow

1. **Morning**:
   - Receive email reminder for habits
   - Check notification bell

2. **Throughout Day**:
   - Complete eco-friendly actions
   - Log habit on mobile/desktop

3. **Evening**:
   - Review dashboard stats
   - Check streak status
   - Log any missed habits

4. **Weekly**:
   - Review analytics dashboard
   - Compare with previous week
   - Adjust habits if needed

---

## 🛠 Setup & Installation

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local or Atlas)
- npm or yarn
- Gmail account (for email service)

### Backend Setup

1. **Navigate to backend**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create .env file**:
   ```env
   # Server
   NODE_ENV=development
   PORT=5000
   
   # Database
   MONGO_URI=mongodb://localhost:27017/green-routine-builder
   # or MongoDB Atlas connection string
   
   # JWT
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=1h
   JWT_REFRESH_SECRET=your-refresh-secret-key-here
   JWT_REFRESH_EXPIRE=7d
   
   # Email (Gmail)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-specific-password
   
   # Frontend URL
   CLIENT_URL=http://localhost:5173
   FRONTEND_URL=http://localhost:5173
   ```

4. **Gmail App Password Setup**:
   - Go to Google Account settings
   - Security → 2-Step Verification
   - App passwords → Generate new
   - Use generated password in EMAIL_PASS

5. **Start server**:
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

6. **Seed default challenges** (optional):
   ```bash
   npm run seed:challenges
   ```

### Frontend Setup

1. **Navigate to frontend**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create .env file**:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Access application**:
   - Open browser: http://localhost:5173

### Production Build

**Frontend**:
```bash
cd frontend
npm run build
npm run preview  # Test build locally
```

**Backend**:
```bash
cd backend
NODE_ENV=production npm start
```

---

## 🌍 Environment Variables

### Backend (.env)

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| NODE_ENV | Environment mode | development | No |
| PORT | Server port | 5000 | No |
| MONGO_URI | MongoDB connection string | - | Yes |
| JWT_SECRET | Access token secret | - | Yes |
| JWT_EXPIRE | Access token expiry | 1h | No |
| JWT_REFRESH_SECRET | Refresh token secret | - | Yes |
| JWT_REFRESH_EXPIRE | Refresh token expiry | 7d | No |
| EMAIL_HOST | SMTP host | smtp.gmail.com | No |
| EMAIL_PORT | SMTP port | 587 | No |
| EMAIL_USER | Email account | - | Yes |
| EMAIL_PASS | Email password/app password | - | Yes |
| CLIENT_URL | Frontend URL for CORS | http://localhost:5173 | No |
| FRONTEND_URL | Frontend URL for emails | http://localhost:5173 | No |

### Frontend (.env)

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| VITE_API_URL | Backend API base URL | http://localhost:5000/api | No |

---

## 📱 Features Summary

### Implemented ✅
- User authentication (JWT with refresh tokens)
- Habit CRUD operations
- Daily habit logging (done/missed)
- Eco score calculation and tracking
- Streak calculation (all habits must be completed)
- Badge system with auto-awards
- Challenge system (join, track progress)
- Custom challenge creation
- Email reminders (timezone-aware)
- Notification system (in-app + email)
- Calendar visualization
- Analytics dashboard (week/month comparison)
- Eco-action library with save functionality
- Dark mode with persistence
- Category filtering
- Leaderboard
- User settings management
- Responsive design

### Future Enhancements 🚀
- Social features (friends, sharing)
- Eco store with rewards
- Mobile app (React Native)
- Push notifications
- Image uploads for profile
- Advanced analytics (yearly trends)
- Community challenges
- Habit templates
- Export data (CSV/PDF)
- Integration with fitness trackers
- Carbon footprint calculator
- Gamification levels
- Multi-language support

---

## 🏆 Key Highlights

### Backend Strengths
1. **Robust Authentication**: Refresh token pattern with DB storage
2. **Scalable Architecture**: MVC pattern with clear separation
3. **Automated Jobs**: Cron-based reminders and challenges
4. **Timezone Handling**: Device-specific reminder scheduling
5. **Flexible Schema**: Mongoose models with validation
6. **Error Handling**: Centralized with detailed logging
7. **Email Templates**: Professional HTML emails
8. **Badge System**: Automatic achievement tracking

### Frontend Strengths
1. **Modern Stack**: React 18 with hooks and context
2. **Routing**: Protected routes with auth checks
3. **State Management**: Context API + local state
4. **Dark Mode**: System preference + manual toggle
5. **Responsive Design**: Tailwind CSS utilities
6. **Lazy Loading**: Code splitting for analytics
7. **Reusable Components**: DRY principle
8. **User Experience**: Loading states, error handling

### Unique Features
1. **Streak Logic**: ALL habits must be completed (stricter than typical trackers)
2. **Challenge-Habit Link**: Challenges tied to specific habits
3. **Eco Score**: Gamified point system based on impact
4. **Timezone Awareness**: Accurate reminders across time zones
5. **Library Integration**: Direct habit creation from eco-actions
6. **Delete Protection**: Warns about active challenges before deletion

---

## 📞 Support & Contributing

### Bug Reports
- Check existing issues
- Provide detailed description
- Include error logs
- Specify environment (OS, browser, Node version)

### Feature Requests
- Describe use case
- Explain expected behavior
- Provide mockups if applicable

### Development Guidelines
- Follow existing code style
- Write descriptive commit messages
- Test thoroughly before PR
- Update documentation

---

## 📄 License

MIT License - See LICENSE file for details

---

## 👨‍💻 Author

**Bharath PR**

---

## 🙏 Acknowledgments

- MongoDB documentation
- Express.js community
- React documentation
- Tailwind CSS team
- Recharts library
- All open-source contributors

---

**Last Updated**: December 14, 2025

**Version**: 1.0.0
