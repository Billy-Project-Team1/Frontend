// React import
import React, { useEffect } from 'react';
// Redux import
import { useSelector, useDispatch } from 'react-redux';
import { getMyChatRoom } from '../../redux/modules/ChatSlice';
// Component import
import Headers2 from '../../commponents/header/Headers2';
import ChattingRoomCard from '../../commponents/chattingRoomCard/ChattingRoomCard';
import Footer from '../../commponents/footer/Footer';
// style import
import './ChattingRoom.scss';

const ChattingRoom = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getMyChatRoom());
	}, []);

	const myChatList = useSelector((state) => state.ChatSlice.chatRoomList);

	return (
		<div>
			<Headers2 pageName="채팅 목록" />
			<div className="chattingroom_wrap">
				{myChatList === undefined ? (
					<div className="search_empty_text">
						빌리에 오신걸 환영합니다! 🎉 <br />
						채팅을 시작해보세요! 🙂
					</div>
				) : (
					myChatList.map((post, index) => {
						return <ChattingRoomCard post={post} key={index} />;
					})
				)}
			</div>
			<Footer />
		</div>
	);
};

export default ChattingRoom;
