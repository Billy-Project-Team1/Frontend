import { configureStore } from '@reduxjs/toolkit';
import member from './modules/memberSlice';
import myprofile from './modules/profileSlice';
import posts from './modules/postsSlice';
import ChatSlice from './modules/ChatSlice'
import post from './modules/postSlice'

export default configureStore({
  reducer: { member, myprofile, posts, ChatSlice, post },
});
