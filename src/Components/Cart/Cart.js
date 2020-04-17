import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

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
  };

  let mappedCartArray = cartArray.map((product, index) => (
    <div key={index} className="cart-container">
      <img src={product.image} alt={product.name} />
      <p>{product.name}</p>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={() => handleRemoveItem(product.product_id)}>
        Remove Item
      </button>
    </div>
  ));
  return (
    <div>
      <section>
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

export default connect(mapStateToProps)(Cart);
