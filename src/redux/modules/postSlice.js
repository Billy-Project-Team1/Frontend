import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from './instance';

const initialState = {
  post: {},
};

export const getPost = createAsyncThunk(
  'getPost',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(`/posts/details/${payload.postid}`, {
        params: { userId: payload.myUserId },
      });

      if (response.data.success === true) {
        return thunkAPI.fulfillWithValue(response.data.result);
      }
    } catch (error) {
      alert('존재하지 않는 게시물입니다.');
      window.location.replace('/');
    }
  }
);
export const getReviewPost = createAsyncThunk(
  'getReviewPost',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(`/posts/details/${payload.postId}`, {
        params: { userId: payload.myUserId },
      });

      if (response.data.success === true) {
        return thunkAPI.fulfillWithValue(response.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const addPost = createAsyncThunk(
  'addPost',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post(`/auth/posts`, payload, {
        'Content-Type': 'multipart/form-data',
      });
      if (response.data.success === true) {
        return thunkAPI.fulfillWithValue(response.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const deletePost = createAsyncThunk(
  'deletePost',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.delete(`/auth/posts/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      console.log(error);
    }
  }
);

export const updatePost = createAsyncThunk(
  'updatePost',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.patch(
        `/auth/posts/${payload.postid}`,
        payload.formData,
        {
          'Content-Type': 'multipart/form-data',
        }
      );

      if (response.data.success === true) {
        return thunkAPI.fulfillWithValue(response.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const dibsPost = createAsyncThunk(
  'dibsPost',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.put(`/auth/posts/${payload}/likes`);
      if (response.data.success === true) {
        return thunkAPI.fulfillWithValue(response.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: {
    [getPost.fulfilled]: (state, action) => {
      state.post = action.payload;
    },
    [getReviewPost.fulfilled]: (state, action) => {
      state.post = action.payload;
    },
    [addPost.fulfilled]: (state, action) => {
      state.post = action.payload;
    },
    [dibsPost.fulfilled]: (state, action) => {
      if (action.payload === '찜하기 취소!') {
        state.post.like = !state.post.like;
        state.post.likeCount = state.post.likeCount - 1;
      } else {
        state.post.like = !state.post.like;
        state.post.likeCount = state.post.likeCount + 1;
      }
    },
    [deletePost.fulfillWithValue]: (state, action) => {
      state.post = action.post.filter((item) => item.postId != action.payload);
    },
    [updatePost.fulfilled]: (state, action) => {
      state.post = action.payload;
    },
  },
});

export const {} = postSlice.actions;

export default postSlice.reducer;
