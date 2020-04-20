import React, { useState, useEffect } from "react";
import axios from "axios";
import './Products.scss';

function Products(props) {
  const [productsArray, setProductsArray] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProductsArray(response.data);
    });
  }, []);

  console.log(productsArray);
  console.log(props);

  let mappedArray = productsArray.map((product, index) => {return(
<div
      key={index}
      className="product-container"
      onClick={() => props.history.push(`/product/${product.product_id}`)}
    >
      <img className="product-image" src={product.image} alt={product.name} />
      <div className='product-text-container'>
        <p>{product.name}</p>
        <p>{product.description}</p>
        <p>${product.price}</p>
      </div>
    </div>
  )});
  return(
      <div className='main-container'>
          {mappedArray}
      </div>
  )
}

export default Products;
