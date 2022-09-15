import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dailycost from '../../static/image/dailycost.svg';
import deposit from '../../static/image/deposit.svg';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { Icon } from '@iconify/react';
import LoginHeader from '../../commponents/header/LoginHeader';
import './Chat.scss';
import { getChatDetailPost } from '../../redux/modules/ChatSlice';
import { IoConstructOutline } from 'react-icons/io5';

var stompClient = null;

const Chat = () => {
  const { postId } = useParams();
  const { roomId } = useParams();
  const navigate = useNavigate();
  const nowDate = new Date();

  const myNickname = localStorage.getItem('nickname');
  const PK = localStorage.getItem('memberId');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChatDetailPost(postId));
  }, []);

  const roomData = useSelector((state) => state.ChatSlice?.chatRoomDetail);
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

  const postPrice = roomData.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const postDeposit = roomData.deposit?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  //ScrollY값 가장 하단으로 이동
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
    stompClient.subscribe(`/sub/chat/room/${roomId}`, onMessageReceived);
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

  // const detailDate = (a) => {
  //   const milliSeconds = new Date() - a;
  //   const seconds = milliSeconds / 1000;
  //   if (seconds < 60) return `방금 전`;
  //   const minutes = seconds / 60;
  //   if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  //   const hours = minutes / 60;
  //   if (hours < 24) return `${Math.floor(hours)}시간 전`;
  //   const days = hours / 24;
  //   if (days < 7) return `${Math.floor(days)}일 전`;
  //   const weeks = days / 7;
  //   if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  //   const months = days / 30;
  //   if (months < 12) return `${Math.floor(months)}개월 전`;
  //   const years = days / 365;
  //   return `${Math.floor(years)}년 전`;
  // };

  return (
    <>
      <LoginHeader />
      <div className="Chat_Head_Container" onClick={()=>navigate(`/detail/${roomData.id}`)}>
        <div className="Chat_Head_Box">
          <div className="Chat_Head_Img_Box">
            <img src={roomData.profileUrl} className="Chat_Head_Img" />
          </div>
          <div className="Chat_Head_Text_Box">
            <div className="Chat_Head_Title">{roomData.title}</div>
            <div className="chat_head_cost">
              <div className="chat_head_cost_icon_box">
              <img className="chat_head_cost_icon" src={dailycost} />
              </div>
              {postPrice}
              <div className="chat_head_cost_icon_box">
              <img className="chat_head_cost_icon" src={deposit} />
              </div>
              {postDeposit}
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <div className="Chat_Container">
        {chatList?.map((chat, idx) => {
          return (
            <div key={idx}>
              {chat.memberId != PK ? (
                <div className="Chat_Other_Wrap">
                  <img src={chat.profileUrl} className="Chat_Other_Profile" />
                  <div className="Chat_Other_Container">
                    <div className="Chat_Other_Name">{chat.sender}</div>
                    <div className="Chat_Other_Msg_Clock">
                      <div className="Chat_Other_Box">{chat.message}</div>
                      <div className="Chat_Clock_Box">
                        <div className="Chat_Clock">오전 09:15</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="Chat_Me_Container">
                  <div className="Chat_Clock_Box">
                    <div className="Chat_Clock">오전 09:15</div>
                  </div>
                  <div className="Chat_Me_Box">{chat.message}</div>
                </div>
              )}
            </div>
          );
        })}
        <div className="Chat_Input_Container">
          <form
            className="Chat_Input_Box"
            onSubmit={(event) => onKeyPress(event)}
          >
            <input
              className="Chat_Input"
              type="text"
              placeholder="대화를 시작해보세요!"
              value={userData.message}
              onChange={(event) => handleValue(event)}
            />
            <div className="Chat_Input_Button_Box">
              <button className="Chat_Input_Button">
                <Icon icon="akar-icons:send" className="Chat_Button_Icon" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
