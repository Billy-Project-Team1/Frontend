
  const KAKAO_REST_API_KEY = process.env.REACT_APP_LOGIN_REST_API_KEY;
  const KAKAO_REDIRECT_URI = "http://localhost:3000/kakao";

  export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
