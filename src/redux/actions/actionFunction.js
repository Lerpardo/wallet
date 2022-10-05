import { currenciesData, setExpenses } from './index';

export function fecthCoins() {
  return async (dispatch) => {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const reponse = await request.json();
    dispatch(currenciesData(reponse));
  };
}

export function fetchCambio(cambio) {
  return async (dispatch) => {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await request.json();
    dispatch(setExpenses(cambio, response));
  };
}
