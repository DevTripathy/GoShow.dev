import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddShows from "./pages/AddShows.jsx";
import ListShows from "./pages/ListShows.jsx";
import ListBookings from "./pages/ListBookings.jsx";
import Profile from "./pages/Profile.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import EmailVerify from "./pages/EmailVerify.jsx";
import { useAdminAuth } from "./context/AdminAuthContext.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAdminAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

const App = () => {
  const { isAuthenticated, isVerified, loading } = useAdminAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={
        isAuthenticated
          ? (isVerified ? <Navigate to="/admin/" replace /> : <Navigate to="/admin-verify-email" replace />)
          : <AdminLogin />
      } />
      <Route path="/admin-verify-email" element={
        isAuthenticated
          ? (isVerified ? <Navigate to="/admin/" replace /> : <EmailVerify />)
          : <Navigate to="/" replace />
      } />
      <Route path="/admin-reset-password" element={<ResetPassword />} />
      <Route path="/admin/*" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="add-shows" element={<AddShows />} />
        <Route path="list-shows" element={<ListShows />} />
        <Route path="list-bookings" element={<ListBookings />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;
