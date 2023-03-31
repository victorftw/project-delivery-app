import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import Navbar from './components/Navbar';

function CustomerOrders() {
  const { state: user } = useLocalStorage('user', {});
  const [sales, setSales] = useState();
  const { push } = useHistory();

  const handleClick = (id) => {
    push(`/customer/orders/${id}`);
  };

  useEffect(() => {
    const load = async () => {
      const responseUser = await fetch('http://localhost:3001/user', {
        method: 'GET',
        mode: 'cors',
      });
      const users = await responseUser.json();
      const findUser = users.find((e) => e.email === user.email);
      const response = await fetch(
        `http://localhost:3001/sale/${findUser.id}`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Authorization: user.token,
          },
        },
      );
      const allSales = await response.json();

      setSales(allSales);
    };
    load();
  }, [user.email, user.token]);

  return (
    <>
      <Navbar />
      <div>
        {sales?.map((element) => (
          <div key={ element.id }>
            <button
              type="button"
              onClick={ () => handleClick(element.id) }
              style={ { backgroundColor: 'transparent', border: 'none' } }
            >
              <p data-testid={ `customer_orders__element-order-id-${element.id}` }>
                {`Pedido ${element.id}`}
              </p>
              <p
                data-testid={ `customer_orders__element-delivery-status-${element.id}` }
              >
                {element.status}
              </p>
              <p
                data-testid={ `customer_orders__element-order-date-${element.id}` }
              >
                { `${String(new Date(element.saleDate)
                  .getUTCDate()).padStart(2, '0')}/${String(new Date(element.saleDate)
                  .getUTCMonth() + 1).padStart(2, '0')}/${new Date(element.saleDate)
                  .getFullYear()}`}
              </p>
              <p
                data-testid={ `customer_orders__element-card-price-${element.id}` }
              >
                {`${String(element.totalPrice).replace('.', ',')}`}
              </p>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default CustomerOrders;
