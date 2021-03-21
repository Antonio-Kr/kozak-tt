import jwt from 'jsonwebtoken';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setAuthToken } from './axios';
import Navbar from './components/Navbar';
import { LOGIN_USER, LOGOUT_USER } from './redux/types';
import Router from './Router';

function getUserData(dispatch) {
  const token = localStorage.getItem('token');
  if (!token) return;

  const user = jwt.decode(token);
  if (!user) return;

  if (new Date(user.exp * 1000) < Date.now()) {
    localStorage.removeItem('token');
    setAuthToken(null);
    dispatch({ type: LOGOUT_USER });
  } else {
    setAuthToken(token);
    dispatch({ type: LOGIN_USER, payload: user });
  }
}

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => getUserData(dispatch), []);

  return (
    <div className='container'>
      <Navbar />
      <Router />
    </div>
  );
}
