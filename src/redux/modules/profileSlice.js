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
//프로필 수정 patch /auth/members/profile/{userId}  "image”: form/data
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
      // return console.log('djfdkjfkd', response);
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
      state.error = action.payload;
    },
    // [editProfileThunk.fulfilled]: (state, action) => {
    //   state.myProfile = state.myProfile.map((item, index) => {
    //     if (item.userId === action.payload.userId) {
    //       return {
    //         ...item,
    //         nickname: action.payload.nickname,
    //         profileUrl: action.payload.profileUrl,
    //       };
    //     } else {
    //       return { ...item };
    //     }
    //   });
    // },
    [editProfileThunk.fulfilled]: (state, action) => {
      state.myProfile = action.payload;
    },
    [editProfileThunk.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export default myProfileSlice.reducer;
