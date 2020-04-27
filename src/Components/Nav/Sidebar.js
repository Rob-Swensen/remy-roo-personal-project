import React, { useState } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutCustomer } from "../../redux/customerReducer";
import "./Nav.scss";

function Sidebar(props) {
  const handleLogout = () => {
    axios
      .get("/api/logout")
      .then(() => {
        props.logoutCustomer();
        props.history.push("/");
      })
      .catch((err) => console.log(err));
  };

  const [sidebarClass, setSidebarClass] = useState(props.sidebar);

  const closeHandler = () => {
    setSidebarClass("sidebar close");
    setTimeout(() => {
      props.close();
    }, 1000);
  };

  window.onclick = function (event) {
    let modal = document.querySelector("#sidebar");
    let hamburger = document.querySelector(".menu-icon");
    if (event.target !== modal && event.target !== hamburger) {
      setSidebarClass("sidebar close");
      setTimeout(() => {
        props.close();
      }, 1000);
    }
  };

  const { first_name, is_admin } = props;
  return first_name ? (
    <div id="sidebar" className={sidebarClass}>
      <div className="link-container">
        <Link to="/products">
          <p onClick={closeHandler}>Products</p>
        </Link>
        <Link to="/cart">
          <p onClick={closeHandler}>Cart</p>
        </Link>
        <Link to="/orders">
          <p onClick={closeHandler}>Orders</p>
        </Link>
        <p onClick={handleLogout}>Logout</p>
        <Link to="/contact">
          <p>Contact</p>
        </Link>
        <span>
          {is_admin ? (
            <Link to="/form">
              <p onClick={closeHandler}>Add Product</p>
            </Link>
          ) : null}
        </span>
      </div>
    </div>
  ) : (
    <div id="sidebar" className={sidebarClass}>
      <div className="link-container">
        <Link to="/products">
          <p onClick={closeHandler}>Products</p>
        </Link>
        <Link to="/cart">
          <p onClick={closeHandler}>Cart</p>
        </Link>
        <Link to="/login">
          <p onClick={closeHandler}>Login</p>
        </Link>
        <Link to="/register">
          <p onClick={closeHandler}>Register</p>
        </Link>
        <Link to="/contact">
          <p>Contact</p>
        </Link>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => {
  const { first_name, is_admin } = reduxState.customer;
  return {
    first_name,
    is_admin,
  };
};

export default connect(mapStateToProps, { logoutCustomer })(
  withRouter(Sidebar)
);
