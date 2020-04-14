import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Nav.scss";

function Nav(props) {
  const handleLogout = () => {
    axios.get("/api/logout");
  };

  return (
    <div className="nav-bar">
      <Link to="/login">
        <p>Sign In</p>
      </Link>
      <Link to="/register">
        <p>Register</p>
      </Link>
      <p onClick={handleLogout}>Logout</p>
    </div>
  );
}

export default Nav;
