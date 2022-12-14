import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from './instance';

export const getProfileThunk = createAsyncThunk(
  'getProfileThunk',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(`/auth/members/profile/${payload}`);
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

export const editProfileThunk = createAsyncThunk(
  'editProfileThunk',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.patch(
        `/auth/members/profile/${payload.is_login}`,
        payload.formData,
        {
          'Content-Type': 'multipart/form-data',
        }
      );
      return thunkAPI.fulfillWithValue(response.data.result);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const initialState = {
  myProfile: {},
};

export const myProfileSlice = createSlice({
  name: 'myprofile',
  initialState,
  reducers: {},
  extraReducers: {
    [getProfileThunk.fulfilled]: (state, action) => {
      state.myProfile = action.payload;
    },
    [getProfileThunk.rejected]: (state, action) => {
      console.log(action.payload);
    },
    [editProfileThunk.fulfilled]: (state, action) => {
      state.myProfile = action.payload;
    },
    [editProfileThunk.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export default myProfileSlice.reducer;
