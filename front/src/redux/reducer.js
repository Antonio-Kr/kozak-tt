import { LOGIN_USER, LOGOUT_USER, FETCH_EMPLOYEES } from './types';

const initialState = {
  employees: [],
  user: {},
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_USER:
      return { ...state, user: payload };
    case LOGOUT_USER:
      return { ...state, user: {} };
    case FETCH_EMPLOYEES:
      return { ...state, employees: payload };
    default:
      return state;
  }
};
