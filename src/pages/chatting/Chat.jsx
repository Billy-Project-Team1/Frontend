import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getChatDetailPost } from '../../redux/modules/ChatSlice';
import instance from '../../redux/modules/instance';

import dailycost from '../../static/image/dailycost.svg';
import deposit from '../../static/image/deposit.svg';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import ChatHeder from '../../commponents/header/ChatHeader';
import './Chat.scss';
import { Icon } from '@iconify/react';

var stompClient = null;

const Chat = () => {
	const { postId } = useParams();
	const { roomId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const nowDate = new Date();

	const myNickname = localStorage.getItem('nickname');
	const PK = localStorage.getItem('memberId');

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
		stompClient = Stomp.over(sockJS);
		stompClient.debug = null;
		stompClient.connect({ PK }, onConnected, onError);
	};

	const onConnected = async () => {
		const response = await dispatch(getChatDetailPost(postId)).unwrap();
		if (response) {
			stompClient.subscribe(`/sub/chat/room/${roomId}`, onMessageReceived);
			userJoin(response);
			scrollToBottom();
		}
	};

	const onError = (err) => {
		console.log(err);
	};

	const userJoin = (response) => {
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

		let otherChatMessage = {
			type: 'ENTER',
			roomId: roomId,
			sender: response.nickname,
			message: '',
			profileUrl: '',
			enterUserCnt: '',
			createdAt: '',
			memberId: '',
			quitOwner: '',
		};

		stompClient.send(`/pub/chat/message`, { PK }, JSON.stringify(chatMessage));
		stompClient.send(
			`/pub/chat/message`,
			{ PK: response.memberId },
			JSON.stringify(otherChatMessage)
		);
	};

	const onMessageReceived = (payload) => {
		let payloadData = JSON.parse(payload.body);

		if (payloadData.type === 'ENTER' || payloadData.type === 'TALK') {
			chatList.push(payloadData);
			setChatList([...chatList]);
			instance.get(`/chat/message/${roomId}`).then((res) => {
				return setChatList([...res.data]);
			});
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

	const quitRoom = () => {
		let chatMessage = {
			type: 'QUIT',
			roomId: roomId,
			sender: myNickname,
			message: '',
			profileUrl: '',
			enterUserCnt: '',
			createdAt: '',
			memberId: '',
			quitOwner: '',
		};

		stompClient.send('/pub/chat/message', { PK }, JSON.stringify(chatMessage));
		setUserData({ ...userData, message: '' });

		navigate('/');
	};

	const onKeyPress = (event) => {
		event.preventDefault();

		sendMessage();
	};

	useEffect(() => {
		scrollToBottom();
	}, [chatList]);

	const detailTime = (a) => {
		const nowTime = new Date(a);
		const nowHour = nowTime.getHours();
		const nowMt = nowTime.getMinutes();
		if (nowHour <= 12) {
			if (nowHour < 10) {
				if (nowMt < 10) {
					return `오전 ` + '0' + nowHour + ':' + '0' + nowMt;
				} else {
					return `오전 ` + '0' + nowHour + ':' + nowMt;
				}
			} else {
				if (nowMt < 10) {
					return `오전 ` + nowHour + ':' + '0' + nowMt;
				} else {
					return `오전 ` + nowHour + ':' + nowMt;
				}
			}
		} else {
			const afterHour = nowHour - 12;
			if (afterHour < 10) {
				if (nowMt < 10) {
					return `오후 ` + '0' + afterHour + ':' + '0' + nowMt;
				} else {
					return `오후 ` + '0' + afterHour + ':' + nowMt;
				}
			} else {
				if (nowMt < 10) {
					return `오후 ` + afterHour + ':' + '0' + nowMt;
				} else {
					return `오후 ` + afterHour + ':' + nowMt;
				}
			}
		}
	};

	const postPrice = roomData.price
		?.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	const postDeposit = roomData.deposit
		?.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	return (
		<>
			<div className="chat_head_wrap">
				<ChatHeder quitRoom={quitRoom} />
				<div
					className="Chat_Head_Container"
					onClick={() => navigate(`/detail/${roomData.id}`)}
				>
					<div className="Chat_Head_Box">
						<div className="Chat_Head_Img_Box">
							<img
								src={roomData.postImgUrl?.postImgUrlList[0]}
								className="Chat_Head_Img"
							/>
						</div>
						<div className="Chat_Head_Text_Box">
							<div className="Chat_Head_Title">{roomData.title}</div>
							<div className="chat_head_cost">
								<div className="chat_head_cost_icon_box">
									<img className="chat_head_cost_icon" src={dailycost} />
								</div>
								{postPrice}원
								<div className="chat_head_cost_icon_box">
									<img className="chat_head_cost_icon" src={deposit} />
								</div>
								{postDeposit}원
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="Chat_Container">
				{chatList?.map((chat, idx) => {
					return (
						<div key={idx}>
							{chat.memberId != PK ? (
								chat.message === '' ? (
									''
								) : (
									<div className="Chat_Other_Wrap">
										<img src={chat.profileUrl} className="Chat_Other_Profile" />
										<div className="Chat_Other_Container">
											<div className="Chat_Other_Name">{chat.sender}</div>
											<div className="Chat_Other_Msg_Clock">
												<div className="Chat_Other_Box">{chat.message}</div>
												<div className="Chat_Clock_Box">
													<div className="Chat_Clock">
														{detailTime(chat.createdAt)}
													</div>
												</div>
											</div>
										</div>
									</div>
								)
							) : chat.message === '' ? (
								''
							) : (
								<div className="Chat_Me_Container">
									<div className="Chat_Clock_Box">
										<div className="Chat_Clock">
											{detailTime(chat.createdAt)}
										</div>
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
