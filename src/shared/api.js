import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const apis = {
  // 회원 가입 API
  createMember: (payload) =>
    api.post('/members/signup', {
      email: payload.email,
      nickname: payload.nickname,
      password: payload.password,
    }),

  //이메일 체크
  checkEmailDuplicate: async (payload) =>
    await api.get('/members/email-check', { params: { email: payload } }),

  loginMember: (payload) =>
    api.post('/members/login', {
      email: payload.email,
      password: payload.password,
    }),
};

export const imgAPI = {
  fileUpload: function (data) {
    return axios.post('/auth/posts',data);
  },
  // getFiles: function (data) {
  //   return axios.get(`/api/image/${data.type}/${data.id}`);
  // },
  // sizeCheck: function (data) {
  //   return axios.post(`/api/filesize`,data,uploadconfig);
  // }
}