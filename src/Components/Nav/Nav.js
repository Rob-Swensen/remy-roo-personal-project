import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Link, withRouter } from "react-router-dom";
import logo from "./primary_logo.png";
import menuIcon from "./menu_icon.png";
import cartIcon from "./shopping-cart.png";
import axios from "axios";
import { connect } from "react-redux";
import { getCartCount } from "../../redux/cartReducer";
import { logoutCustomer } from "../../redux/customerReducer";

function Nav(props) {
  const [openSidebar, setOpenSidebar] = useState(false);

  const { cart_id } = props;
  useEffect(() => {
    axios
      .get(`/api/cart-count/${cart_id}`)
      .then((response) => {
        props.getCartCount(response.data[0].count);
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

  const handleLogout = () => {
    axios
      .get("/api/logout")
      .then(() => {
        props.logoutCustomer();
        props.history.push("/");
      })
      .catch((err) => console.log(err));
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
        <section className="header-links">
          <Link to="/products">
            <p>Products</p>
          </Link>
          <Link to="/cart">
            <p>Cart</p>
          </Link>
          <Link to="/orders">
            <p>Orders</p>
          </Link>
          <Link to="/contact">
            <p>Contact</p>
          </Link>
          <span>
            {props.first_name ? (
              <p onClick={handleLogout}>Logout</p>
            ) : (
              <Link to="/login">
                <p>Login</p>
              </Link>
            )}
          </span>
        </section>
        <Link to="/cart">
          <img className="cart-icon" src={cartIcon} alt="cart icon" />
        </Link>
        <span>
          {props.cart_count > 0 ? (
            <div className="cart-counter">{props.cart_count}</div>
          ) : null}
        </span>
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
  const { cart_id, first_name } = reduxState.customer;
  const { cart_count } = reduxState.cartCount;
  return {
    first_name,
    cart_id,
    cart_count,
  };
};

export default connect(mapStateToProps, { getCartCount, logoutCustomer })(
  withRouter(Nav)
);
