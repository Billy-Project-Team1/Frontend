import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from './instance';

const initialState = {
  notification: {},
};

export const getNotification = createAsyncThunk(
  'getNotification',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(`/notification`);
    } catch (e) {
      console.log(e);
    }
  }
);

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers: {
    [getNotification.fulfilled]: (state, action) => {
      state.notification = action.payload;
    },
  },
});

export default notificationSlice.reducer;
