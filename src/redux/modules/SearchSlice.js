import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from './instance';

const initialState = {
  postsList: [],
};

export const getsearchPostsList = createAsyncThunk(
  'getsearchPostsList',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post(`/posts/elasticsearch`, {
        keyword: payload.inputText,
      });
      //   return console.log(response)
      if (response.data.success === true) {
        return thunkAPI.fulfillWithValue(response.data.result);
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const SearchPostsListSlice = createSlice({
  name: 'searchpostsList',
  initialState,
  reducers: {
    onRemoveHandler: (state, action) => {
      state.postsList = initialState.postsList;
    },
  },
  extraReducers: {
    [getsearchPostsList.fulfilled]: (state, action) => {
      state.postsList = action.payload;
    },
  },
});

export const {onRemoveHandler} = SearchPostsListSlice.actions;
export default SearchPostsListSlice.reducer;
