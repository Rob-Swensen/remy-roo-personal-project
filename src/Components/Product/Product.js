import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Product.scss";
import { connect } from "react-redux";

function Product(props) {
  const [productObj, setProductObj] = useState({});

  useEffect(() => {
    const { productId } = props.match.params;
    axios.get(`/api/product/${productId}`).then((response) => {
      setProductObj(response.data[0]);
    });
  });

  const handleAddToCart = (cart_id) => {
    const { product_id } = productObj;
    axios.post(`/api/cart/${cart_id}`, { product_id });
  };

  return (
    <div className="product-main">
      <div className="product-card">
        <img
          className="product-image"
          src={productObj.image}
          alt={productObj.name}
        />
        <div className='button-price-description'>
          <p className='price'>${productObj.price}</p>
          <button onClick={() => handleAddToCart(props.cart_id)} className="add-cart-button">
            Add To Cart
          </button>
          <p>{productObj.description}</p>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => {
  const { customer_id, cart_id } = reduxState.customer;
  return {
    customer_id,
    cart_id,
  };
};

export default connect(mapStateToProps)(Product);
