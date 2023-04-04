import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import context from './context';

function Provider({ children }) {
  const [productsArray, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [newUserRegisterByAdmin, setNewUserRegisterByAdmin] = useState(false);

  const contextValue = useMemo(() => {
    const objState = {
      productsArray,
      cartProducts,
      totalValue,
      setProducts,
      setCartProducts,
      setTotalValue,
      newUserRegisterByAdmin,
      setNewUserRegisterByAdmin,
    };
    return objState;
  }, [
    productsArray,
    cartProducts,
    totalValue,
    setProducts,
    setCartProducts,
    setTotalValue,
    newUserRegisterByAdmin,
    setNewUserRegisterByAdmin,
  ]);

  return (
    <context.Provider value={ contextValue }>
      { children }
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
