import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from './instance';

export const getMypageReview = createAsyncThunk(
  'getReview',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(
        `/auth/reviews/received/${payload}`,
        payload
      );
      if (response.data.success === true) {
        return thunkAPI.fulfillWithValue(response.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const getDetailReview = createAsyncThunk(
  'getDetailReview',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(`/reviews/${payload.postid}`, {
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

export const addReview = createAsyncThunk(
  'addReview',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post(`/auth/reviews`, payload, {
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

export const addDetailReview = createAsyncThunk(
  'addDetailReview',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post(`/auth/reviews/comments`, payload.a);

      if (response.data.success === true) {
        return thunkAPI.fulfillWithValue(response.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const delReview = createAsyncThunk(
  'delReview',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.delete(
        `/auth/reviews/${payload.reviewId}`
      );
      console.log(response);
      if (response.data.success) {
        return window.location.replace(`/detail/${payload.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const delReplyReview = createAsyncThunk(
  'delReplyReview',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.delete(
        `auth/reviews/comments/${payload}`
      );
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateReview = createAsyncThunk(
  'updateReview',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post(`/auth/reviews/${payload.reviewId}`);
      if (response.data.success === true) {
        return thunkAPI.fulfillWithValue(response.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  reviewPost: {},
  reviewGet: [],
  detailReviewGet: [],
};
export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: {
    [getMypageReview.fulfilled]: (state, action) => {
      state.reviewGet = action.payload;
    },
    [getDetailReview.fulfilled]: (state, action) => {
      state.detailReviewGet = action.payload;
    },
    [addReview.fulfilled]: (state, action) => {
      state.reviewPost = action.payload;
    },
    [addDetailReview.fulfilled]: (state, action) => {
      // state.reviewPost = action.payload;
    },
    [delReview.fulfilled]: (state, action) => {
      state.reviewGet = action.payload.filter(
        (item) => item.reviewId !== action.payload
      );
    },
    [delReplyReview.fulfilled]: (state, action) => {
      state.reviewGet = action.payload.filter(
        (item) => item.reviewId !== action.payload
      );
    },
    [updateReview.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [updateReview.pending]: () => {},
  },
});

export default reviewSlice.reducer;
