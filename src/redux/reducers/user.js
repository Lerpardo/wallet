import { LOGIN_ACTION } from '../actions/actionsTypes';

const initState = {
  email: '',
};

const user = (state = initState, action) => {
  switch (action.type) {
  case LOGIN_ACTION:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default user;
