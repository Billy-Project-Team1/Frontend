import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from './instance';

const initialState = {
  chatList: [],
  chatRoomList: [],
};

export const getMyChatRoom = createAsyncThunk(
  "getMyChatRoom",
  async (payload, thunkAPI) => {
		try {
	    const response = await instance.get('/chat/rooms');
     console.log(response)
      return thunkAPI.fulfillWithValue(response.data);
		} catch(err) {
			console.log(err);
		}
  },
);

const chatListSlice = createSlice({
  name: "chatList",
  initialState,
  extraReducers: {
    [getMyChatRoom.fulfilled]: (state, action) => {
			// action.payload -> chatroom list
      state.chatRoomList.push(action.payload);
    },
  },
});

export default chatListSlice.reducer;