import React, { useState, useEffect } from "react";
import logo from "./images/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import authStore from "../stores/authStore";
import "./style.css";
import image2 from "../components/images/music2.jpg";

export default function LoginForm() {
  const store = authStore();
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  // used to store validation errors for the email and password input fields.

  const [loginError, setLoginError] = useState(""); // used to display an error message if the login process fails.

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent the auto refresh when submiting the form
    const errors = validate(store.loginForm);
    setFormErrors(errors);

    if (Object.values(errors).every((error) => error === "")) {
      try {
        await store.login();
        // Navigate on successful login
        navigate("/");
      } catch (error) {
        // Handle login failure
        setLoginError("Email or password is incorrect");
      }
    }
  };

  const validate = (values) => {
    const errors = {
      email: "",
      password: "",
    };

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password should be at least 6 characters long";
    }

    return errors;
  };

  return (
    <div
      className="has-bg-img"
      style={{
        backgroundImage: `url(${image2})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div
        className="login template d-flex justify-content-center align-items-center vh-100
         position-absolute top-50 start-50 translate-middle"
      >
        <div className="form_container p-5 rounded bg-white">
          <img className="App-logo mb-4" src={logo} alt="logo" />
          <h3 className="text-center mb-4">Login</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-2">
              <input
                onChange={store.updateLoginForm}
                value={store.loginForm.email}
                className="form-control"
                placeholder="Enter Your Email"
                type="email"
                name="email"
              />
            </div>
            <p style={{color : '#ff0000'}}>{formErrors.email}</p>
            <div className="mb-2">
              <input
                className="form-control"
                onChange={store.updateLoginForm}
                value={store.loginForm.password}
                placeholder="Enter the Password"
                type="password"
                name="password"
              />
            </div>
            <p style={{color : '#ff0000'}}>{formErrors.password}</p>
            <p style={{color : '#ff0000'}}>{loginError}</p>
            <div className="d-grid">
              <button className="btn btn-primary mb-4" type="submit">
                Login
              </button>
            </div>
            <div>
              If you don't have an account? <br />
              <p className="text-center mt-2">
                Click here to
                <Link to="/signup" className="ms-2">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
