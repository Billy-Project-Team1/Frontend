import { configureStore } from "@reduxjs/toolkit";
import member from "./modules/memberSlice";

export default configureStore({
  reducer: {member},
});
