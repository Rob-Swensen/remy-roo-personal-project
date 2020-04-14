import React, { useState, useEffect } from "react";
import axios from 'axios';

function Products(props) {

    const [productsArray, setProductsArray] = useState([])

    useEffect(() => {
        axios.get('/api/products')
        .then(response => {
            setProductsArray(response.data)
        })
    }, [])

    console.log(productsArray)
    console.log(props)

    let mappedArray = productsArray.map((product, index) => (
        <div key={index} className='product-container' onClick={() => props.history.push(`/product/${product.product_id}`)}>
            <img src={product.image} alt={product.name} className='product-image'/>
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>${product.price}</p>
        </div>
    ))

  return(
      <div>
          {mappedArray}
      </div>
  )
}

export default Products;
