import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { Icon } from '@iconify/react';
import LoginHeader from '../../commponents/header/LoginHeader';
import './Chat.scss';
import { getChatDetailPost } from '../../redux/modules/ChatSlice';

var stompClient = null;

const Chat = () => {
  const { roomId } = useParams();
  const myNickname = localStorage.getItem('nickname');
  const PK = localStorage.getItem('memberId');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChatDetailPost(roomId));
  }, []);

  const roomData = useSelector((state) => state.ChatSlice.chatRoomDetail);
  console.log(roomData);
  const [chatList, setChatList] = useState([]);
  const [userData, setUserData] = useState({
    type: '',
    roomId: roomId,
    sender: '',
    message: '',
    profileUrl: '',
    enterUserCnt: '',
    createdAt: '',
    memberId: '',
    quitOwner: '',
  });
  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  useEffect(() => {
    registerUser();
    scrollToBottom();
  }, []);

  const handleValue = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const registerUser = () => {
    var sockJS = new SockJS(process.env.REACT_APP_API_URL + '/wss/chat');
    // var sockJS = new SockJS('http://13.125.236.69/wss/chat');
    console.log(sockJS);
    stompClient = Stomp.over(sockJS);
    // stompClient.debug = null;
    console.log(stompClient);
    stompClient.connect({ PK }, onConnected, onError);
  };

  const onConnected = () => {
    stompClient.subscribe(
      `/sub/chat/room/${parseInt(roomId)}`,
      onMessageReceived
    );
    userJoin();
    scrollToBottom();
  };

  const onError = (err) => {
    console.log(err);
  };

  const userJoin = () => {
    let chatMessage = {
      type: 'ENTER',
      roomId: roomId,
      sender: myNickname,
      message: '',
      profileUrl: '',
      enterUserCnt: '',
      createdAt: '',
      memberId: '',
      quitOwner: '',
    };

    stompClient.send(`/pub/chat/message`, { PK }, JSON.stringify(chatMessage));
  };

  const onMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);
    console.log(payloadData);

    if (payloadData.type === 'ENTER' || payloadData.type === 'TALK') {
      chatList.push(payloadData);
      setChatList([...chatList]);
      console.log(chatList);
    }

    scrollToBottom();
  };

  const sendMessage = () => {
    if (stompClient && userData.message) {
      let chatMessage = {
        type: 'TALK',
        roomId: roomId,
        sender: myNickname,
        message: userData.message,
        profileUrl: '',
        enterUserCnt: '',
        createdAt: '',
        memberId: '',
        quitOwner: '',
      };

      stompClient.send(
        '/pub/chat/message',
        { PK },
        JSON.stringify(chatMessage)
      );
      setUserData({ ...userData, message: '' });
    }

    scrollToBottom();
  };

  const onKeyPress = (event) => {
    event.preventDefault();

    sendMessage();
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatList]);

  const detailDate = (a) => {
    const milliSeconds = new Date() - a;
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  };

  return (
    <>
      <LoginHeader />
      <div className="ChatHeadContainer">
        <div className="ChatHeadBox">
        <div className="ChatHeadImgBox">
          <img src={roomData.profileUrl} className="ChatHeadImg"/>
        </div>
        <div className="ChatHeadTextBox">
          <div className="ChatHeadTitle">1212</div>
          <div>1212</div>
        </div>
        <div></div>
        </div>
      </div>
      <div className="ChatContainer">
        {chatList?.map((chat, idx) => {
          return (
            <div key={idx}>
              {chat.sender !== myNickname ? (
                <div className="ChatOtherWrap">
                  <img src={chat.profileUrl} className="ChatOtherProfile" />
                  <div className="ChatOtherContainer">
                    <div className="ChatotherName">{chat.sender}</div>
                    <div className="ChatOtherMsgClock">
                      <div className="ChatOtherBox">{chat.message}</div>
                      <div className="ChatClockBox">
                        <div className="ChatClock">오전 09:15</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="ChatMeContainer">
                  <div className="ChatClockBox">
                    <div className="ChatClock">오전 09:15</div>
                  </div>
                  <div className="ChatMeBox">{chat.message}</div>
                </div>
              )}
            </div>
          );
        })}
        <div className="ChatInputContainer">
          <form
            className="ChatInputBox"
            onSubmit={(event) => onKeyPress(event)}
          >
            <input
              className="ChatInput"
              type="text"
              placeholder="대화를 시작해보세요!"
              value={userData.message}
              onChange={(event) => handleValue(event)}
            />
            <div className="ChatInputButtonBox">
              <button className="ChatInputButton">
                <Icon icon="akar-icons:send" className="ChatButtonIcon" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
