import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import CustomerProducts from './pages/CustomerProducts';
import Register from './pages/Register';
import CustomerCheckout from './pages/CustomerCheckout';
import CustomerOrdersDetails from './pages/CustomerOrdersDetails';
import CustomerOrders from './pages/CustomerOrders';

function App() {
  return (
    <Switch>
      <Route exact path="/customer/checkout" component={ CustomerCheckout } />
      <Route exact path="/login" component={ Login } />
      <Redirect exact from="/" to="/login" />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/products" component={ CustomerProducts } />
      <Route exact path="/customer/orders" component={ CustomerOrders } />
      <Route exact path="/customer/orders/:id" component={ CustomerOrdersDetails } />
    </Switch>
  );
}

export default App;
