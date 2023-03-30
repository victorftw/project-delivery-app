import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [isUserNotValid, setisUserNotValid] = useState(false);
  const { push } = useHistory();

  useEffect(() => {
    const seis = 6;
    const doze = 12;
    const regex = /\S+[@]\w+[.]\w+/gi;
    if (regex.test(email) && password.length >= seis && name.length >= doze) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [email, password, name]);

  const handleClick = async () => {
    const response = await fetch('http://localhost:3001/register', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    });
    const numberError = 409;
    const user = await response.json();
    if (response.status === numberError) {
      setisUserNotValid(true);
      return;
    }
    console.log(user);
    if (user.role === 'customer') {
      push('/customer/products');
    }
  };

  return (
    <div>
      <h1>Cadastro</h1>
      <form>
        <label htmlFor="name">
          Nome
          <input
            name="name"
            type="text"
            data-testid="common_register__input-name"
            value={ name }
            onChange={ (e) => setName(e.target.value) }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            name="email"
            type="email"
            data-testid="common_register__input-email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            name="password"
            type="password"
            data-testid="common_register__input-password"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
        <button
          type="button"
          onClick={ handleClick }
          disabled={ isBtnDisabled }
          data-testid="common_register__button-register"
        >
          CADASTRAR
        </button>
      </form>
      <p
        data-testid="common_register__element-invalid_register"
        style={ { display: isUserNotValid ? 'block' : 'none' } }
      >
        Mensagem de erro
      </p>
    </div>
  );
}

export default Register;
