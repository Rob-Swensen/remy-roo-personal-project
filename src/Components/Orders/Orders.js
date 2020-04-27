import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import './Orders.scss';

function Orders(props) {
  const [ordersArray, setOrdersArray] = useState([]);

  useEffect(() => {
    axios.get(`/api/orders/${props.customer_id}`).then((response) => {
      setOrdersArray(response.data);
    });
  }, []);

  let mappedOrders = ordersArray.map((product, index) => {
    return (
      <div
        key={index}
        className="product-container"
        onClick={() => props.history.push(`/product/${product.product_id}`)}
      >
        <img
          className="products-image"
          src={product.image}
          alt={product.name}
        />
        <div className="product-text-container">
          <p className="products-bold-text">{product.name}</p>
          <p className="products-bold-text">${product.price}</p>
        </div>
      </div>
    );
  });
  return <div className='orders-page'>{mappedOrders}</div>;
}

const mapStateToProps = (reduxState) => {
  const { customer_id } = reduxState.customer;
  return {
    customer_id,
  };
};

export default connect(mapStateToProps)(Orders);
