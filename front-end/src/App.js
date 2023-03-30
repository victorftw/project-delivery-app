import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import CustomerProducts from './pages/CustomerProducts';
import Register from './pages/Register';

function App() {
  return (
    <Switch>
      <Route exact path="/login" component={ Login } />
      <Redirect exact from="/" to="/login" />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/products" component={ CustomerProducts } />
    </Switch>
  );
}

export default App;
