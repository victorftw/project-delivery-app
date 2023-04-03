import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './components/Navbar';

export default function CustomerOrderDetails() {
  const [status, setStatus] = useState('');
  const [seller, setSeller] = useState('');
  const [totalValue, setTotalValue] = useState(0);
  const [date, setDate] = useState(0);
  const [objSale, setObjSale] = useState({});
  const [arrayProducts, setArrayProducts] = useState([]);
  const { id } = useParams();

  const formatDate = (newData) => {
    const data = new Date(newData);
    const dia = data.getUTCDate().toString().padStart(2, '0');
    const mes = (data.getUTCMonth() + 1).toString().padStart(2, '0');
    const ano = data.getUTCFullYear().toString();
    const dataFormatada = `${dia}/${mes}/${ano}`;
    setDate(dataFormatada);
  };

  const totalCompra = async (products) => {
    let soma = 0;
    await products.forEach((element) => {
      const { SaleProduct } = element;
      soma += (SaleProduct.quantity * element.price);
    });
    setTotalValue(soma);
    return soma;
  };

  const startPage = async () => {
    const responseFetch = await fetch(`http://localhost:3001/customer/orders/${id}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await responseFetch.json();
    setObjSale(result);
    setArrayProducts(result.products);
    setSeller(result.seller.name);
    totalCompra(result.products);
    formatDate(result.saleDate);
    setStatus(result.status);
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
  useEffect(() => {
    startPage();
  }, []);

  return (
    <div>
      <Navbar />
      <h2>Detalhe do Pedido</h2>
      <p data-testid="customer_order_details__element-order-details-label-order-id">
        {`PEDIDO ${objSale.id};`}
      </p>
      <p data-testid="customer_order_details__element-order-details-label-seller-name">
        {`P.Vend: ${seller}`}
      </p>
      <p data-testid="customer_order_details__element-order-details-label-order-date">
        {date}
      </p>
      <p
        data-testid="customer_order_details__element-order-details-label-delivery-status"
      >
        { status }
      </p>
      <button
        data-testid="customer_order_details__button-delivery-check"
        type="button"
        disabled={ status !== 'Em Trânsito' }
        onClick={ () => updatedStatus('Entregue') }
      >
        Marcar como Entregue
      </button>
      <div>
        <table>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-Total</th>
          </tr>
          <tbody>
            { arrayProducts.map((element, index) => (
              <tr key={ index }>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-item-number-${index}`
                  }
                >
                  {element.id}
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-name-${index}`
                  }
                >
                  {element.name}
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-quantity-${index}`
                  }
                >
                  {element.SaleProduct.quantity}

                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-unit-price-${index}`
                  }
                >
                  {element.price}
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-sub-total-${index}`
                  }
                >
                  {(element.SaleProduct.quantity * element.price).toFixed(2)}
                </td>
              </tr>
            )) }
          </tbody>
        </table>
        <h3
          data-testid="customer_order_details__element-order-total-price"
        >
          {totalValue.toFixed(2).replace('.', ',')}

        </h3>
      </div>
    </div>
  );
}
