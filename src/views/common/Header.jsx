import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/btt-style.css";

const Header = () => {
  return (
    <div className="btt-nav">
      <header>
        <ul className="btt-navbar">
          <li className="active">
            <Link to="/" className="navlink">
              Home
            </Link>
          </li>
          <li style={{ float: "right" }}>
            <Link to="/about">About</Link>
          </li>
          <li style={{ float: "right" }}>
            <Link to="/faq">FAQ</Link>
          </li>
          <li style={{ float: "right" }}>
            <Link to="/login">Login</Link>
          </li>
          <li style={{ float: "right" }}>
            <Link to="/registration">Registration</Link>
          </li>
          <li style={{ float: "right" }}>
            <Link to="/dashboard">User Dashboard</Link>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Header;
