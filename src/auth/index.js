import { API } from "../config";

export const signup = async (user) => {
  // user can give name, email, password
  // console.log(name, email, password);
  try {
    const response = await fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user), // to convert object to json string for backend
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const signin = async (user) => {
  // user can give name, email, password
  // console.log(name, email, password);
  try {
    const response = await fetch(`${API}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user), // to convert object to json string for backend
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

// next as the call back
export const authenticate = (data, next) => {
  // local storage is a property of the window object.
  if (typeof window !== "undefined") {
    // save with key of 'jwt'
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

// next as the call back
export const signout = async (next) => {
  // local storage is a property of the window object.
  if (typeof window !== "undefined") {
    // remove key of 'jwt' which was created via authenticate via signin
    localStorage.removeItem("jwt");
    next();
    // make request to backend to log out the user
    try {
      const response = await fetch(`${API}/signout`, {
        method: "GET",
      });
      console.log("signout", response);
    } catch (err) {
      return console.log(err);
    }
  }
};

export const isAuthenticated = () => {
  if (typeof window === 'undefined') {
    return false
  }
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'))
  } else {
    return false
  }
}