import React from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';

export default function AdminNavbar() {
  const { state: user } = useLocalStorage('user', {});
  const history = useHistory();
  return (
    <header>
      <div>
        <button
          data-testid="customer_products__element-navbar-link-orders"
          type="button"
          onClick={ () => history.push('/admin/manage') }
        >
          Gerenciar Usuários
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
