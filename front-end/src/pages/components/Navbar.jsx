import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import '../../css/Navbar.css';

export default function Navbar() {
  const { state: user } = useLocalStorage('user', {});
  const [display, setDisplay] = useState('');
  const history = useHistory();
  const { pathname } = window.location;
  const lastIndex = pathname.lastIndexOf('/');
  let classProducts = 'buttonProductsNavbar';
  let classPedidos = 'buttonPedidosNavbar';
  const result = pathname.substring(lastIndex + 1);
  if (result === 'products') classProducts = 'buttonProductsNavbar select';
  if (result !== 'products') classPedidos = 'buttonPedidosNavbar select';

  useEffect(() => {
    if (user.role === 'seller') {
      setDisplay('None');
    }
  }, [user.role]);

  return (
    <header className="container-nav">
      <div className="nav-products">
        <button
          className={ classProducts }
          type="button"
          style={ { display } }
          onClick={ () => history.push('/customer/products') }
          data-testid="customer_products__element-navbar-link-products"
        >
          Produtos
        </button>
        <button
          className={ classPedidos }
          data-testid="customer_products__element-navbar-link-orders"
          type="button"
          onClick={ () => {
            if (user.role === 'customer') history.push('/customer/orders');
            if (user.role === 'seller') history.push('/seller/orders');
          } }
        >
          {
            user.role === 'seller' ? 'Pedidos' : 'Meus Pedidos'
          }
        </button>
      </div>
      <div style={ { backgroundColor: '#036b52', width: '100%' } } />
      <div className="nav-user">
        <div data-testid="customer_products__element-navbar-user-full-name">
          {user.name}
        </div>
        <button
          data-testid="customer_products__element-navbar-link-logout"
          type="button"
          onClick={ () => {
            localStorage.clear();
            history.push('/login');
          } }
        >
          Sair
        </button>
      </div>
    </header>
  );
}
