import { configureStore } from '@reduxjs/toolkit';
import member from './modules/memberSlice';
import myprofile from './modules/profileSlice';
import posts from './modules/postsSlice';

export default configureStore({
  reducer: { member, myprofile, posts },
});
