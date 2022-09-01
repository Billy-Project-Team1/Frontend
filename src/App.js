import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Kakao from "./pages/socialLogin/KakaoLogin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>메인페이지</div>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/kakao" element={<Kakao />} />
    </Routes>
  );
}

export default App;
