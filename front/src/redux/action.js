import { LOGIN_USER } from './types';
import jwt from 'jsonwebtoken';
import instance, { setAuthToken } from '../axios';

export function registrationUser(user) {
  return async (dispatch) => {
    instance.post('users/register', user).then((response) => {
      console.log(response);
    });
  };
}

export function loginUser(user) {
  return async (dispatch) => {
    console.log(instance);
    const res = await instance.post('/users/login', user, {
      'Content-Type': 'application/json',
    });
    const data = jwt.decode(res.token);

    localStorage.setItem('token', res.token);
    setAuthToken(res.token);

    dispatch({ type: LOGIN_USER, payload: data });
  };
}
