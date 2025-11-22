import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

// Pages
import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard";
import Habits from "../pages/Habits";
import Calendar from "../pages/Calendar";
import Challenges from "../pages/Challenges";
import Library from "../pages/Library";
import EcoStore from "../pages/EcoStore";
import Profile from "../pages/Profile";
import Notifications from "../pages/Notifications";

// Auth Pages
import Login from "../auth/Login";
import Signup from "../auth/Signup";

// Lazy load Analytics page
const Analytics = React.lazy(() => import("../pages/Analytics"));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes with MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/habits" element={<Habits />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/library" element={<Library />} />
            <Route path="/eco-store" element={<EcoStore />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
          </Route>
          {/* Analytics Page */}
          <Route element={<MainLayout />}>
            <Route path="/analytics" element={<Analytics />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
