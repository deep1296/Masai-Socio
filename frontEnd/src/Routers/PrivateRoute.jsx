import React from "react";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children, isAuthenticated }) {
   if (isAuthenticated) return children;
   return <Navigate to="/login" />;
}
