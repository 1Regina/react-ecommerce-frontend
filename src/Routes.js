import React from "react";
// BrowserRouter is a browser wrapper component to wrap the rest of routes via their parameters. Goal: wrap routes in switch. Main wrapper = BrowserRouter which makes the props available in this component
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
// import Menu from "./core/Menu"
import { createMemoryHistory } from "history";
import PrivateRoute from "./auth/PrivateRoute"; // only accessible for logined users
import Dashboard from "./user/UserDashboard";

import NotFound from "./views/NotFound"
import Forbidden from "./views/Forbidden"

const Routes6 = () => {
  const history = createMemoryHistory();
  return (
    <BrowserRouter location={history.location}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path ="/user/dashboard"
          element = {
            <PrivateRoute >
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routes6;
