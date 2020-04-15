import React from "react";
import routes from "./routes.js";
import { withRouter } from "react-router-dom";
import Nav from "./Components/Nav/Nav";
import "./reset.css";
import "./App.scss";

function App(props) {
  console.log(props)
  return (
    <div className="App">
      {props.location.pathname === "/login" || props.location.pathname === "/register" ? (
        <>{routes}</>
      ) : (
        <>
          <Nav />
          {routes}
        </>
      )}
    </div>
  );
}

export default withRouter(App);
