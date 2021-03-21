import { LOGIN_USER } from './types';

const initialState = {
  employees: [],
  user: {},
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_USER:
      
      return { ...state, user: payload };
    default:
      return state;
  }
};