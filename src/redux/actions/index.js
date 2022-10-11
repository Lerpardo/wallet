import {
  LOGIN_ACTION,
  API_REQUEST,
  SEND_EXPENDS, DELETE_EXPENDS, EDIT_EXPENDES, SET_EDIT } from './actionsTypes';

export const sendLoginUser = (userData) => ({
  type: LOGIN_ACTION,
  payload: userData,
});

export const currenciesData = (data) => ({
  type: API_REQUEST,
  payload: Object.keys(data).filter((element) => element !== 'USDT'),
});

export const setExpenses = (expenses, cambio) => ({
  type: SEND_EXPENDS,
  payload: {
    ...expenses,
    exchangeRates: cambio,
  },
});

export const delExpenses = (i, e) => ({
  type: DELETE_EXPENDS,
  payload: e.filter((f) => f.id !== i.id),
});

export const edExpenses = (elemento) => ({
  type: EDIT_EXPENDES,
  payload: elemento.id,
});

export const setEdit = (objeto) => ({
  type: SET_EDIT,
  payload: objeto,
});
