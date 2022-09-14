import React, { useEffect } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getMyChatRoom } from '../../redux/modules/ChatSlice';

const CahttingRoom = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyChatRoom());
  }, []);

  return <div></div>;
};

export default CahttingRoom;
