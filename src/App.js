import React from "react";
import routes from "./routes.js";
import { withRouter } from "react-router-dom";
import Nav from "./Components/Nav/Nav";
import "./reset.css";
import "./App.scss";

function App(props) {
  return (
    <div className="App">
      <Nav />
      {routes}
    </div>
  );
}

export default withRouter(App);
