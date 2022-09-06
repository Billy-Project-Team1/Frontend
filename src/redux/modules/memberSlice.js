import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import instance from './instance';

const initialState = {
  member: [],
};
// 쿠키 삭제
const deleteCookie = (name) => {
  document.cookie = name + '=; expires = Thu, 01 Jan 1999 00:00:10 GMT;';
};

// 로그 아웃 post /auth/members/logout
export const logOut = createAsyncThunk('logOut', async (data) => {
  try {
    const response = await axios.post(
      '/auth/members/logout',
      {},
      {
        headers: { Athorization: data.token, RefreshToken: data.refreshToken },
      }
    );
    if (response.status === 200) {
      localStorage.clear();
      deleteCookie('refreshToken');
      deleteCookie('accessToken');
    }
  } catch (e) {
    console.log(e);
  }
});

// 회원 탈퇴 delete /auth/members/withdrawal/{memberId}
export const withdrawal = createAsyncThunk('withdrawal', async (data) => {
  try {
    const response = await instance.delete(`/auth/members/withdrawal/${data}`);
    if (response.status === 200) {
      localStorage.clear();
      deleteCookie('refreshToken');
      deleteCookie('accessToken');
    }
  } catch (e) {
    console.log(e);
  }
});

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {},
});

export const {} = memberSlice.actions;
export default memberSlice.reducer;
