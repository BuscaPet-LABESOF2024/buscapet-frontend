import Axios, { HttpStatusCode } from 'axios';

const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:8080/';

export const baseURL = `${serverUrl}`;

const axios = Axios.create({
  baseURL: baseURL,
  timeout: 300000, // 5 minutos
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.interceptors.request.use(
  async function (config) {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error?.response?.status === HttpStatusCode.Forbidden) {
      console.log('Handle with forbidden error');
    }

    if (error?.response?.status === HttpStatusCode.Unauthorized) {
      console.log('Handle with unauthorized error');
    }

    throw error;
  }
);

export default axios;
