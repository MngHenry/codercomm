import React from "react";
import LoadingScreen from "../components/LoadingScreen";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

function AuthRequire({ children }) {
  const { isInitialized, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isInitialized) {
    return <LoadingScreen />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default AuthRequire;
