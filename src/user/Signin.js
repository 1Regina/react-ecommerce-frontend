import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate } from "../auth/index";

const Signin = () => {
  // inefficient to do useState per field
  // const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  const [values, setValues] = useState({
    email: "ddd@gmail.com",
    password: "dddddd6",
    error: "", // when create new user and there is error, this field will populate
    loading: false,
    redirectToReferrer: false, // will become true after successful signin
  });

  // grab fields input from state
  const { email, password, loading, error, redirectToReferrer } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value }); // this name is dynamic n could refer to email / password too
  };

  const clickSubmit = (event) => {
    event.preventDefault(); // so the browser wont reload when button is clicked
    setValues({ ...values, error: false, loading: true });
    // signin({name: name, email: email, password: password});
    // can be simplify as below as the key and values are the same
    signin({ email, password }) // to send the javascript object as user thru the signin
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              // these values become irrelevant since we are redirecting
              // email: "",
              // password: "",
              // error: "",
              // loading: false,
              redirectToReferrer: true,
            });
          });
        }
      });
  };

  const signinForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    // <div
    //   className="alert alert-info"
    //   style={{ display: loading ? "" : "none" }}// success is replaced by loading
    // >
    //   New account is created. Please <Link to="/signin">Signin</Link>
    // </div>

    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Navigate to="/" />;
    }
  };
  return (
    <Layout
      title="Signin"
      description="Signin to Node React E-commerce App"
      className="container col-md8 offset-md-2"
    >
      {showLoading()}
      {showError()}
      {signinForm()}
      {redirectUser()}
      {/* {JSON.stringify(values)} */}
    </Layout>
  );
};
export default Signin;
