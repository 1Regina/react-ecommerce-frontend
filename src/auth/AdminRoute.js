import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";

// only accessible for logined users

const AdminRoute = ({ children }) => {
  if (isAuthenticated() && isAuthenticated().user.role === 1) {
    return children;
  }
  return <Navigate to="/signin" replace />;
};

export default AdminRoute;
