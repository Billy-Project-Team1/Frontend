import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from './instance';

const initialState = {
  chatList: [],
  chatRoomList: [],
  chatRoomDetail: {},
};

export const getMyChatRoom = createAsyncThunk(
  'getMyChatRoom',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get('/chat/rooms');
      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data.chatRoomResponseDtoList);
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export const createChatRoom = createAsyncThunk(
  'createChatRoom',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post(`/create/chat/${payload}`);
      //  return console.log(response)
      return thunkAPI.fulfillWithValue(response.data.result);
    } catch (err) {
      console.log(err);
    }
  }
);

export const getChatDetailPost = createAsyncThunk(
  'getChatDetailPost',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(`/posts/details/${payload}`);
      if (response.data.success === true) {
        return thunkAPI.fulfillWithValue(response.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const chatListSlice = createSlice({
  name: 'chatList',
  initialState,
  extraReducers: {
    [getMyChatRoom.fulfilled]: (state, action) => {
      state.chatRoomList = action.payload;
    },
    [getMyChatRoom.rejected]: (state, action) => {},
    [getChatDetailPost.fulfilled]: (state, action) => {
      state.chatRoomDetail = action.payload;
    },
  },
});

export default chatListSlice.reducer;
