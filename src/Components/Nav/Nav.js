import React from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import logo from "./primary_logo.png";
import menuIcon from "./menu_icon.png";

function Nav(props) {
  return (
    <div>
      <Link to="/">
        <img className="nav-logo" src={logo} alt="website logo" />
      </Link>
      <img className="menu-icon" src={menuIcon} alt="menu icon" />
      <Sidebar />
    </div>
  );
}

export default Nav;
