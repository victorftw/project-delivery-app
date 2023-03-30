import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter  from './helpers/RenderWithRouter'
import Login from '../pages/Login';

describe('Tela de Login', () => {
  it('Verifica se a tela de Login e renderiza corretamente ', () => {
    renderWithRouter(<App />);

    expect(screen.getByRole('heading', { name: /nome app/i })).toBeInTheDocument();
  });
  it('Verifica se existe input de Login', () => {
    renderWithRouter(<App />);

    expect(screen.getByTestId('common_login__input-email')).toBeInTheDocument();
  });
  it('Verifica se existe input de senha', () => {
    renderWithRouter(<App />);

    expect(screen.getByTestId('common_login__input-password')).toBeInTheDocument();
  });
  it('verifica se existe um botão de Login', () => {
    renderWithRouter(<App />);
    
    expect(screen.getByTestId('common_login__button-login')).toBeInTheDocument();
  });

  it('verifica se existe um botão de criação de conta', () => {
    renderWithRouter(<App />);

    expect(screen.getByTestId('common_login__button-register')).toBeInTheDocument();
  });

  it('Verifica se button esta desabilitado ao entrar na tela', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: /login/i });
    expect(button).toBeDisabled();
  });

  it('Verifica se o botão e habilitado com email e senhas validos. ', () => {
    renderWithRouter(<App />);

    const email = 'my@email.com';
    const password = '123456';

    const btnTest = screen.getByRole('button', { name: /login/i });
    const testEmail = screen.getByTestId('common_login__input-email');
    const inputPassword = screen.getByTestId('common_login__input-password');

    userEvent.type(testEmail, email);
    userEvent.type(inputPassword, password);
    expect(btnTest).not.toBeDisabled();
  });

  it('Verifica se o botão de Cadastro redireciona pra a tela de criação de conta', () => {
    const { history } = renderWithRouter(<App />);

    const btnCreateAccount = screen.getByTestId('common_login__button-register');
    userEvent.click(btnCreateAccount);

    expect(history.location.pathname).toBe('/register');
  });

  it('Verifica se colocado email e senha validos mais sem cadastro no banco de dados retorna mensagem de erro', () => {
    renderWithRouter(<App />);

    const email = 'my@email.com';
    const password = '123456';

    const btnLogin = screen.getByRole('button', { name: /login/i });
    const testEmail = screen.getByTestId('common_login__input-email');
    const inputPassword = screen.getByTestId('common_login__input-password');

    userEvent.type(testEmail, email);
    userEvent.type(inputPassword, password);
    userEvent.click(btnLogin);

    expect(screen.getByText(/erro/i)).toBeInTheDocument();

  });

  it('Verifica se colocado email e senha validos cadastrados no DB redireciona para tela de produtos', () => {
    const { history } = renderWithRouter(<Login />, '/customer/products');

    const emailValid = 'adm@deliveryapp.com';
    const passwordValid = '--adm2@21!!--';

    const btnLogin = screen.getByRole('button', { name: /login/i });
    const testEmail = screen.getByTestId('common_login__input-email');
    const inputPassword = screen.getByTestId('common_login__input-password');

    userEvent.type(testEmail, emailValid);
    userEvent.type(inputPassword, passwordValid);
    userEvent.click(btnLogin);

    expect(history.location.pathname).toBe('/customer/productsq');
  });

});
