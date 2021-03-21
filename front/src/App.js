import jwt from 'jsonwebtoken';
import { setAuthToken } from './axios';

import Navbar from './components/Navbar';
import Router from './Router';

function getUserData() {
  const token = localStorage.getItem('token');
  if (!token) return;

  const user = jwt.decode(token);
  if(!user) return
  if (new Date(user.exp * 1000) < Date.now()) {
    localStorage.removeItem('token');
    setAuthToken(null);
  } else {
    setAuthToken(token);
  }
}

function App() {
  getUserData();
  return (
    <div className='container'>
      <Navbar />
      <Router />
    </div>
  );
}

export default App;
