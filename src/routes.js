import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Cart from "./Components/Cart/Cart";
import Dashboard from "./Components/Dashboard/Dashboard";
import Form from "./Components/Form/Form";
import Orders from "./Components/Orders/Orders";
import Product from "./Components/Product/Product";
import Products from "./Components/Products/Products";
import PageNotFound from "./Components/PageNotFound";
import Checkout from "./Components/Checkout/Checkout";
import Contact from "./Components/Contact/Contact";

export default (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/products" component={Products} />
    <Route path="/product/:productId" component={Product} />
    <Route path="/cart" component={Cart} />
    <Route path="/orders" component={Orders} />
    <Route path="/form" component={Form} />
    <Route path="/checkout" component={Checkout} />
    <Route path="/contact" component={Contact} />
    <Route component={PageNotFound} />
  </Switch>
);
