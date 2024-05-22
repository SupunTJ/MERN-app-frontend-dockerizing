import authStore from "../stores/authStore";
import React, { useState, useEffect } from "react";
import logo from "./images/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import image2 from "../components/images/music2.jpg";

export default function SignupForm() {
  const store = authStore();
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    email: "",
    password: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    const errors = validate(store.signupForm);
    setFormErrors(errors);

    if (Object.values(errors).every((error) => error === "")) {
      await store.signup();
      navigate("/login");
    }
  };

  const validate = (values) => {
    const errors = {
      firstName: "",
      lastName: "",
      birthday: "",
      email: "",
      password: "",
    };

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.firstName) {
      errors.firstName = "First Name is required";
    }

    if (!values.lastName) {
      errors.lastName = "Last Name is required";
    }

    if (!values.birthday) {
      errors.birthday = "Birthday is required";
    }

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
        className="login template d-flex justify-content-center
         position-absolute align-items-center top-50 start-50 translate-middle vh-100 "
      >
        <div className="form_container p-5 rounded">
          <img className="App-logo mb-4" src={logo} alt="logo" />
          <h3 className="text-center mb-4">Sign Up</h3>
          <form onSubmit={handleSignup}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ flex: 1, marginRight: "5px" }}>
                <div className="mb-2">
                  <input
                    className="form-control"
                    placeholder="First Name"
                    onChange={store.updateSignupForm}
                    value={store.signupForm.firstName}
                    type="text"
                    name="firstName"
                  />
                </div>
                <p style={{color : '#ff0000'}}>{formErrors.firstName}</p>
              </div>
              <div style={{ flex: 1, marginLeft: "5px" }}>
                <div className="mb-2">
                  <input
                    className="form-control"
                    placeholder="Last Name"
                    onChange={store.updateSignupForm}
                    value={store.signupForm.lastName}
                    type="text"
                    name="lastName"
                  />
                </div>
                <p style={{color : '#ff0000'}}>{formErrors.lastName}</p>
              </div>
            </div>
            <div className="mb-2">
              <input
                className="form-control"
                placeholder="Birthday"
                onChange={store.updateSignupForm}
                value={store.signupForm.birthday}
                type="date"
                name="birthday"
              />
            </div>
            <p style={{color : '#ff0000'}}>{formErrors.birthday}</p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ flex: 1, marginRight: "5px" }}>
                <div className="mb-2">
                  <input
                    className="form-control"
                    placeholder="Enter Your Email"
                    onChange={store.updateSignupForm}
                    value={store.signupForm.email}
                    type="email"
                    name="email"
                  />
                </div>
                <p style={{color : '#ff0000'}}>{formErrors.email}</p>
              </div>
              <div style={{ flex: 1, marginLeft: "5px" }}>
                <div className="mb-2">
                  <input
                    className="form-control"
                    placeholder="Enter the Password"
                    onChange={store.updateSignupForm}
                    value={store.signupForm.password}
                    type="password"
                    name="password"
                  />
                </div>
                <p style={{color : '#ff0000'}}>{formErrors.password}</p>
              </div>
            </div>
            <div className="d-grid mb-2">
              <button className="btn btn-primary mb-4" type="submit">
                Register
              </button>
            </div>

            <div>
              If you already have an account <br />
              <p className="text-center mt-2">
                Click here to
                <Link to="/login" className="ms-2">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
