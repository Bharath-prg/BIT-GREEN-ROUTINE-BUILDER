# Green Routine Builder - Backend

Backend server for the Green Routine Builder web application - A sustainable habit tracker with gamification and eco-challenges.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Email**: Nodemailer
- **Scheduling**: node-cron

## Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Register, login, getMe
│   ├── habitController.js    # CRUD operations for habits
│   ├── logController.js      # Daily habit logging
│   ├── challengeController.js # Eco-challenges management
│   └── notificationController.js # Notification handling
├── middleware/
│   └── authMiddleware.js     # JWT verification
├── models/
│   ├── User.js               # User schema
│   ├── Habit.js              # Habit schema
│   ├── HabitLog.js           # Daily log schema
│   ├── Challenge.js          # Challenge schema
│   ├── ChallengeProgress.js  # User progress tracking
│   ├── Badge.js              # Achievement badges
│   └── Notification.js       # Notification schema
├── routes/
│   ├── auth.js               # Authentication routes
│   ├── habits.js             # Habit management routes
│   ├── logs.js               # Habit logging routes
│   ├── challenges.js         # Challenge routes
│   └── notifications.js      # Notification routes
├── services/
│   ├── emailService.js       # Email sending logic
│   └── notificationService.js # Notification handling
├── jobs/
│   └── reminderJob.js        # Cron job for daily reminders
├── .env.example              # Environment variables template
├── server.js                 # Main server file
└── package.json              # Dependencies
```

## Installation

### Prerequisites

- Node.js v18+ installed
- MongoDB Atlas account (free tier works)
- Gmail account for email notifications

### Steps

1. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables**:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update the values in `.env`:
     ```
     PORT=5000
     MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/green-routine-builder
     JWT_SECRET=your-super-secret-jwt-key-min-32-characters
     EMAIL_USER=your-email@gmail.com
     EMAIL_PASS=your-gmail-app-password
     FRONTEND_URL=http://localhost:5173
     ```

3. **Set up MongoDB Atlas**:
   - Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a database user
   - Whitelist your IP address (or use 0.0.0.0/0 for development)
   - Get your connection string and update `MONGO_URI` in `.env`

4. **Set up Gmail App Password** (for Nodemailer):
   - Enable 2-factor authentication on your Gmail account
   - Go to: [Google App Passwords](https://myaccount.google.com/apppasswords)
   - Generate an app password for "Mail"
   - Use this password in `EMAIL_PASS` in `.env`

5. **Generate JWT Secret**:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   - Copy the output and use it as `JWT_SECRET` in `.env`

## Running the Server

### Development Mode

```bash
npm run dev
```

Server will start on `http://localhost:5000` with auto-restart on file changes.

### Production Mode

```bash
npm start
```

## API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |
| POST | `/api/auth/logout` | Logout user | ❌ |

### Habits (`/api/habits`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/habits` | Get all user habits | ✅ |
| POST | `/api/habits` | Create new habit | ✅ |
| GET | `/api/habits/:id` | Get habit by ID | ✅ |
| PUT | `/api/habits/:id` | Update habit | ✅ |
| DELETE | `/api/habits/:id` | Archive habit | ✅ |

### Logs (`/api/logs`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/logs` | Get all logs | ✅ |
| POST | `/api/logs` | Create daily log | ✅ |
| GET | `/api/logs/:date` | Get logs by date | ✅ |
| GET | `/api/logs/habit/:habitId` | Get logs by habit | ✅ |

### Challenges (`/api/challenges`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/challenges` | Get all challenges | ✅ |
| POST | `/api/challenges` | Create challenge | ✅ |
| GET | `/api/challenges/:id` | Get challenge details | ✅ |
| POST | `/api/challenges/join` | Join a challenge | ✅ |
| GET | `/api/challenges/progress` | Get user's progress | ✅ |
| PUT | `/api/challenges/progress/:id` | Update progress | ✅ |

### Notifications (`/api/notifications`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/notifications` | Get all notifications | ✅ |
| POST | `/api/notifications/send` | Send notification | ✅ |
| PUT | `/api/notifications/:id/read` | Mark as read | ✅ |
| PUT | `/api/notifications/read-all` | Mark all as read | ✅ |

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Token Expiry

- Access tokens expire in **24 hours**
- Frontend will automatically handle token refresh

## Database Schemas

### User

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  ecoScoreTotal: Number,
  settings: {
    emailReminders: Boolean,
    darkMode: Boolean
  }
}
```

### Habit

```javascript
{
  userId: ObjectId (ref: User),
  title: String,
  category: String (enum),
  frequency: String,
  reminderTime: String,
  impactLevel: String,
  archived: Boolean
}
```

### HabitLog

```javascript
{
  userId: ObjectId (ref: User),
  habitId: ObjectId (ref: Habit),
  date: String (YYYY-MM-DD),
  status: String (enum: done, missed)
}
```

### Challenge

```javascript
{
  title: String,
  description: String,
  category: String,
  durationDays: Number,
  startDate: Date,
  endDate: Date,
  participants: [ObjectId]
}
```

## Cron Jobs

### Daily Reminder Job

- **Schedule**: Runs every minute
- **Purpose**: Sends email reminders for habits due at current time
- **Condition**: Only sends if user has `emailReminders: true`

### Weekly Digest Job

- **Schedule**: Every Sunday at 9:00 AM
- **Purpose**: Sends weekly summary of user's eco-activities
- **Content**: Habits completed, streaks, eco-score gained

## Email Templates

Available email templates:

1. **Reminder**: Daily habit reminder
2. **Streak Milestone**: Celebrate streak achievements (5, 15, 30, 60 days)
3. **Challenge Joined**: Confirmation when joining a challenge
4. **Challenge Completed**: Congratulations on challenge completion

## Error Handling

All API responses follow this format:

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message"
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

## Deployment

### Railway / Render

1. Connect your GitHub repository
2. Set environment variables in the dashboard
3. Deploy automatically from `main` branch

### Environment Variables (Production)

Make sure to set all these in your deployment platform:

- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `EMAIL_USER`
- `EMAIL_PASS`
- `FRONTEND_URL` (your deployed frontend URL)

## Testing

Test API endpoints using:

- **Postman**: Import the collection
- **Thunder Client**: VS Code extension
- **cURL**: Command line testing

Example cURL:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get habits (with token)
curl -X GET http://localhost:5000/api/habits \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Troubleshooting

### MongoDB Connection Issues

- Check if IP is whitelisted in MongoDB Atlas
- Verify connection string format
- Ensure database user has correct permissions

### Email Not Sending

- Verify Gmail App Password is correct
- Check if 2FA is enabled on Gmail
- Test with `verifyEmailConfig()` function

### JWT Errors

- Ensure `JWT_SECRET` is set and at least 32 characters
- Check token format: `Bearer <token>`
- Verify token hasn't expired

## License

MIT License - see LICENSE file for details

## Contributors

- Bharath PR (@Bharath-prg)

## Support

For issues or questions, please open an issue on GitHub.
