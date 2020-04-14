import React from "react";
import routes from "./routes.js";
import Nav from "./Components/Nav/Nav";
import "./reset.css";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Nav />
      {routes}
    </div>
  );
}

export default App;
