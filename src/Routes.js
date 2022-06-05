import React from "react";
// BrowserRouter is a browser wrapper component to wrap the rest of routes via their parameters. Goal: wrap routes in switch. Main wrapper = BrowserRouter which makes the props available in this component
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
// import Menu from "./core/Menu"
import {createMemoryHistory} from 'history';

const Routes6 = () => {
  const history = createMemoryHistory();
  return (
    <BrowserRouter location={history.location}>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/signin" exact element={<Signin />} />
        <Route path="/signup" exact element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routes6;
