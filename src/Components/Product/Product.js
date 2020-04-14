import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Product.scss";

function Product(props) {
  const [productObj, setProductObj] = useState({});

  useEffect(() => {
    const { productId } = props.match.params;
    axios.get(`/api/product/${productId}`).then((response) => {
      setProductObj(response.data[0]);
    });
  }, []);

  console.log(productObj);
  return (
    <div className="product-card">
      <img
        className="product-image"
        src={productObj.image}
        alt={productObj.name}
      />
      <p>{productObj.description}</p>
      <p>${productObj.price}</p>
      <button>Add To Cart</button>
    </div>
  );
}

export default Product;
