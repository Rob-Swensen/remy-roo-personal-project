import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getCustomer } from "../../redux/customerReducer";

function Register(props) {
  const [emailInput, setEmail] = useState(""),
    [passwordInput, setPassword] = useState(""),
    [firstNameInput, setFirstName] = useState(""),
    [lastNameInput, setLastName] = useState("");

  const handleRegister = () => {
    axios
      .post("/api/register", {
        email: emailInput,
        password: passwordInput,
        first_name: firstNameInput,
        last_name: lastNameInput,
      })
      .then((response) => {
        props.getCustomer(response.data);
        props.history.push("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <p>Email: </p>
      <input onChange={(e) => setEmail(e.target.value)} value={emailInput} />
      <p>Password:</p>
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={passwordInput}
        type="password"
      />
      <p>First Name:</p>
      <input
        onChange={(e) => setFirstName(e.target.value)}
        value={firstNameInput}
      />
      <p>Last Name:</p>
      <input
        onChange={(e) => setLastName(e.target.value)}
        value={lastNameInput}
      />
      <br></br>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default connect(null, { getCustomer })(Register);
