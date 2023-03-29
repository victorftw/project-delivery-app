import React, { useEffect, useState } from "react";
// import api from '../api';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [isUserNotFound, setIsUserNotFound] = useState(false);
  const { push } = useHistory();

  useEffect(() => {
    const regex = /\S+[@]\w+[.]\w+/gi;
    if(regex.test(email) && password.length >= 6) setIsBtnDisabled(false)
    else setIsBtnDisabled(true);
  }, [email, password])

  const handleClick = async () => {
      const response = await fetch('http://localhost:3001/login', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })}
        );
      const result = await response.json();
      if (result.message === 'User not found') {
        setIsUserNotFound(true)
        return;
      } 
      push('/customer/products');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  } 

  return (
    <div>
      <img src="" alt="" />
      <h1>nome app</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Login</label>
        <input 
          type="email"
          data-testid="common_login__input-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="">Senha</label>
        <input
          type="password"
          data-testid="common_login__input-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleClick} disabled={isBtnDisabled} data-testid="common_login__button-login">LOGIN</button>
        <button data-testid="common_login__button-register">Ainda não tenho conta</button>
      </form>
      <p
        data-testid="common_login__element-invalid-email"
        style={{ display: isUserNotFound ? 'block': 'none' }}
      >
        Mensagem de erro
      </p>
    </div>
  );
}

export default Login;
