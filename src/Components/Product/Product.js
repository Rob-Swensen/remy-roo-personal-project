import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Product.scss";
import { connect } from "react-redux";
import { getCartCount } from "../../redux/cartReducer";
import { withRouter } from "react-router-dom";

function Product(props) {
  const [productObj, setProductObj] = useState({}),
    [defaultImage, setDefaultImage] = useState("");

  useEffect(() => {
    const { productId } = props.match.params;
    axios.get(`/api/product/${productId}`).then((response) => {
      setProductObj(response.data[0]);
      setDefaultImage(response.data[0].image);
    });
  }, []);

  const handleAddToCart = (cart_id) => {
    const { product_id } = productObj;
    axios.post(`/api/cart/${cart_id}`, { product_id });
    axios.get(`/api/cart-count/${cart_id}`).then((response) => {
      props.getCartCount(response.data[0].count);
    });
  };

  const handleDeleteProduct = (product_id) => {
    axios
      .delete(`/api/products/${product_id}`)
      .then((response) => alert("Product Deleted"))
      .catch((err) => console.log(err));
  };

  const changeImage = (src) => {
    setDefaultImage(src);
  };

  return (
    <div className="product-main">
      <div className="product-card">
        <section className="default-img-section">
          <img
            className="product-image"
            src={defaultImage}
            alt={productObj.name}
          />
        </section>
        <div className="button-price-description">
          <p className="price">${productObj.price}</p>
          <button
            onClick={() => handleAddToCart(props.cart_id)}
            className="add-cart-button"
          >
            Add To Cart
          </button>
          <p>{productObj.description}</p>
          <section className="thumbnail-img-section">
            <img
              className="thumbnail-img"
              src={productObj.image}
              onClick={() => changeImage(productObj.image)}
              alt="main bandana"
            />
            <img
              className="thumbnail-img"
              src={productObj.image_2}
              onClick={() => changeImage(productObj.image_2)}
              alt="flat bandana"
            />
            <img
              className="thumbnail-img"
              src={productObj.image_3}
              onClick={() => changeImage(productObj.image_3)}
              alt="dog wearing bandana"
            />
          </section>
        </div>
        <span>
          {props.is_admin ? (
            <button
              className="delete-product-button"
              onClick={() => handleDeleteProduct(productObj.product_id)}
            >
              Delete Product
            </button>
          ) : null}
        </span>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => {
  const { customer_id, cart_id, is_admin } = reduxState.customer;
  return {
    customer_id,
    cart_id,
    is_admin,
  };
};

export default connect(mapStateToProps, { getCartCount })(withRouter(Product));
