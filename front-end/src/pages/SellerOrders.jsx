import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from './components/Navbar';
import '../css/SellerOrder.css';

function SellersOrders() {
  const [seller] = useState(() => JSON.parse(localStorage.getItem('user')) || {});
  const [orders, setOrders] = useState([]);
  const { push } = useHistory();

  useEffect(() => {
    const getOrders = async () => {
      const respSeller = await fetch('http://localhost:3001/user', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-type': 'application/json',
        },
      });

      const users = await respSeller.json();
      const findSeller = users.find((e) => e.email === seller.email);

      if (findSeller) {
        const response = await fetch(`http://localhost:3001/seller/orders/${findSeller.id}`);
        const ordersBySeller = await response.json();
        console.log(ordersBySeller);
        setOrders(ordersBySeller);
      }
    };
    getOrders();
  }, [seller]);

  const handleClick = (id) => {
    push(`/seller/orders/${id}`);
  };

  return (
    <>
      <NavBar />
      <div className="container-seller-order">
        {orders?.map((e) => (
          <div className="details-seller-order" key={ e.id }>
            <button
              type="button"
              onClick={ () => handleClick(e.id) }
              style={ { backgroundColor: 'transparent', border: 'none' } }
            >
              <p
                className="id-details-seller-order"
                data-testid={ `seller_orders__element-order-id-${e.id}` }
              >
                {`Pedido ${e.id}`}
              </p>
              <p
                className="status-details-seller-order"
                data-testid={ `seller_orders__element-delivery-status-${e.id}` }
              >
                {e.status}
              </p>
              <div className="date-and-price-seller-order">
                <p
                  data-testid={ `seller_orders__element-order-date-${e.id}` }
                >
                  { `${String(new Date(e.saleDate)
                    .getUTCDate()).padStart(2, '0')}/${String(new Date(e.saleDate)
                    .getUTCMonth() + 1).padStart(2, '0')}/${new Date(e.saleDate)
                    .getFullYear()}`}
                </p>
                <p
                  data-testid={ `seller_orders__element-card-price-${e.id}` }
                >
                  {`R$ ${String(e.totalPrice).replace('.', ',')}`}
                </p>
                <p
                  data-testid={ `seller_orders__element-card-address-${e.id}` }
                >
                  {`${e.deliveryAddress} ${e.deliveryNumber}`}
                </p>
              </div>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default SellersOrders;
