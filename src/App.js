import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Detail from './pages/detail/Detail';
import Login from './pages/login/Login';
import Main from './pages/main/Main';
import ModifyPosting from './pages/modifyPosting/ModifyPosting';
import ModifyProfile from './pages/modifyProfile/ModifyProfile';
import Posting from './pages/posting/Posting';
import SignUp from './pages/signup/SignUp';
import Kakao from './pages/socialLogin/KakaoLogin';
import SearchPlace from './commponents/maps/SearchPlace';
import Mypage from './pages/mypage/Mypage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/posting" element={<Posting />} />
      <Route path="/modifyPosting" element={<ModifyPosting />} />
      <Route path="/modifyProfile" element={<ModifyProfile />} />
      <Route path="/detail" element={<Detail />} />
      <Route path="/map/test" element={<SearchPlace />} />
      <Route path="/mypage" element={<Mypage />} />
    </Routes>
  );
}

export default App;
