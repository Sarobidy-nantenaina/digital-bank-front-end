import React from "react";
import { Link } from "react-router-dom";
import digital_logo from "./assets/digital_logo.png";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      style={{ height: "80px" }}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src={digital_logo}
            alt="Logo"
            width="90"
            height="70"
            className="d-inline-block align-top"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item mx-4">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item mx-4">
              <Link className="nav-link" to="/createAccount">
                New Account
              </Link>
            </li>
            <li className="nav-item mx-4">
              <Link className="nav-link" to="/list-accounts">
                List Accounts
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
