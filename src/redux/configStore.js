import { configureStore } from '@reduxjs/toolkit';
import member from './modules/memberSlice';
import myprofile from './modules/profileSlice';
import posts from './modules/postsSlice';
import ChatSlice from './modules/ChatSlice';
import post from './modules/postSlice';
import searchPost from './modules/SearchSlice';
import billystate from './modules/reservationSlice';
import review from './modules/reviewSlice';
import notification from './modules/notificationSlice';

export default configureStore({
  reducer: {
    member,
    myprofile,
    posts,
    ChatSlice,
    post,
    searchPost,
    billystate,
    review,
    notification,
  },
});
