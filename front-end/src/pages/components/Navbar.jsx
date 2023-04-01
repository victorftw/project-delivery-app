import React from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';

export default function Navbar() {
  const { state: user } = useLocalStorage('user', {});
  const history = useHistory();
  return (
    <header>
      <div>
        <button
          type="button"
          onClick={ () => history.push('/customer/products') }
          data-testid="customer_products__element-navbar-link-products"
        >
          Produtos
        </button>
        <button
          data-testid="customer_products__element-navbar-link-orders"
          type="button"
          onClick={ () => history.push('/customer/orders') }
        >
          Meus Pedidos
        </button>
      </div>

      <div>
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
