import React from 'react';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

describe('Verifica a movimentação da tabela', () => {
  test('Verifica a tabela renderizada no Wallet', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => mockData }));
    renderWithRouterAndRedux(<Wallet />);

    const currencies = screen.getByTestId('currency-input');
    await waitFor(() => userEvent.selectOptions(currencies, 'USD'));

    userEvent.type(screen.getByTestId('value-input'), '10');
    userEvent.type(screen.getByTestId('description-input'), 'Dez dolares');

    userEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      const tableElemt = screen.getByRole('table');
      const editDelCell = screen.getByRole('cell', {
        name: /editar excluir/i,
      });

      const coinCurry = screen.getByRole('cell', {
        name: /dólar americano\/real brasileiro/i,
      });

      expect(tableElemt).toBeInTheDocument();
      expect(editDelCell).toBeInTheDocument();
      expect(coinCurry).toBeInTheDocument();
      userEvent.click(screen.getByTestId('delete-btn'));
    });
  });
  test('Funçoes e botões', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => mockData }));
    renderWithRouterAndRedux(<Wallet />);

    userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));
    const converção = screen.getByText(/Valor convertido/i);
    expect(converção).toBeInTheDocument();

    await waitFor(() => userEvent.click(screen.getByTestId('edit-btn')));

    userEvent.type(screen.getByTestId('value-input'), '12');
    userEvent.type(screen.getByTestId('description-input'), 'McDonalts');

    const buttonEdit = await screen.getByRole('button', { name: /editar despesa/i });
    fireEvent.click(buttonEdit);

    userEvent.click(screen.getByTestId('delete-btn'));
  });
});
