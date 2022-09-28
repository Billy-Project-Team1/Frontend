import React, { useEffect } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getMyChatRoom } from '../../redux/modules/ChatSlice';
import Headers2 from '../../commponents/header/Headers2';
import ChattingRoomCard from '../../commponents/chattingRoomCard/ChattingRoomCard';
import './ChattingRoom.scss';
import Footer from '../../commponents/footer/Footer';

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
					<div className="Search_Empty_Text">
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
