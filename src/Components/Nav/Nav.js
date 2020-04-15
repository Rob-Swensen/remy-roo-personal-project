import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {logoutCustomer} from '../../redux/customerReducer';
import "./Nav.scss";

function Nav(props) {

  const handleLogout = () => {
    axios.get("/api/logout")
    .then(() => {
    props.logoutCustomer();
    })
    .catch(err => console.log(err))
  };

  const { first_name } = props;
  return first_name ? (
    <div className='nav-bar'>
      <p onClick={handleLogout}>Logout</p>
    </div>
  ) : (
    <div className='nav-bar'>
      <Link to='/login'>
        <p>Login</p>
      </Link>
      <Link to='/register'>
        <p>Register</p>
      </Link>
    </div>
  );
}

const mapStateToProps = (reduxState) => {
  const { first_name } = reduxState.customer;
  return {
    first_name,
  };
};

export default connect(mapStateToProps, {logoutCustomer})(Nav);
