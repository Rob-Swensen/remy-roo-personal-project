import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCustomer } from "../../redux/customerReducer";
import "./Login.scss";
import backgroundImage from "./background_logo.png";

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
    <div className="auth-page">
      <img className='auth-background-img' src={backgroundImage} alt='company logo'/>
      <section className="login-card">
        <p>Email:</p>
        <input onChange={(e) => setEmail(e.target.value)} value={emailInput} />
        <p>Password:</p>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={passwordInput}
          type="password"
        />
        <button onClick={handleLogin}>Login</button>
        <Link to="/register">
          <p>Create an Account</p>
        </Link>
      </section>
    </div>
  );
}

export default connect(null, { getCustomer })(Login);
