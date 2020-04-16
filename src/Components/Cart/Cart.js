import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

function Cart(props) {
  const [cartArray, setCartArray] = useState([]);

  useEffect(() => {
    const { cart_id } = props;
    axios.get(`/api/cart/${cart_id}`).then((response) => {
      setCartArray(response.data);
    });
  }, [cartArray]);


  const handleRemoveItem = (product_id) => {
      const {cart_id} = props;
      axios.delete(`/api/cart/${cart_id}/${product_id}`)
  }

  let mappedCartArray = cartArray.map((product, index) => (
      <div key={index} className='cart-container'>
          <img src={product.image} alt={product.name}/>
          <p>{product.name}</p>
          <p>{product.description}</p>
          <p>${product.price}</p>
          <button onClick={() => handleRemoveItem(product.product_id)}>Remove Item</button>
      </div>
  ))

  return <div>{mappedCartArray}</div>;
}
const mapStateToProps = (reduxState) => {
  const { cart_id } = reduxState.customer;
  return {
    cart_id,
  };
};

export default connect(mapStateToProps)(Cart);
