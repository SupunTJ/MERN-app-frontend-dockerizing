import React from "react";
import newlogo from "./images/logo3.png"; 

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-dark bg-gradient text-light">
        <a href="/" className="navbar-brand">
          <img
            src={newlogo}
            alt="Your Logo"
            width="40px"
            height="40px"
            className="p-0"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        ></button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/* <li className="nav-item">
              <a className="nav-link" href="#">
                <h6 className="text-light">About</h6>
              </a>
            </li> */}
            <li className="nav-item">
              <a className="nav-link" href="http://localhost:3001/login">
                <h6 className="text-light">Login</h6>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://localhost:3001/logout">
                <h6 className="text-light">Logout</h6>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
