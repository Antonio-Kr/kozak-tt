import axios from 'axios';
import jwt from 'jsonwebtoken';

import { FETCH_EMPLOYEES, LOGIN_USER, LOGOUT_USER } from './types';
import { setAuthToken } from '../axios';

export function registrationUser(user) {
  return async (dispatch) => {
    axios
      .post('http://localhost:3001/users/register', user)
      .then((response) => {
        console.log(response);
      });
  };
}

export function loginUser(user) {
  return async (dispatch) => {
    const res = await axios.post('http://localhost:3001/users/login', user, {
      'Content-Type': 'application/json',
    });
    const data = jwt.decode(res.data.token);
    localStorage.setItem('token', res.data.token);
    setAuthToken(res.data.token);
    dispatch({ type: LOGIN_USER, payload: data });
  };
}

export function logoutUser() {
  return async (dispatch) => {
    setAuthToken(null);
    dispatch({ type: LOGOUT_USER });
  };
}

export function setUser(token) {
  return async (dispatch) => {
    const data = jwt.decode(token);
    setAuthToken(token);
    dispatch({ type: LOGIN_USER, payload: data });
  };
}

export function fetchEmployees() {
  return async (dispatch) => {
    const { data } = await axios.get('http://localhost:3001/employees');
    dispatch({ type: FETCH_EMPLOYEES, payload: data });
  };
}
