import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Cart.scss";
import { connect } from "react-redux";
import { getCartCount } from "../../redux/cartReducer";
import { getNewCart } from "../../redux/customerReducer";
import StripeCheckout from "react-stripe-checkout";
import stripe from "../../stripe";

function Cart(props) {
  const [cartArray, setCartArray] = useState([]),
    [subtotal, setSubtotal] = useState(0);

  let amount = subtotal.sum * 100;

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
      props.getCartCount(response.data[0].count);
    });
  };

  const handleQtyChange = (product_id, quantity) => {
    const { cart_id } = props;
    axios
      .put(`/api/cart/product-quantity/${cart_id}/${product_id}`, { quantity })
      .then((response) => {
        getCartInfo();
      })
      .catch((err) => console.log(err));
  };

  const onToken = async (token) => {
    token.card = void 0;

    await axios
      .post("/api/payment", { token, amount: amount })
      .then(() => {
        axios.put(`/api/payment/${props.cart_id}`).then(() =>
          axios.post(`/api/new_cart/${props.customer_id}`).then((response) => {
            console.log(response.data)
            props.getNewCart(response.data[0]);
            
          })
        );
      })
      .catch((err) => console.log(err));
  };

  let mappedCartArray = cartArray.map((product, index) => (
    <div key={index} className="cart-item-container">
      <img className="cart-item-image" src={product.image} alt={product.name} />
      <section className="cart-item-details">
        <p className="cart-item-name">{product.name}</p>
        <p>${product.price}</p>
        <p>Qty</p>
        <select
          className="qty-selector"
          defaultValue={product.qty}
          onChange={(e) => handleQtyChange(product.product_id, e.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
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
        <p className="cart-details-items-count">
          You have {props.cart_count} item(s) in your cart.
        </p>
        <p>Subtotal: ${subtotal.sum}</p>
        <StripeCheckout
          label="Checkout"
          token={onToken}
          stripeKey={stripe.publicKey}
          amount={amount}
          shippingAddress={true}
          billingAddress={true}
        />
      </section>
      {mappedCartArray}
    </div>
  );
}
const mapStateToProps = (reduxState) => {
  const { customer_id, cart_id } = reduxState.customer;
  const { cart_count } = reduxState.cartCount;
  return {
    customer_id,
    cart_id,
    cart_count,
  };
};

export default connect(
  mapStateToProps,
  { getCartCount, getNewCart }
)(Cart);
