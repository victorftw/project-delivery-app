import React, { useEffect, useState } from 'react';
import proptypes from 'prop-types';
import Navbar from './components/Navbar';

function SellerOrdersDetails({ match }) {
  // const [seller] = useState(() => JSON.parse(localStorage.getItem('user')) || {});
  const [status, setStatus] = useState('');
  const { id } = match.params;
  const [sale, setSale] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getInfo = async () => {
      const response = await fetch(
        `http://localhost:3001/seller/orders/details/${id}`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-type': 'application/json',
          },
        },
      );
      const result = await response.json();
      setSale(result[0]);
      setStatus(result[0].status);
      setProducts(result[1]);
    };
    getInfo();
  }, [id]);

  const formatDate = (newData) => {
    const data = new Date(newData);
    const dia = data.getUTCDate().toString().padStart(2, '0');
    const mes = (data.getUTCMonth() + 1).toString().padStart(2, '0');
    const ano = data.getUTCFullYear().toString();
    const dataFormatada = `${dia}/${mes}/${ano}`;
    return dataFormatada;
  };

  const updatedStatus = async (newStatus) => {
    await fetch(`http://localhost:3001/customer/orders/${newStatus}/${id}`, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setStatus(newStatus);
  };

  return (
    <div>
      <Navbar />
      <h2>Detalhes do Pedido</h2>
      <div className="page-seller-order-details">
        <div className="details-page-seller-order-details">
          <p data-testid="seller_order_details__element-order-details-label-order-id">
            {`PEDIDO ${sale.id};`}
          </p>
          <p data-testid="seller_order_details__element-order-details-label-order-date">
            {formatDate(sale.saleDate)}
          </p>
          <p
            data-testid={ `
            seller_order_details__element-order-details-label-delivery-status` }
          >
            { sale.status }
          </p>
          <button
            data-testid="seller_order_details__button-preparing-check"
            type="button"
            disabled={ status !== 'Pendente' }
            onClick={ () => updatedStatus('Preparando') }
          >
            Preparar Pedido
          </button>
          <button
            data-testid="seller_order_details__button-dispatch-check"
            type="button"
            disabled={ status !== 'Preparando' }
            onClick={ () => updatedStatus('Em Trânsito') }
          >
            Saiu para entrega
          </button>
        </div>
        <table>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-Total</th>
          </tr>
          <tbody>
            { products.map((e, index) => (
              <tr key={ index }>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-item-number-${index}`
                  }
                >
                  {e.id}
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-name-${index}`
                  }
                >
                  {e.name}
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-quantity-${index}`
                  }
                >
                  {e.quantity}

                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-unit-price-${index}`
                  }
                >
                  {e.price}
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-sub-total-${index}`
                  }
                >
                  {(e.quantity * e.price).toFixed(2)}
                </td>
              </tr>
            )) }
          </tbody>
        </table>
        <h3
          data-testid="seller_order_details__element-order-total-price"
        >
          {Number(sale.totalPrice).toFixed(2).replace('.', ',')}

        </h3>
      </div>
    </div>
  );
}

SellerOrdersDetails.propTypes = {
  match: proptypes.shape({
    params: proptypes.shape({
      id: proptypes.string.isRequired,
    }),
  }).isRequired,
};

export default SellerOrdersDetails;
