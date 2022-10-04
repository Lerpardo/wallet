import { LOGIN_ACTION, WALLET_ACTION, API_REQUEST } from './actionsTypes';

export const sendLoginUser = (userData) => ({
  type: LOGIN_ACTION,
  payload: userData,
});

export const sendWallet = (walletData) => ({
  type: WALLET_ACTION,
  payload: walletData,

});

export const currenciesData = (data) => ({
  type: API_REQUEST,
  payload: Object.keys(data).filter((element) => element !== 'USDT'),
});
