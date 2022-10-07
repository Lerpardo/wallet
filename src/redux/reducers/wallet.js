import {
  WALLET_ACTION,
  API_REQUEST, SEND_EXPENDS, DELETE_EXPENDS, EDIT_EXPENDES,
} from '../actions/actionsTypes';

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
  case API_REQUEST:
    return { ...state, currencies: action.payload };
  case SEND_EXPENDS:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case DELETE_EXPENDS:
    return {
      ...state,
      expenses: action.payload,
    };
  case EDIT_EXPENDES:
    return { ...state, editor: !state.editor, idToEdit: action.payload };
  default:
    return state;
  }
};

export default wallet;
