import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCustomer } from "../../redux/customerReducer";

function Login(props) {
  const [emailInput, setEmail] = useState(""),
    [passwordInput, setPassword] = useState("");

  const handleLogin = () => {
    axios
      .post("/api/login", { email: emailInput, password: passwordInput })
      .then((response) => {
        props.getCustomer(response.data);
        props.history.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={emailInput}
        placeholder="email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={passwordInput}
        placeholder="password"
        type="password"
      />
      <button onClick={handleLogin}>Login</button>
      <Link to="/register">
        <p>Create an Account</p>
      </Link>
    </div>
  );
}

export default connect(null, {getCustomer})(Login);
