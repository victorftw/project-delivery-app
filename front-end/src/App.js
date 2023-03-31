import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import CustomerProducts from './pages/CustomerProducts';
import Register from './pages/Register';
import Provider from './contextAPI/provider';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/customer/products" component={ CustomerProducts } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/login" component={ Login } />
        <Redirect exact from="/" to="/login" />
      </Switch>
    </Provider>
  );
}

export default App;
