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
import MainListCard from './commponents/mainListCard/MainListCard';
import MyPage from './pages/mypage/MyPage';
import Search from './pages/search/Search';
import ChattingRoom from './pages/chatting/ChattingRoom';
import Chat from './pages/chatting/Chat';
import ReviewPosting from './pages/reviewPosting/ReviewPosting';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/posting" element={<Posting />} />
      <Route path="/modifyPosting" element={<ModifyPosting />} />
      <Route path="/modifyProfile" element={<ModifyProfile />} />
      <Route path="/detail/:postid" element={<Detail />} />
      <Route path="/kakao" element={<Kakao />} />
      <Route path="/map/test" element={<SearchPlace />} />
      <Route path="/main/test" element={<MainListCard />} />
      <Route path="/mypage/:id" element={<MyPage />} />
      <Route path="/search" element={<Search />} />
      <Route path="/chatList" element={<ChattingRoom />} />
      {/* <Route path="/chat/:roomId" element={<Chat />} /> */}
      <Route path="/chat/room/:postId/:roomId" element={<Chat />} />
      <Route path="/reviewPosting" element={<ReviewPosting />} />
    </Routes>
  );
}

export default App;
