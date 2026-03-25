import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <div className="loader">Loading...</div>; // Could be a Spinner component
  }

  // If user is not logged in, kick them to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If the route has restricted roles and the user's role isn't in it, kick them to dashboard
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // Render the protected component
  return <Outlet />;
};

export default ProtectedRoute;
