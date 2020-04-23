import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import logo from "./primary_logo.png";
import menuIcon from "./menu_icon.png";
import cartIcon from "./shopping-cart.png";

function Nav(props) {
  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    if (!openSidebar) {
      setOpenSidebar(true);
    } else {
      setOpenSidebar(false);
    }
  };

  let sideBar;
  if (openSidebar) {
    sideBar = (
      <Sidebar
        visibility={openSidebar}
        close={toggleSidebar}
        sidebar={"sidebar"}
      />
    );
  }

  return (
    <div className="nav-bar">
      <Link to="/">
        <img className="nav-logo" src={logo} alt="website logo" />
      </Link>
      <section className="nav-icons">
        <Link to='/cart'>
          <img className="cart-icon" src={cartIcon} alt="cart icon" />
        </Link>
        <img
          className="menu-icon"
          src={menuIcon}
          alt="menu icon"
          onClick={toggleSidebar}
        />
      </section>
      {sideBar}
    </div>
  );
}

export default Nav;
