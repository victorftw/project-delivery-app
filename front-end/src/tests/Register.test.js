import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/RenderWithRouter';
import Register from '../pages/Register';

describe('Tela de Register', () => {
  it('Verifica se a tela de Register e renderiza corretamente ', () => {
    renderWithRouter(<Register />);

    expect( screen.getByRole('heading', { name: /cadastro/i })).toBeInTheDocument();
  });
  it('Verifica se existe input de Nome', () => {
    renderWithRouter(<Register />);

    expect(screen.getByTestId('common_register__input-name')).toBeInTheDocument();
  });
  it('Verifica se existe input de E-mail', () => {
    renderWithRouter(<Register />);

    expect(screen.getByTestId('common_register__input-email')).toBeInTheDocument();
  });
  it('verifica se existe input de senha', () => {
    renderWithRouter(<Register />);

    expect(screen.getByTestId('common_register__input-password')).toBeInTheDocument();
  });

  it('verifica se existe um botão de cadastro', () => {
    renderWithRouter(<Register />);

    expect( screen.getByTestId('common_register__button-register')).toBeInTheDocument();
  });

  it('Verifica se button esta desabilitado ao entrar na tela', () => {
    renderWithRouter(<Register />);

    const button = screen.getByTestId('common_register__button-register');
    expect(button).toBeDisabled();
  });

  it('Verifica se o botão e habilitado com nome, email e senhas validos. ', () => {
    renderWithRouter(<Register />);

    const name = 'Teste Teste';
    const email = 'my@email.com';
    const password = '123456';

    const btnTest = screen.getByRole('button', { name: /cadastrar/i });
    const testName = screen.getByTestId('common_register__input-name');
    const testEmail = screen.getByTestId('common_register__input-email');
    const inputPassword = screen.getByTestId('common_register__input-password');

    userEvent.type(testName, name);
    userEvent.type(testEmail, email);
    userEvent.type(inputPassword, password);
    expect(btnTest).toBeDisabled();
  });

  it('Verifica se redireciona pra tela de produtos apos cadastro de novo usuário', () => {
    const { history } = renderWithRouter(<Register />, '/customer/products');

    const name = 'Teste Teste';
    const email = 'my@email.com';
    const password = '123456';

    const btnTest = screen.getByRole('button', { name: /cadastrar/i });
    const testName = screen.getByTestId('common_register__input-name');
    const testEmail = screen.getByTestId('common_register__input-email');
    const inputPassword = screen.getByTestId('common_register__input-password');

    userEvent.type(testName, name);
    userEvent.type(testEmail, email);
    userEvent.type(inputPassword, password);
    userEvent.click(btnTest);

    expect(history.location.pathname).toBe('/customer/products');
  });

  it('Verifica se redireciona pra tela de produtos apos cadastro de novo usuário', () => {
     renderWithRouter(<Register /> );

    const nameUsed = 'Delivery App Admin';
    const emailUsed = 'adm@deliveryapp.com';
    const passwordUsed = '--adm2@21!!--';

    const btnTest = screen.getByRole('button', { name: /cadastrar/i });
    const testName = screen.getByTestId('common_register__input-name');
    const testEmail = screen.getByTestId('common_register__input-email');
    const inputPassword = screen.getByTestId('common_register__input-password');

    userEvent.type(testName, nameUsed);
    userEvent.type(testEmail, emailUsed);
    userEvent.type(inputPassword, passwordUsed);
    userEvent.click(btnTest);

    expect( screen.getByText(/mensagem de erro/i)).toBeInTheDocument();
  });
});
