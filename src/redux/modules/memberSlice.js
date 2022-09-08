import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import instance from './instance';
import { deleteCookie } from './CustomCookie';

const initialState = {
  member: [],
};

// 로그 아웃 post /auth/members/logout
export const logOut = createAsyncThunk('logOut', async (data) => {
  try {
    const response = await axios.post(
      '/auth/members/logout',
      {},

      {
        headers: {
          Athorization: data.token,
          RefreshToken: data.refreshToken,
        },
      }
    );
    // return console.log(response);
    if (response.status === 200) {
      localStorage.clear();
      deleteCookie('refreshToken');
      deleteCookie('accessToken');
      deleteCookie('webid_ts');
      deleteCookie('webid');
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
      deleteCookie('webid_ts');
      deleteCookie('webid');
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
