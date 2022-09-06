import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
const token = localStorage.getItem('accessToken');
instance.defaults.headers.common['authorization'] = token ? `${token}` : null;

instance.interceptors.response.use(async (error) => {
  const {
    config,
    response: { status },
  } = error;
  if (status === 401) {
    // 권한없음 === Access 토큰 만료됐을 경우
    if (localStorage.getItem('accessToken')) {
      if (!cookies.get('refreshToken')) {
        window.location.href = '/login';
      } else {
        const originalRequest = config;
        const refreshToken = await cookies.get('refreshToken');
        const userEmail = await cookies.get('userId');
        // token refresh 요청
        const { data } = await axios.post(
          '/auth/members/reissue',
          { userId: `${userId}` },
          {
            headers: { 'Refresh-Token': `${refreshToken}` },
          }
        );

        // 새로운 토큰 저장
        localStorage.setItem('accessToken', data.headers.authorization);
        const newtoken = localStorage.getItem('accessToken');
        instance.defaults.headers.common.Authorization = `${newtoken}`;
        originalRequest.headers.Authorization = `${newtoken}`;
        // 401로 요청 실패했던 요청을 새로운 accessToken으로 재요청
        return axios(originalRequest);
      }
    } else {
      window.location.replace = '/login';
    }
  }
  return Promise.reject(error);
});

export default instance;
