import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from './instance';
import { deleteCookie } from './customCookies';

export const logOut = createAsyncThunk('logOut', async (data) => {
  try {
    const response = await instance.post(
      '/auth/members/logout',
      {},

      {
        headers: {
          Athorization: data.token,
          RefreshToken: data.refreshToken,
        },
      }
    );
    if (response.status === 200) {
      localStorage.clear();
      deleteCookie('refreshToken');
      deleteCookie('webid_ts');
      deleteCookie('webid');
      window.location.replace('/');
    }
  } catch (e) {
    console.log(e);
  }
});

export const getmyUpLoadData = createAsyncThunk(
  'getmyUpLoadData',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(`/auth/posts/member-page/${payload}`);
      if (response.data.success === true) {
        return thunkAPI.fulfillWithValue(response.data.result);
      } else {
        return console.log(response);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
export const getmyDibsData = createAsyncThunk(
  'getmyDibsData',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(`/auth/posts/likes`);
      if (response.data.success === true) {
        return thunkAPI.fulfillWithValue(response.data.result);
      } else {
        return console.log(response);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const withdrawal = createAsyncThunk(
  'withdrawal',
  async (data, thunkAPI) => {
    try {
      const response = await instance.delete(
        `/auth/members/withdrawal/${data}`
      );
      if (response.status === 200) {
        localStorage.clear();
        deleteCookie('refreshToken');
        deleteCookie('webid_ts');
        deleteCookie('webid');
        window.location.replace('/');
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
      console.log(e);
    }
  }
);

const initialState = {
  member: [],
  myDibsList: [],
  myUploadList: [],
};

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {},
  extraReducers: {
    [getmyUpLoadData.fulfilled]: (state, action) => {
      state.myUploadList = action.payload;
    },
    [getmyUpLoadData.rejected]: (state, action) => {
      console.log(action.payload);
    },
    [getmyDibsData.fulfilled]: (state, action) => {
      state.myDibsList = action.payload;
    },
  },
});

export const {} = memberSlice.actions;
export default memberSlice.reducer;
