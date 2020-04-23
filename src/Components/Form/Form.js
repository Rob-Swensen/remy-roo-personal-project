import React, { useState } from "react";
import axios from "axios";
import "./Form.scss";
import { connect } from "react-redux";

function Form(props) {
  const [nameInput, setNameInput] = useState("");
  const [defaultImageInput, setDefaultImageInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [altImageInputOne, setAltImageInputOne] = useState("");
  const [altImageInputTwo, setAltImageInputTwo] = useState("");

  const handleAddItem = () => {
    axios.post("/api/products", {
      name: nameInput,
      image: defaultImageInput,
      description: descriptionInput,
      price: priceInput,
      image_2: altImageInputOne,
      image_3: altImageInputTwo,
    })
    .then(response => alert('Product Added Successfully'))
    .catch(err => console.log(err))
  };

  const { is_admin } = props;
  return (
    <span>
      {" "}
      {is_admin ? (
        <div className="form-page">
          <section className="form-card">
            <p>Product Name:</p>
            <input
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
            <p>Product Default Image:</p>
            <input
              value={defaultImageInput}
              onChange={(e) => setDefaultImageInput(e.target.value)}
            />
            <p>Description:</p>
            <input
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
            />
            <p>Price:</p>
            <input
              value={priceInput}
              onChange={(e) => setPriceInput(e.target.value)}
            />
            <p>Alternative Image 1:</p>
            <input
              value={altImageInputOne}
              onChange={(e) => setAltImageInputOne(e.target.value)}
            />
            <p>Alternative Image 2:</p>
            <input
              value={altImageInputTwo}
              onChange={(e) => setAltImageInputTwo(e.target.value)}
            />
          </section>
          <button className="add-item-button" onClick={handleAddItem}>
            Add Item
          </button>
        </div>
      ) : (
        <p className="not-authorized">
          You are not authorized to view this page
        </p>
      )}
    </span>
  );
}

const mapStateToProps = (reduxState) => {
  const { is_admin } = reduxState.customer;
  return {
    is_admin,
  };
};

export default connect(mapStateToProps)(Form);
