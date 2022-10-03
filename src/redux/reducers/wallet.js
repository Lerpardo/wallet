import { WALLET_ACTION } from '../actions/actionsTypes';

const initState = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = initState, action) => {
  switch (action.type) {
  case WALLET_ACTION:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default wallet;
