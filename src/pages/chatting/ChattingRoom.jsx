import React, { useEffect } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getMyChatRoom } from '../../redux/modules/ChatSlice';
import ChattingRoomHeader from '../../commponents/header/ChattingRoomHeader';
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
      <ChattingRoomHeader />
      <div className="chattingroom_wrap">
        {myChatList === undefined
          ? ''
          : myChatList.map((post, index) => {
              return <ChattingRoomCard post={post} key={index} />;
            })}
      </div>
      <Footer />
    </div>
  );
};

export default ChattingRoom;
