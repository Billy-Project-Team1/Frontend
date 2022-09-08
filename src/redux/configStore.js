import { configureStore } from '@reduxjs/toolkit';
import member from './modules/memberSlice';
import myprofile from './modules/profileSlice';

export default configureStore({
  reducer: { member, myprofile },
});
