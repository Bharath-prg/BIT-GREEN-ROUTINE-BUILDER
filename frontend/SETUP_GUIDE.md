# 🚀 Frontend Setup Guide

## Complete Green Routine Builder Frontend Starter

### ✅ What Has Been Generated

**Configuration Files:**
- ✅ `package.json` - Dependencies and scripts
- ✅ `vite.config.js` - Vite configuration
- ✅ `tailwind.config.js` - Tailwind CSS config with custom eco-green theme
- ✅ `postcss.config.js` - PostCSS configuration
- ✅ `.env` - Environment variables

**Entry Files:**
- ✅ `index.html` - HTML entry point
- ✅ `src/main.jsx` - React entry point
- ✅ `src/App.jsx` - Root component
- ✅ `src/index.css` - Global styles + Tailwind directives

**Routing:**
- ✅ `src/router/AppRouter.jsx` - Complete routing setup with React Router

**Layout:**
- ✅ `src/layout/MainLayout.jsx` - Main app layout (Sidebar + Navbar + Content)
- ✅ `src/components/Navbar.jsx` - Top navigation bar
- ✅ `src/components/Sidebar.jsx` - Left sidebar navigation

**Auth Pages:**
- ✅ `src/auth/Login.jsx` - Login page
- ✅ `src/auth/Signup.jsx` - Registration page

**Main Pages:**
- ✅ `src/pages/Landing.jsx` - Landing/homepage
- ✅ `src/pages/Dashboard.jsx` - Main dashboard
- ✅ `src/pages/Habits.jsx` - Habit management
- ✅ `src/pages/Calendar.jsx` - Calendar view
- ✅ `src/pages/Challenges.jsx` - Eco challenges
- ✅ `src/pages/Library.jsx` - Eco-action library
- ✅ `src/pages/EcoStore.jsx` - Carbon offset info
- ✅ `src/pages/Profile.jsx` - User profile & settings
- ✅ `src/pages/Notifications.jsx` - Notifications page

**Components:**
- ✅ `src/components/NotificationBell.jsx` - Notification dropdown
- ✅ `src/components/HabitCard.jsx` - Habit display card
- ✅ `src/components/CalendarGrid.jsx` - Calendar with color coding
- ✅ `src/components/ChallengeCard.jsx` - Challenge display card
- ✅ `src/components/ActionCard.jsx` - Eco-action card

**Utilities:**
- ✅ `src/utils/api.js` - Complete API client with Axios interceptors
- ✅ `src/utils/helpers.js` - Helper functions (dates, streaks, calculations)
- ✅ `src/hooks/useAuth.js` - Authentication hook & context

---

## 🎯 Installation & Running

### Step 1: Install Dependencies

```bash
cd frontend
npm install
```

### Step 2: Start Development Server

```bash
npm run dev
```

The app will start at **http://localhost:5173**

---

## 📋 Available Routes

| URL | Page | Access |
|-----|------|--------|
| `/` | Landing | Public |
| `/login` | Login | Public |
| `/signup` | Signup | Public |
| `/dashboard` | Dashboard | Protected |
| `/habits` | Habits | Protected |
| `/calendar` | Calendar | Protected |
| `/challenges` | Challenges | Protected |
| `/library` | Eco Library | Protected |
| `/eco-store` | Carbon Offset | Protected |
| `/profile` | Profile | Protected |
| `/notifications` | Notifications | Protected |

---

## 🎨 UI Features

✅ **Modern Dashboard Layout**
- Fixed sidebar on left
- Top navbar with search & notifications
- Responsive main content area

✅ **Eco-Themed Design**
- Custom green color palette
- Clean, minimalist interface
- Card-based layouts

✅ **Interactive Components**
- Notification dropdown
- Modal dialogs
- Habit check-in buttons
- Progress bars
- Calendar grid with color coding

✅ **Color-Coded Calendar**
- 🟩 Green = All habits completed
- 🟨 Yellow = Partial completion
- 🟥 Red = Habits missed

✅ **Fully Responsive**
- Works on desktop, tablet, mobile

---

## 🔧 Configuration

### Environment Variables (`.env`)

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Green Routine Builder
```

### Custom Tailwind Colors

The `eco-green` color scale is available:

```jsx
className="bg-eco-green-500 text-eco-green-700"
```

Shades: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900

### Custom CSS Classes

```css
.btn-primary    - Primary button (green)
.btn-secondary  - Secondary button (gray)
.card          - Card container
.input-field   - Input field styling
.badge         - Badge/pill component
.badge-success - Success badge (green)
.badge-warning - Warning badge (yellow)
.badge-danger  - Danger badge (red)
```

---

## 📦 Dependencies

**Production:**
- `react` & `react-dom` - UI library
- `react-router-dom` - Routing
- `axios` - HTTP client
- `recharts` - Charts/graphs

**Development:**
- `vite` - Build tool
- `tailwindcss` - CSS framework
- `autoprefixer` & `postcss` - CSS processing
- `eslint` - Code linting

---

## 🔌 API Integration

All API calls are centralized in `src/utils/api.js`:

```javascript
import { authAPI, habitsAPI, challengesAPI } from './utils/api'

// Example usage
const login = async () => {
  const response = await authAPI.login({ email, password })
}
```

**Available API modules:**
- `authAPI` - Authentication
- `habitsAPI` - Habits CRUD
- `habitLogsAPI` - Habit logs
- `challengesAPI` - Challenges
- `ecoActionsAPI` - Eco actions library
- `notificationsAPI` - Notifications
- `userAPI` - User profile

---

## 🔐 Authentication

The `useAuth` hook provides:

```javascript
const { user, isAuthenticated, login, signup, logout } = useAuth()
```

- Token stored in localStorage
- Automatic auth header injection
- 401 redirect to login

---

## 🏗️ Project Structure Best Practices

✅ **Pages** - Full page components
✅ **Components** - Reusable UI components
✅ **Layout** - Layout wrappers
✅ **Utils** - Helper functions & API client
✅ **Hooks** - Custom React hooks
✅ **Router** - Route configuration

---

## 📱 Next Steps

1. ✅ **Frontend is complete** and ready to run
2. 🔄 **Connect to backend** - Update `VITE_API_URL` in `.env`
3. 🎨 **Customize** - Modify colors, layout as needed
4. 🚀 **Build** - Run `npm run build` for production
5. 🌐 **Deploy** - Deploy to Vercel/Netlify

---

## 🐛 Troubleshooting

### Port already in use?
```bash
# Vite will automatically find next available port
# Or specify a different port in vite.config.js
```

### Module not found?
```bash
npm install
# Reinstall all dependencies
```

### Tailwind classes not working?
```bash
# Make sure Tailwind is processing correctly
npm run dev
# Check browser console for errors
```

---

## 🎉 You're All Set!

Your complete **Green Routine Builder** frontend is ready to use!

**Start developing:**
```bash
cd frontend
npm install
npm run dev
```

**Happy Coding! 🌱**
