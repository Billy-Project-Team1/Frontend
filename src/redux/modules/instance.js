import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// const userId = localStorage.getItem('userId');
// let frm = new FormData();
// frm.append("userId", new Blob([JSON.stringify(userId)], { type: "application/json" }))
// REACT_APP_API_URL = 'https://jiwoo184.shop'

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('accessToken');
  const refreshToken = cookies.get('refreshToken');
  config.headers['Authorization'] = token ? `${token}` : null;
  config.headers['Refresh-Token'] = refreshToken ? `${refreshToken}` : null;
  return config;
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },

  async function (error) {
    if (error.response.status === 401) {
      try {
        const userId = localStorage.getItem('userId');
        console.log(userId);
        const originalRequest = error.config;
        localStorage.removeItem('accessToken');
        const data = await instance.post('/auth/members/reissue', {
          userId: userId,
        });
        if (data) {
          const newToken = data.headers.authorization;
          localStorage.setItem('accessToken', newToken);
          originalRequest.headers['Authorization'] = newToken;
          return await instance.request(originalRequest);
        }
      } catch (error) {
        localStorage.removeItem('accessToken');
        console.log(error);
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default instance;
