import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from './instance';

// 프로필 조회 Get /auth/members/profile/{userId}
export const getProfileThunk = createAsyncThunk(
  'getProfileThunk',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(`/auth/members/profile/${payload}`);
      // return console.log(response);
      if (response.data.success === true) {
        return thunkAPI.fulfillWithValue(response.data.result);
      } else {
        return console.log(response);
      }
    } catch (e) {
      // console.log(e);
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
      state.error = action.payload;
    },
    [getProfileThunk.pending]: () => {},
  },
});

export default myProfileSlice.reducer;
