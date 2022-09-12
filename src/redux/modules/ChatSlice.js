import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from './instance';

const initialState = {
  postsList: [],
};

export const createChatList = createAsyncThunk(
    "CREATE/createChatList",
    async (data) => {
      try {
        const response = await instance.post(`/posts`, data.formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        if (response.status === 200 && response.data.response) {
          if (data.isLetter) {
            data.navigate(`/chat/${response.data.postId}`);
            return response.data.postId;
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  );

export const ChatSlice = createSlice({
  name: 'createChatList',
  initialState,
  reducers: {},
  extraReducers: {
    [createChatList.fulfilled]: (state, action) => {
      action.payload.map((post) => {
        return state.postsList.push(post);
      });
    },
  },
});

export default ChatSlice.reducer;