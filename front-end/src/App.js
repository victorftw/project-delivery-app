import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import CustomerProducts from './pages/CustomerProducts';
import Register from './pages/Register';
import Provider from './contextAPI/provider';
import CustomerCheckout from './pages/CustomerCheckout';
import CustomerOrdersDetails from './pages/CustomerOrdersDetails';
import CustomerOrders from './pages/CustomerOrders';
import SellerOrders from './pages/SellerOrders';
import SellerOrdersDetails from './pages/SellerOrdersDetails';
import Admin from './pages/Admin';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/seller/orders/:id" component={ SellerOrdersDetails } />
        <Route exact path="/seller/orders" component={ SellerOrders } />
        <Route exact path="/customer/orders" component={ CustomerOrders } />
        <Route exact path="/customer/orders/:id" component={ CustomerOrdersDetails } />
        <Route exact path="/customer/checkout" component={ CustomerCheckout } />
        <Route exact path="/customer/products" component={ CustomerProducts } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/admin/manage" component={ Admin } />
        <Redirect exact from="/" to="/login" />
      </Switch>
    </Provider>
  );
}

export default App;
