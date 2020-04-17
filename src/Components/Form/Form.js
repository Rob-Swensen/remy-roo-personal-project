import React, { useState } from "react";
import { connect } from "react-redux";
import axios from 'axios';

function Form(props) {
  const [nameInput, setName] = useState(""),
    [imageInput, setImage] = useState(""),
    [descriptionInput, setDescription] = useState(""),
    [priceInput, setPrice] = useState(0),

  handleAddItem = () => {
    axios.post('/api/products', {name: nameInput, image: imageInput, description: descriptionInput, price: priceInput})
    .then(response => alert('Item Added'))
  }

  const { is_admin } = props;
  return is_admin ? (
    <div>
      <input
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
        value={nameInput}
      />
      <input
        placeholder="image"
        onChange={(e) => setImage(e.target.value)}
        value={imageInput}
      />
      <input
        placeholder="description"
        onChange={(e) => setDescription(e.target.value)}
        value={descriptionInput}
      />
      <input
        placeholder="price"
        onChange={(e) => setPrice(e.target.value)}
        value={priceInput}
      />
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  ) : (
      <h1>Not Authorized to View This Page</h1>
  );
}

const mapStateToProps = (reduxState) => {
  const { is_admin } = reduxState.customer;
  return {
    is_admin,
  };
};

export default connect(mapStateToProps)(Form);
