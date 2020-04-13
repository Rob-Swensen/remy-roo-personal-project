import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "./Components/Auth/Auth";
import Cart from "./Components/Cart/Cart";
import Dashboard from "./Components/Dashboard/Dashboard";
import Form from "./Components/Form/Form";
import Orders from "./Components/Orders/Orders";
import Product from "./Components/Product/Product";
import Products from "./Components/Products/Products";
import PageNotFound from "./Components/PageNotFound";

export default (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route path="/auth" component={Auth} />
    <Route path="/products" component={Products} />
    <Route path="/product" component={Product} />
    <Route path="/cart" component={Cart} />
    <Route path="/orders" component={Orders} />
    <Route path="/form" component={Form} />
    <Route component={PageNotFound} />
  </Switch>
);
