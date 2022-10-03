import { LOGIN_ACTION, WALLET_ACTION } from './actionsTypes';

export const sendLoginUser = (userData) => ({
  type: LOGIN_ACTION,
  payload: userData,
});

export const sendWallet = (walletData) => ({
  type: WALLET_ACTION,
  payload: walletData,

});
