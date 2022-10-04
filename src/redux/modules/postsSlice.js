import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from './instance';

const initialState = {
  postsList: [],
};

export const _postsList = createAsyncThunk(
  'getPostsList',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(`/posts`, payload);
      if (response.data.success === true) {
        return thunkAPI.fulfillWithValue(response.data.result.content);
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const postsListSlice = createSlice({
  name: 'postsList',
  initialState,
  reducers: {},
  extraReducers: {
    [_postsList.fulfilled]: (state, action) => {
      action.payload.map((post) => {
        return state.postsList.push(post);
      });
    },
  },
});

export default postsListSlice.reducer;
