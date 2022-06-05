import React from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Link to avoid reloading the page. withRouter to access route history. wtihRouter has deprecated in v6. replace by useNavigate

const Menu = () => {
  // let navigate =  useNavigate()
  return (
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item nav-link">
        <NavLink
          to="/"
          style={({ isActive }) => ({
            color: isActive ? "#ff9900" : "#ffffff",
          })}
        >
          Home
        </NavLink>
        {/* <button onClick={() => navigate("/home")}>Home</button> */}
      </li>
      <li className="nav-item nav-link">
        <NavLink
          to="/signin"
          style={({ isActive }) => ({
            color: isActive ? "#ff9900" : "#ffffff",
          })}
        >
          Signin
        </NavLink>
      </li>

      <li className="nav-item nav-link">
        <NavLink
          to="/signup"
          style={({ isActive }) => ({
            color: isActive ? "#ff9900" : "#ffffff",
          })}
        >
          Signup
        </NavLink>
      </li>
    </ul>
  );
};

export default Menu;
