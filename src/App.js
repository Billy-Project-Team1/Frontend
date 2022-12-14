// React import
import React from 'react';
import { Route, Routes } from 'react-router-dom';
// Style import
import './App.scss';
// Component import
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
import MyPage1 from './pages/mypage/MyPage1';
import Search from './pages/search/Search';
import ChattingRoom from './pages/chatting/ChattingRoom';
import Chat from './pages/chatting/Chat';
import ReviewPosting from './pages/reviewPosting/ReviewPosting';
import Notice from './pages/notice/Notice';
import Event from './pages/event/Event';
import NotFound from './pages/notfound/NotFound';
import RouteChangeTracker from './shared/googleanalytics/RouteChangeTracker';

function App() {
	RouteChangeTracker();
	return (
		<Routes>
			<Route path="/" element={<Main />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<SignUp />} />
			<Route path="/posting" element={<Posting />} />
			<Route path="/modifyPosting/:postid" element={<ModifyPosting />} />
			<Route path="/modifyProfile" element={<ModifyProfile />} />
			<Route path="/detail/:postid" element={<Detail />} />
			<Route path="/kakao" element={<Kakao />} />
			<Route path="/map/test" element={<SearchPlace />} />
			<Route path="/main/test" element={<MainListCard />} />
			<Route path="/mypage/:id" element={<MyPage1 />} />
			<Route path="/search" element={<Search />} />
			<Route path="/chatList" element={<ChattingRoom />} />
			<Route path="/chat/room/:postId/:roomId" element={<Chat />} />
			<Route
				path="/reviewPosting/:postId/:reservationId"
				element={<ReviewPosting />}
			/>
			<Route path="/notice" element={<Notice />} />
			<Route path="/event" element={<Event />} />
			<Route path="/*" element={<NotFound />} />
		</Routes>
	);
}

export default App;
