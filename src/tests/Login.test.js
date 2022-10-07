import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testa o componente Login', () => {
  test('Verifica o campo email e senhas são existentes', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassWord = screen.getByTestId('password-input');
    const botao = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassWord).toBeInTheDocument();
    expect(botao).toBeInTheDocument();
  });

  it('Verifica as informações passadas estão validas', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail2 = screen.getByTestId('email-input');
    const inputPassWord2 = screen.getByTestId('password-input');
    const botao2 = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(botao2).toBeDisabled();

    userEvent.type(inputEmail2, 'joao123@gmail.com');
    userEvent.type(inputPassWord2, '99999');

    expect(botao2).toBeDisabled();

    userEvent.type(inputPassWord2, '99999');

    expect(botao2).toBeEnabled();

    userEvent.click(botao2);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
  });
});
