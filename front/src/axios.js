import axios from 'axios';

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => Promise.reject(error)
);

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const isLogedIn = () => !!axios.defaults.headers.common['Authorization'];
