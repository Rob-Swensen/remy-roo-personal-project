import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutCustomer } from "../../redux/customerReducer";
import "./Nav.scss";

function Sidebar(props) {
  const handleLogout = () => {
    axios
      .get("/api/logout")
      .then(() => {
        props.logoutCustomer();
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

  const { first_name, is_admin } = props;
  return first_name ? (
    <div className={sidebarClass}>
      <p className="close-sidebar" onClick={closeHandler}>
        X
      </p>
      <div>
        <Link to="/products">
          <p>Products</p>
        </Link>
        <Link to="/cart">
          <p>Cart</p>
        </Link>
        <p onClick={handleLogout}>Logout</p>
        <span>
          {is_admin ? (
            <Link to="/form">
              <p>Add Product</p>
            </Link>
          ) : null}
        </span>
      </div>
    </div>
  ) : (
    <div className={sidebarClass}>
      <p className="close-sidebar" onClick={closeHandler}>
        X
      </p>
      <div>
        <Link to="/products">
          <p>Products</p>
        </Link>
        <Link to="/cart">
          <p>Cart</p>
        </Link>
        <Link to="/login">
          <p>Login</p>
        </Link>
        <Link to="/register">
          <p>Register</p>
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

export default connect(mapStateToProps, { logoutCustomer })(Sidebar);
