import React, { useEffect } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getMyChatRoom } from '../../redux/modules/ChatSlice';
import ChattingRoomHeader from '../../commponents/header/ChattingRoomHeader';
import ChattingRoomCard from '../../commponents/chattingRoomCard/ChattingRoomCard';
import './ChattingRoom.scss'


const ChattingRoom = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyChatRoom());
  }, []);

  const myChatList = useSelector((state) => state.ChatSlice.chatRoomList);
  console.log(myChatList);

  return (
    <div>
      <ChattingRoomHeader />
      <div className="chattingroom_wrap">
      {myChatList.map((post) => {
        return <ChattingRoomCard post={post} />;
      })}
      </div>
    </div>
  );
};

export default ChattingRoom;
