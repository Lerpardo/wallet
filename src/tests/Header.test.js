import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Header from '../components/Header';
import App from '../App';

describe('Verifica os elementos no header', () => {
  test('Redenriza as informações do Header', () => {
    renderWithRouterAndRedux(<Header />);

    const valueStart = screen.getByText(/0.00/i);
    const coinState = screen.getByText(/brl/i);
    expect(valueStart).toBeInTheDocument();
    expect(coinState).toBeInTheDocument();
  });
  it('Verifica se email passado é mostrado em tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail3 = screen.getByTestId('email-input');
    const inputPassWord3 = screen.getByTestId('password-input');
    const botao3 = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(inputEmail3, 'joao123@gmail.com');
    userEvent.type(inputPassWord3, '999999');

    userEvent.click(botao3);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');

    const emailText = screen.getByText(/joao123@gmail.com/i);
    expect(emailText).toBeInTheDocument();

    const valueFunc = screen.getByTestId('total-field');
    expect(valueFunc).toHaveTextContent('0.00');
  });
});
