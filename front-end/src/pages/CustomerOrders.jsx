import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from './components/Navbar';
import '../css/CustomerOrder.css';

function CustomerOrders() {
  const [user] = useState(() => JSON.parse(localStorage.getItem('user')) || {});
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
      <div className="container-customer-order">
        {sales?.map((element) => (
          <div className="details-customer-order" key={ element.id }>
            <button
              type="button"
              onClick={ () => handleClick(element.id) }
              style={ { backgroundColor: 'transparent', border: 'none' } }
            >
              <p
                className="id-details-customer-order"
                data-testid={ `customer_orders__element-order-id-${element.id}` }
              >
                {`Pedido ${element.id}`}
              </p>
              <p
                className="status-details-customer-order"
                data-testid={ `customer_orders__element-delivery-status-${element.id}` }
              >
                {element.status}
              </p>
              <div className="date-and-price-customer-order">
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
              </div>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default CustomerOrders;
