import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Cart.scss";
import { connect } from "react-redux";
import {getCartCount} from '../../redux/cartReducer';

function Cart(props) {
  const [cartArray, setCartArray] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    getCartInfo();
  }, []);

  const getCartInfo = () => {
    const { cart_id } = props;
    axios.get(`/api/cart/${cart_id}`).then((response) => {
      setCartArray(response.data);
      axios.get(`/api/subtotal/${cart_id}`).then((response) => {
        setSubtotal(response.data[0]);
      });
    });
  };

  const handleRemoveItem = (product_id) => {
    const { cart_id } = props;
    axios.delete(`/api/cart/${cart_id}/${product_id}`).then((response) => {
      getCartInfo();
    });
    axios.get(`/api/cart-count/${cart_id}`).then((response) => {
      props.getCartCount(response.data[0].count)
    });
  };

  let mappedCartArray = cartArray.map((product, index) => (
    <div key={index} className="cart-item-container" >
      <img className="cart-item-image" src={product.image} alt={product.name} />
      <section className="cart-item-details">
        <p className="cart-item-name">{product.name}</p>
        <p>{product.description}</p>
        <p>${product.price}</p>
        <button
          className="remove-item-button"
          onClick={() => handleRemoveItem(product.product_id)}
        >
          Remove Item
        </button>
      </section>
    </div>
  ));
  return (
    <div className="main-cart-container">
      <section className="cart-details">
        <p>Subtotal: ${subtotal.sum}</p>
        <button onClick={() => props.history.push("/checkout")}>
          Checkout
        </button>
      </section>
      {mappedCartArray}
    </div>
  );
}
const mapStateToProps = (reduxState) => {
  const { cart_id } = reduxState.customer;
  return {
    cart_id,
  };
};

export default connect(mapStateToProps, {getCartCount})(Cart);
