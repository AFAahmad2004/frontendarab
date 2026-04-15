import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ✅ حماية المسارات حسب الدور
export default function ProtectedRoute({ children, requiredRole }) {
  const { auth } = useAuth();

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && auth.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
