import { configureStore } from '@reduxjs/toolkit';
import member from './modules/memberSlice';
import myprofile from './modules/profileSlice';
import posts from './modules/postsSlice';
import ChatSlice from './modules/ChatSlice'

export default configureStore({
  reducer: { member, myprofile, posts, ChatSlice },
});
