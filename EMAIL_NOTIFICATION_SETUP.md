# Email & Notification Setup Guide

## Overview
Green Routine Builder includes a comprehensive notification system with email reminders, streak milestones, challenge updates, and badge notifications. This guide will help you configure email functionality.

---

## 📧 Email Configuration

### Prerequisites
- Gmail account (or any SMTP-compatible email provider)
- Gmail App Password (for Gmail users)

### Step 1: Create Gmail App Password

1. **Enable 2-Factor Authentication** on your Gmail account
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable "2-Step Verification"

2. **Generate App Password**
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Other (Custom name)"
   - Name it "Green Routine Builder"
   - Copy the 16-character password

### Step 2: Configure Environment Variables

Open `backend/.env` and update the email configuration:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
EMAIL_FROM=Green Routine Builder <your-email@gmail.com>
```

**Example:**
```env
EMAIL_USER=john.doe@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
EMAIL_FROM=Green Routine Builder <john.doe@gmail.com>
```

---

## 🔔 Notification System Features

### 1. Daily Habit Reminders
- **When:** Sent at the time specified in each habit's `reminderTime` field
- **Frequency:** Daily (cron job runs every minute to check)
- **Content:** Personalized reminder with habit title and scheduled time
- **Condition:** Only sent if user has `settings.emailReminders = true`

### 2. Streak Milestone Notifications
- **When:** User reaches significant streak milestones
- **Triggers:** 5, 15, 30, 60+ day streaks
- **Content:** Celebration message with streak count and badge icon
- **Auto-awarded:** Badge system automatically creates badge records

### 3. Challenge Notifications
- **Challenge Joined:** Welcome email with challenge details and duration
- **Challenge Completed:** Congratulations email with badge information
- **Weekly Digest:** Sunday summary of all active challenges

### 4. Badge Earned Notifications
- **When:** User unlocks a new achievement badge
- **Types:** Streak badges, challenge badges, milestone badges
- **Content:** Badge details with icon and award date

---

## ⚙️ Cron Jobs Configuration

### Active Jobs (in `backend/jobs/reminderJob.js`)

#### 1. Daily Reminder Job
```javascript
Schedule: "* * * * *" (every minute)
Purpose: Check if current time matches any habit's reminderTime
Action: Send email reminder if conditions are met
```

#### 2. Weekly Digest Job
```javascript
Schedule: "0 9 * * 0" (Every Sunday at 9 AM)
Purpose: Send weekly summary of habits and challenges
Action: Compile stats and send digest email
```

#### 3. Weekly Challenge Job
```javascript
Schedule: "0 10 * * 1" (Every Monday at 10 AM)
Purpose: Update weekly challenges and notify users
Action: Refresh available challenges
```

### Starting Cron Jobs

Cron jobs are **automatically started** when the server starts:

```javascript
// In backend/server.js (line 80)
startCronJobs();
```

To manually control jobs:
```javascript
import { startCronJobs, stopCronJobs } from './jobs/reminderJob.js'

startCronJobs()  // Start all jobs
stopCronJobs()   // Stop all jobs (for graceful shutdown)
```

---

## 🧪 Testing Email Functionality

### Test 1: Manual Email Send
```javascript
// In backend, use the email service directly
import { sendEmail } from './services/emailService.js'

await sendEmail('test@example.com', 'reminder', {
  userName: 'Test User',
  habitTitle: 'Turn off lights',
  reminderTime: '9:00 AM'
})
```

### Test 2: Create Test Habit with Reminder
1. Create a habit with `reminderTime` set to current time + 2 minutes
2. Ensure your user has `settings.emailReminders = true`
3. Wait for the reminder email

### Test 3: Check Cron Job Logs
```bash
# Server console should show:
Starting cron jobs...
Cron jobs started successfully
```

---

## 📱 User Settings Management

### Frontend: Profile Settings Section

Users can control notifications via the Profile page:

```javascript
// Toggle Email Reminders
settings.emailReminders: true/false

// Set Timezone
settings.timezone: 'America/New_York', 'UTC', etc.

// Dark Mode
settings.darkMode: true/false
```

### Backend: Settings API

**Get Settings:**
```http
GET /api/user/settings
Authorization: Bearer <token>
```

**Update Settings:**
```http
PUT /api/user/settings
Authorization: Bearer <token>
Content-Type: application/json

{
  "emailReminders": true,
  "timezone": "America/New_York",
  "darkMode": false
}
```

---

## 🗄️ Database Models

### User Settings Schema
```javascript
settings: {
  emailReminders: { type: Boolean, default: true },
  darkMode: { type: Boolean, default: false },
  timezone: { type: String, default: 'UTC' }
}
```

### Notification Schema
```javascript
{
  userId: ObjectId,
  type: 'reminder' | 'streak-milestone' | 'challenge-joined' | 'challenge-completed' | 'badge-earned',
  payload: Object,
  sentAt: Date,
  status: 'sent' | 'pending' | 'failed',
  read: Boolean
}
```

---

## 🐛 Troubleshooting

### Issue: Emails Not Sending

**Check 1: Environment Variables**
```bash
# Verify EMAIL_USER and EMAIL_PASS are set
echo $EMAIL_USER
echo $EMAIL_PASS
```

**Check 2: Gmail App Password**
- Ensure you're using the 16-character app password, NOT your regular Gmail password
- Check that 2FA is enabled on your Google account

**Check 3: Console Logs**
```javascript
// Check server console for errors:
Error sending email: [error message]
Failed to send email to user@example.com: [error]
```

**Check 4: Nodemailer Configuration**
```javascript
// In backend/services/emailService.js
// Test transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.log('SMTP connection error:', error)
  } else {
    console.log('SMTP server is ready to send emails')
  }
})
```

### Issue: Reminders Not Triggering

**Check 1: Cron Jobs Running**
```javascript
// Server should log on startup:
Starting cron jobs...
Cron jobs started successfully
```

**Check 2: Habit Reminder Time Format**
```javascript
// Habit reminderTime should be in HH:mm format
reminderTime: "09:00"  // ✅ Correct
reminderTime: "9:00 AM" // ❌ Wrong format
```

**Check 3: User Has Email Reminders Enabled**
```javascript
// Check in MongoDB or via API
user.settings.emailReminders === true
```

### Issue: Timezone Issues

**Solution:** Ensure server timezone matches user preference
```javascript
// User sets timezone in Profile settings
// Cron job uses this timezone to calculate reminder times
const userTimezone = user.settings.timezone || 'UTC'
```

---

## 🚀 Production Deployment Checklist

- [ ] Set `EMAIL_USER` in production environment variables
- [ ] Set `EMAIL_PASS` in production environment variables
- [ ] Update `FRONTEND_URL` in .env for correct email links
- [ ] Verify `NODE_ENV=production` for error handling
- [ ] Test email sending from production server
- [ ] Monitor cron job execution logs
- [ ] Set up email rate limiting if needed
- [ ] Configure backup SMTP server (optional)

---

## 📊 Notification Statistics

Track notification performance:
- Total emails sent
- Delivery success rate
- Open rate (if tracking pixels added)
- User engagement with reminders

Query example:
```javascript
// Count notifications by type
await Notification.aggregate([
  { $group: { _id: "$type", count: { $sum: 1 } } }
])
```

---

## 🔐 Security Best Practices

1. **Never commit .env file** to version control
2. **Use environment-specific credentials** for dev/staging/prod
3. **Rotate email passwords** periodically
4. **Monitor for spam complaints**
5. **Implement rate limiting** for email sending
6. **Use HTTPS** for all email links in production

---

## 📚 Additional Resources

- [Nodemailer Documentation](https://nodemailer.com/)
- [Node-cron Documentation](https://www.npmjs.com/package/node-cron)
- [Gmail App Passwords Guide](https://support.google.com/accounts/answer/185833)
- [SMTP Configuration Examples](https://nodemailer.com/smtp/)

---

## 💡 Future Enhancements

- [ ] SMS notifications via Twilio
- [ ] Browser push notifications
- [ ] Slack/Discord integration
- [ ] Notification preferences per habit
- [ ] Quiet hours configuration
- [ ] Notification batching (digest mode)
- [ ] Custom email templates per user

---

## 🆘 Support

If you encounter issues:
1. Check server console logs
2. Verify .env configuration
3. Test email credentials manually
4. Review cron job execution logs
5. Check user settings in database

**Contact:** Open an issue on GitHub or contact the development team.

---

**Last Updated:** 2024
**Version:** 1.0.0
