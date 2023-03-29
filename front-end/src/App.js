import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import CustomerProducts from './pages/CustomerProducts';

function App() {
  return (
    <Switch>
      <Route exact path="/customer/products" component={ CustomerProducts } />
      <Route exact path="/login" component={ Login } />
      <Redirect exact from="/" to="/login" />
    </Switch>
  );
}

export default App;
