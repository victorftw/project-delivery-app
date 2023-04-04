import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import useLocalStorage from '../hooks/useLocalStorage';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [isUserNotFound, setIsUserNotFound] = useState(false);
  const { push } = useHistory();

  const redirect = (us) => {
    if (us.role === 'customer') push('/customer/products');
    if (us.role === 'seller') push('/seller/orders');
    if (us.role === 'administrator') push('/admin/manage');
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.email) {
      redirect(user);
    }
    const seis = 6;
    const regex = /\S+[@]\w+[.]\w+/gi;
    if (regex.test(email) && password.length >= seis) setIsBtnDisabled(false);
    else setIsBtnDisabled(true);
  }, [email, password, push]);
  const handleClick = async () => {
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (result.message === 'User not found') {
      setIsUserNotFound(true);
      return;
    }
    localStorage.setItem('user', JSON.stringify({
      name: result.name,
      email: result.email,
      role: result.role,
      token: result.token,
    }));

    if (result.role === 'seller') push('/seller/orders');
    else if (result.role === 'administrator') push('/admin/manage');
    else push('/customer/products');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <img src="" alt="" />
      <h1>nome app</h1>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="email">
          Login
          <input
            name="email"
            type="email"
            data-testid="common_login__input-email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            name="password"
            type="password"
            data-testid="common_login__input-password"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
        <button
          type="button"
          onClick={ handleClick }
          disabled={ isBtnDisabled }
          data-testid="common_login__button-login"
        >
          LOGIN
        </button>
        <button
          onClick={ () => push('/register') }
          type="button"
          data-testid="common_login__button-register"
        >
          Ainda não tenho conta
        </button>
      </form>
      <p
        data-testid="common_login__element-invalid-email"
        style={ { display: isUserNotFound ? 'block' : 'none' } }
      >
        Mensagem de erro
      </p>
    </div>
  );
}
export default Login;
