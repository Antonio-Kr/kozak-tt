import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:3001',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

instance.interceptors.response.use(
  function (response) {
    console.log(response);
    return response;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

export const setAuthToken = (token) => {
  if (token) {
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  } else {
    delete instance.defaults.headers.common['Authorization'];
  }
};

export default instance;
