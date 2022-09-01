import { createSlice } from "@reduxjs/toolkit";
import instance from "./instance";

//회원가입
export const createMemberDB = (payload) => {
  return async function () {
    await instance
      .post("/members/signup", {
        "email":payload.email,
        "nickname":payload.nickname,
        "password":payload.password
        })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// 이메일 중복검사
export const checkEmailDuplicate = (payload) => {
  return async function () {
    await instance
      .get("/members/email-check",   { params: { email: payload } } )
  };
};

//로그인
export const loginMemberDB = (payload) => {
  return async function (dispatch) {
    await instance
      .post("/members/login", {
        "email":payload.email,
        "password":payload.password
        })
      
  };
};

const memberSlice = createSlice({
  name: "member",
  initialState: {
    member_list: [],
  },
  reducers: {},
});

export default memberSlice.reducer;
