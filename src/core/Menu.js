import React, { Fragment, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Link to avoid reloading the page. withRouter to access route history. wtihRouter has deprecated in v6. replace by useNavigate
import { signout, isAuthenticated } from "../auth/";
import { itemTotal } from "./cartHelpers";

const Menu = () => {
  let navigate = useNavigate();
  return (
    <div>
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
            to="/shop"
            style={({ isActive }) => ({
              color: isActive ? "#ff9900" : "#ffffff",
            })}
          >
            Shop
          </NavLink>
        </li>

        <li className="nav-item nav-link">
          <NavLink
            to="/cart"
            style={({ isActive }) => ({
              color: isActive ? "#ff9900" : "#ffffff",
            })}
          >
            Cart <sup> <small className="cart-badge">{itemTotal()}</small></sup>
          </NavLink>
        </li>

        {/* <li className="nav-item nav-link">
          <NavLink
            to="/user/dashboard"
            style={({ isActive }) => ({
              color: isActive ? "#ff9900" : "#ffffff",
            })}
          >
            Dashboard
          </NavLink>
        </li> */}
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item nav-link">
            <NavLink
              to="/user/dashboard"
              style={({ isActive }) => ({
                color: isActive ? "#ff9900" : "#ffffff",
              })}
            >
              Dashboard
            </NavLink>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item nav-link">
            <NavLink
              to="/admin/dashboard"
              style={({ isActive }) => ({
                color: isActive ? "#ff9900" : "#ffffff",
              })}
            >
              Dashboard
            </NavLink>
          </li>
        )}

        {/* <li className="nav-item nav-link">
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
      </li> */}

        {/* if not signin then show signin and signup. For registered users, only show home and signout */}
        {!isAuthenticated() && (
          <Fragment>
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
          </Fragment>
        )}

        {/* <li className="nav-item nav-link">
        <span>
        <NavLink
          to="/"
          style={{ cursor: "pointer", color: "#ffffff" }}
          onClick={() =>
            signout(() => {
              // history.pushState("/");
              // navigate("/");
            })
          }
        >
          Signout
        </NavLink>
        </span>
      </li> */}

        {isAuthenticated() && (
          <li className="nav-item nav-link">
            <NavLink
              to="/"
              style={{ cursor: "pointer", color: "#ffffff" }}
              onClick={() =>
                signout(() => {
                  // history.pushState("/");
                  navigate("/");
                })
              }
            >
              Signout
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Menu;
