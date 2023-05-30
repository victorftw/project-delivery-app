import React, { useContext, useEffect, useState } from 'react';
import Context from '../../contextAPI/context';

const TWELVE = 12;
const SIX = 6;

function FormRegister() {
  const { setNewUserRegisterByAdmin } = useContext(Context);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'seller',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [formComplete, setFormComplete] = useState(false);

  useEffect(() => {
    let newFormComplete = true;

    if (newUserData.name.length < TWELVE) {
      setErrorMessage('O nome completo deve conter pelo menos 12 caracteres.');
      newFormComplete = false;
    } else if (!newUserData.email.match(/^\S+@\S+\.\S+$/)) {
      setErrorMessage(
        'O Email deve estar em um formato válido.',
      );
      newFormComplete = false;
    } else if (newUserData.password.length < SIX) {
      setErrorMessage('A senha deve conter pelo menos 6 caracteres.');
      newFormComplete = false;
    } else {
      setErrorMessage('');
    }

    setFormComplete(newFormComplete);
  }, [newUserData]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNewUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const adminData = JSON.parse(localStorage.getItem('user'));
    const { token } = adminData;

    const newUser = await fetch('http://localhost:3001/admin/register', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(newUserData),
    });

    if (newUser === 'User already registered') {
      setErrorMessage('Usuário já registrado.');
      return;
    }
    setNewUserRegisterByAdmin(true);
    setErrorMessage('');
    setNewUserRegisterByAdmin(false);
    setNewUserData({
      name: '',
      email: '',
      password: '',
      role: 'seller',
    });
  }

  return (
    <form onSubmit={ handleSubmit }>
      <div>
        <h1>Cadastrar novo usuário</h1>
        {errorMessage.length > 0 && (
          <p data-testid="admin_manage__element-invalid-register">
            {errorMessage}
          </p>
        )}
      </div>

      <div className="form-register">
        <label htmlFor="name">
          Nome
          <br />
          <input
            type="text"
            data-testid="admin_manage__input-name"
            placeholder="Seu nome"
            value={ newUserData.name }
            onChange={ handleChange }
            name="name"
          />
        </label>
        <label htmlFor="email">
          E-mail
          <br />
          <input
            type="text"
            data-testid="admin_manage__input-email"
            placeholder="seu-email@site.com.br"
            value={ newUserData.email }
            onChange={ handleChange }
            name="email"
          />
        </label>
        <label htmlFor="password">
          Senha
          <br />
          <input
            type="password"
            data-testid="admin_manage__input-password"
            placeholder="**********"
            value={ newUserData.password }
            onChange={ handleChange }
            name="password"
          />
        </label>
        {newUserData && (
          <label htmlFor="role">
            Tipo
            <br />
            <select
              name="role"
              data-testid="admin_manage__select-role"
              value={ newUserData.role }
              onChange={ handleChange }
            >
              <option value="seller">Vendedor</option>
              <option value="administrator">Administrador</option>
              <option value="customer"> Cliente</option>
            </select>
          </label>
        )}
        <div>
          <button
            type="submit"
            data-testid="admin_manage__button-register"
            disabled={ !formComplete }
            onClick={ handleSubmit }
          >
            CADASTRAR
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormRegister;
