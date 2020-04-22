import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Products.scss";

function Products(props) {
  const [productsArray, setProductsArray] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProductsArray(response.data);
    });
  }, []);

  let mappedArray = productsArray.map((product, index) => {
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
          <p>{product.description}</p>
          <p className="products-bold-text">${product.price}</p>
        </div>
      </div>
    );
  });
  return <div className="main-container">{mappedArray}</div>;
}

export default Products;
