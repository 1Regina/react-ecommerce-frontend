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


