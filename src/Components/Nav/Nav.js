import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import logo from "./primary_logo.png";
import menuIcon from "./menu_icon.png";
import cartIcon from "./shopping-cart.png";
import axios from "axios";
import { connect } from "react-redux";
import {getCartCount} from '../../redux/cartReducer';

function Nav(props) {
  const [openSidebar, setOpenSidebar] = useState(false);

  const { cart_id } = props;
  useEffect(() => {
    axios.get(`/api/cart-count/${cart_id}`).then((response) => {
      console.log(response.data)
      props.getCartCount(response.data[0].count)
    })
    .catch((err) => console.log(err));
  }, [props]);


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

console.log(props)
  return (
    <div className="nav-bar">
      <Link to="/">
        <img className="nav-logo" src={logo} alt="website logo" />
      </Link>
      <section className="nav-icons">
        <Link to="/cart">
          <img className="cart-icon" src={cartIcon} alt="cart icon" />
        </Link>
        <span>{props.cart_count > 0 ? (<div className='cart-counter'>{props.cart_count}</div>) : null}</span>
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

const mapStateToProps = (reduxState) => {
  const { cart_id } = reduxState.customer;
  const { cart_count } = reduxState.cartCount;
  return {
    cart_id,
    cart_count
  };
};

export default connect(mapStateToProps, {getCartCount})(Nav);
