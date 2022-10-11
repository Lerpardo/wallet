import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
// import App from '../App';
import mockData from './helpers/mockData';

describe('Verifica os elementos do Wallet.js', () => {
  it('Verifica o preechimento dos inputs', () => {
    renderWithRouterAndRedux(<Wallet />);

    const valueInput2 = screen.getByTestId('value-input');
    const descriptionInput2 = screen.getByTestId('description-input');
    const botao2 = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.type(valueInput2, '10');
    userEvent.type(descriptionInput2, 'Dez doletas');
    userEvent.click(botao2);

    expect(valueInput2).toHaveTextContent('');
    expect(descriptionInput2).toHaveTextContent('');
  });

  it('Verifica o retorno da api gerada no click do "Adicionar Dispesas', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => mockData }));
    renderWithRouterAndRedux(<Wallet />);

    const botao3 = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.click(botao3);

    expect(global.fetch).toHaveBeenCalled();
  });
});
