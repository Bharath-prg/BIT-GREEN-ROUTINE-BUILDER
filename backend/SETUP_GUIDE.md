# Backend Setup Guide

Complete setup guide for the Green Routine Builder backend.

## Prerequisites

Before starting, ensure you have:

- ✅ Node.js v18+ installed ([Download](https://nodejs.org/))
- ✅ npm or yarn package manager
- ✅ MongoDB Atlas account ([Sign up free](https://www.mongodb.com/cloud/atlas/register))
- ✅ Gmail account (for email notifications)
- ✅ Git installed
- ✅ Code editor (VS Code recommended)

## Step 1: Install Dependencies

```bash
cd backend
npm install
```

This will install all required packages:
- express
- mongoose
- jsonwebtoken
- bcryptjs
- nodemailer
- node-cron
- cors
- dotenv
- nodemon (dev dependency)

## Step 2: MongoDB Atlas Setup

### 2.1 Create Cluster

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click **"Build a Database"**
3. Choose **FREE** tier (M0 Sandbox)
4. Select cloud provider and region (closest to you)
5. Name your cluster (e.g., `green-routine-cluster`)
6. Click **"Create"**

### 2.2 Create Database User

1. Navigate to **Database Access** in the left sidebar
2. Click **"Add New Database User"**
3. Choose **Password** authentication
4. Username: `green-routine-admin` (or your choice)
5. Generate a strong password (save it!)
6. User Privileges: **Read and write to any database**
7. Click **"Add User"**

### 2.3 Whitelist IP Address

1. Navigate to **Network Access** in the left sidebar
2. Click **"Add IP Address"**
3. For development: Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. For production: Add your server's IP address
5. Click **"Confirm"**

### 2.4 Get Connection String

1. Go back to **Database** in the left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `green-routine-builder`

Example:
```
mongodb+srv://green-routine-admin:YOUR_PASSWORD@cluster0.mongodb.net/green-routine-builder?retryWrites=true&w=majority
```

## Step 3: Gmail App Password Setup

### 3.1 Enable 2-Factor Authentication

1. Go to your [Google Account](https://myaccount.google.com/)
2. Navigate to **Security**
3. Under **"Signing in to Google"**, select **2-Step Verification**
4. Follow the steps to enable 2FA

### 3.2 Generate App Password

1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select app: **Mail**
3. Select device: **Other (Custom name)**
4. Enter name: `Green Routine Builder`
5. Click **"Generate"**
6. Copy the 16-character password (save it!)

## Step 4: Environment Configuration

### 4.1 Create .env File

```bash
cp .env.example .env
```

### 4.2 Edit .env File

Open `.env` and update all values:

```env
# Server Configuration
PORT=5000

# MongoDB Configuration
MONGO_URI=mongodb+srv://green-routine-admin:YOUR_PASSWORD@cluster0.mongodb.net/green-routine-builder?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=<GENERATE_THIS_BELOW>

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=<YOUR_16_CHAR_APP_PASSWORD>

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### 4.3 Generate JWT Secret

Run this command to generate a secure JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste it as `JWT_SECRET` in `.env`.

Example output:
```
a7f5c8e2d3b6a9f1e4c7b8d5a2f9e6c3b1d8a5f2e9c6b3d0a7f4e1c8b5d2a9
```

## Step 5: Verify Setup

### 5.1 Test MongoDB Connection

Create a test file `test-db.js`:

```javascript
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const testConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ MongoDB connected successfully!')
    await mongoose.connection.close()
    process.exit(0)
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message)
    process.exit(1)
  }
}

testConnection()
```

Run the test:
```bash
node test-db.js
```

### 5.2 Test Email Service

Create a test file `test-email.js`:

```javascript
import dotenv from 'dotenv'
import { sendEmail, verifyEmailConfig } from './services/emailService.js'

dotenv.config()

const testEmail = async () => {
  try {
    // Verify config
    const isVerified = await verifyEmailConfig()
    
    if (isVerified) {
      console.log('✅ Email service configured correctly!')
      
      // Send test email
      const result = await sendEmail(
        process.env.EMAIL_USER,
        'reminder',
        {
          userName: 'Test User',
          habitTitle: 'Test Habit',
          reminderTime: '09:00'
        }
      )
      
      if (result.success) {
        console.log('✅ Test email sent successfully!')
      } else {
        console.error('❌ Failed to send test email:', result.error)
      }
    } else {
      console.error('❌ Email service configuration failed')
    }
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Email test failed:', error.message)
    process.exit(1)
  }
}

testEmail()
```

Run the test:
```bash
node test-email.js
```

## Step 6: Start the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB connected successfully
Starting cron jobs...
Cron jobs started successfully
Email service is ready to send emails
```

### Production Mode

```bash
npm start
```

## Step 7: Test API Endpoints

### Using cURL

#### Register a new user:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

Save the `token` from the response.

#### Get current user (with token):
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman or Thunder Client

1. Install [Postman](https://www.postman.com/) or Thunder Client (VS Code extension)
2. Create a new collection: `Green Routine Builder`
3. Add requests for each endpoint (see README.md for full list)
4. Set up environment variables for `baseUrl` and `token`

## Step 8: Connect with Frontend

Make sure your frontend's `.env` file has:

```env
VITE_API_URL=http://localhost:5000/api
```

Start both servers:
```bash
# Terminal 1 (Backend)
cd backend
npm run dev

# Terminal 2 (Frontend)
cd frontend
npm run dev
```

## Troubleshooting

### MongoDB Connection Errors

**Error**: `MongoNetworkError: connection timed out`

**Solutions**:
- Check if your IP is whitelisted in MongoDB Atlas
- Try whitelisting `0.0.0.0/0` for development
- Verify your internet connection
- Check if MongoDB Atlas is down ([Status Page](https://status.cloud.mongodb.com/))

---

**Error**: `Authentication failed`

**Solutions**:
- Verify database username and password
- Check if special characters in password are URL-encoded
- Ensure database user has correct permissions

---

### Email Service Errors

**Error**: `Invalid login: 535-5.7.8 Username and Password not accepted`

**Solutions**:
- Verify you're using App Password, not Gmail password
- Check if 2FA is enabled on Gmail
- Regenerate App Password and update `.env`

---

**Error**: `ECONNREFUSED`

**Solutions**:
- Check if `EMAIL_USER` and `EMAIL_PASS` are set in `.env`
- Verify Gmail App Password is correct (16 characters, no spaces)

---

### JWT Errors

**Error**: `jwt malformed`

**Solutions**:
- Check if token is in correct format: `Bearer <token>`
- Verify `JWT_SECRET` is set in `.env`
- Ensure token hasn't expired (24 hour expiry)

---

### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000`

**Solutions**:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

Or change `PORT` in `.env` to another port (e.g., 5001).

---

## Production Deployment

### Railway

1. Push code to GitHub
2. Go to [Railway](https://railway.app/)
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select your repository
5. Add environment variables in settings
6. Deploy automatically

### Render

1. Push code to GitHub
2. Go to [Render](https://render.com/)
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repository
5. Set build command: `npm install`
6. Set start command: `npm start`
7. Add environment variables
8. Deploy

### Important for Production

- Set `FRONTEND_URL` to your deployed frontend URL
- Use MongoDB Atlas IP whitelist (not 0.0.0.0/0)
- Keep `JWT_SECRET` secure and never commit to Git
- Use environment-specific email accounts

---

## Next Steps

✅ Backend is now fully set up!

You can now:
- Test all API endpoints
- Create habits, logs, and challenges
- Receive email notifications
- Connect with the frontend application

For API documentation, see [README.md](./README.md)

Happy coding! 🌱
