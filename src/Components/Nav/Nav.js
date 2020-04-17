import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutCustomer } from "../../redux/customerReducer";
import "./Nav.scss";

function Nav(props) {
  const handleLogout = () => {
    axios
      .get("/api/logout")
      .then(() => {
        props.logoutCustomer();
      })
      .catch((err) => console.log(err));
  };

  const { first_name, is_admin } = props;
  console.log(props);
  return first_name ? (
    <div className="nav-bar">
      <Link to="/products">
        <p>Products</p>
      </Link>
      <Link to="/cart">
        <p>Cart</p>
      </Link>
      <p onClick={handleLogout}>Logout</p>
      <span>
        {is_admin ? (
          <Link to='/form'>
            <p>Add Product</p>
          </Link>
        ) : null}
      </span>
    </div>
  ) : (
    <div className="nav-bar">
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
  );
}

const mapStateToProps = (reduxState) => {
  const { first_name, is_admin } = reduxState.customer;
  return {
    first_name,
    is_admin,
  };
};

export default connect(mapStateToProps, { logoutCustomer })(Nav);
