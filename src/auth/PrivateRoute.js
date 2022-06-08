import React  from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";

// only accessible for logined users

const PrivateRoute = ({ children }) => {
  if (isAuthenticated()) {
    return children
  }
  return <Navigate to="/signin" replace />        

}


export default PrivateRoute;
