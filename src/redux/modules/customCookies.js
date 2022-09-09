import { Cookies } from 'react-cookie';

const cookie = new Cookies();
//쿠키 가져오기
export const getCookie = (name) => {
  return cookie.get(name);
};
// 쿠키 삭제
export const deleteCookie = (name) => {
  document.cookie = name + '=; expires = Thu, 01 Jan 1999 00:00:10 GMT;';
};
