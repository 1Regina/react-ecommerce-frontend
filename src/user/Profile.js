import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, useParams, Navigate } from "react-router-dom";
import { read, update, updateUser } from "./apiUser";

const Profile = () => {
  const [values, setValues] = useState({
    name: "",
    email: "", // should not allow for change
    password: "",
    error: false,
    success: false,
  });

  const params = useParams();
  const { token } = isAuthenticated();
  const { name, email, password, error, success } = values;

  const init = (userId) => {
    // console.log(userId);
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    });
  };

  useEffect(() => {
    init(params.userId);
  }, []);

  const handleChange = (e, key) => {
    console.log('xxxx', e, 'yyy', key);
    setValues({...values, error: false, [key]: e.target.value})
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    update(
      params.userId,
      token,
      { name, email, password }).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          // update also in local storage so dont need to relogin
          updateUser(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true,
            });
          });
        }
      })
  };

  const redirectUser = (success) => {
    if (success) {
      return <Navigate to="/cart" />;
    }
  };

  const profileUpdate = (name, email, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          onChange={e => handleChange(e, "name")}
          className="form-control"
          value={name}
        ></input>
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          onChange={e => handleChange(e, "email")}
          className="form-control"
          value={email}
        ></input>
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          onChange={e => handleChange(e, "password")}
          className="form-control"
          value={password}
        ></input>
      </div>

      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  return (
    <Layout
      title="Profile"
      description="Update your profile"
      className="container-fluid"
    >
      <h2 className="mb-4">Profile update</h2>
      {/* {JSON.stringify(values)} */}
      {profileUpdate(name, email, password)}
      {redirectUser(success)}
    </Layout>
  );
};

export default Profile;
