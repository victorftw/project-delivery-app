import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';
import Context from '../contextAPI/context';
import useLocalStorage from '../hooks/useLocalStorage';
import Navbar from './components/Navbar';
import '../css/CustomerCheckout.css';

const BASE = 'customer_checkout__element-order-table-';

function CustomerCheckout() {
  const { state: user } = useLocalStorage('user', []);
  const { cartProducts, setCartProducts } = useContext(Context);
  const [users, setUsers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [seller, setSeller] = useState(0);
  const [total, setTotal] = useState(
    cartProducts.reduce((a, c) => a + +c.price * +c.quantity, 0).toFixed(2),
  );
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const { push } = useHistory();

  useEffect(() => {
    const load = async () => {
      const response = await fetch('http://localhost:3001/user', {
        method: 'GET',
        mode: 'cors',
      });
      const findUsers = await response.json();
      setUsers(findUsers);
      const filterSellers = findUsers.filter((e) => e.role === 'seller');
      setSellers(filterSellers);
      setSeller(filterSellers[0].id);
    };
    load();
  }, []);

  const remove = (index) => {
    const newCart = cartProducts.filter((_e, i) => i !== index);
    setCartProducts(newCart);
    setTotal(
      newCart.reduce((a, c) => a + +c.price * +c.quantity, 0).toFixed(2),
    );
  };

  const createSale = async () => {
    const findUser = users.find((e) => e.email === user.email);
    const sale = {
      userId: findUser ? findUser.id : 1,
      sellerId: seller,
      totalPrice: Number(total).toFixed(2),
      deliveryAddress: address,
      deliveryNumber: number,
    };

    const response = await fetch('http://localhost:3001/sale', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json',
        Authorization: user.token,
      },
      body: JSON.stringify([sale, cartProducts]),
    });

    const { id } = await response.json();

    push(`/customer/orders/${id}`);
  };

  return (
    <div className="page-customer-checkout">
      <Navbar />
      <h3>Finalizar pedido</h3>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantitade</th>
            <th>Valor Unitário</th>
            <th>Sub total</th>
            <th>Remover item</th>
          </tr>
        </thead>
        <tbody>
          {cartProducts.map((e, i) => (
            <tr key={ e.id } className="tr-customer-checkout">
              <td
                data-testid={ `${BASE}item-number-${i}` }
                className="td-id-customer-checkout"
              >
                {i + 1}
              </td>
              <td
                data-testid={ `${BASE}name-${i}` }
                className="td-descripition-customer-checkout"
              >
                {e.name}
              </td>
              <td
                data-testid={ `${BASE}quantity-${i}` }
                className="td-quantity-customer-checkout"
              >
                {e.quantity}
              </td>
              <td
                data-testid={ `${BASE}unit-price-${i}` }
                className="td-unitprice-customer-checkout"
              >
                {String(e.price).replace('.', ',')}
              </td>
              <td
                data-testid={ `${BASE}sub-total-${i}` }
                className="td-subprice-customer-checkout"
              >
                {String(e.totalValue).replace('.', ',')}
              </td>
              <td
                data-testid={ `${BASE}remove-${i}` }
                className="td-remove-customer-checkout"
              >
                <button onClick={ () => remove(i) } type="button">
                  Remove item
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot data-testid="customer_checkout__element-order-total-price">
          <tr>
            <td colSpan="6">
              {`Total: R$ ${String(total).replace('.', ',')}`}
            </td>
          </tr>
        </tfoot>
      </table>

      <div className="delivery-details" id="delivery-details">
        <h3>Detalhes e Endereço para Entrega</h3>
        <div className="labels-delivery-details">

          <label htmlFor="seller">
            P. vendedora responsável
            <select
              data-testid="customer_checkout__select-seller"
              aria-label="seller"
              value={ seller }
              onChange={ (e) => setSeller(+e.target.value) }
            >
              {sellers.map((e) => (
                <option key={ e.id } value={ e.id }>
                  {e.name}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="address">
            Endereço
            <input
              className="input-address-customer-checkout"
              data-testid="customer_checkout__input-address"
              name="address"
              type="text"
              value={ address }
              onChange={ (e) => setAddress(e.target.value) }
            />
          </label>

          <label htmlFor="number">
            Número
            <input
              data-testid="customer_checkout__input-address-number"
              name="number"
              type="text"
              value={ number }
              onChange={ (e) => setNumber(e.target.value) }
            />
          </label>
        </div>

        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ createSale }
        >
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
}

export default CustomerCheckout;
