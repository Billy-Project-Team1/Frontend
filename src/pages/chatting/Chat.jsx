// React import
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// Redux import
import { useDispatch, useSelector } from 'react-redux';
import { getChatDetailPost } from '../../redux/modules/ChatSlice';
import instance from '../../redux/modules/instance';
// Package import
import dailycost from '../../static/image/dailycost.svg';
import deposit from '../../static/image/deposit.svg';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
// Component import
import ChatHeder from '../../commponents/header/ChatHeader';
// Style & Icon import
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
			// chatList.push(payloadData);
			// setChatList([...chatList]);
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
					className="chat_head_container"
					onClick={() => navigate(`/detail/${roomData.id}`)}
				>
					<div className="chat_head_box">
						<div className="chat_head_text_box">
							<img
								src={roomData.postImgUrl?.postImgUrlList[0]}
								className="chat_head_img"
							/>
						</div>
						<div className="Chat_Head_Text_Box">
							<div className="chat_head_title">{roomData.title}</div>
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
			<div className="chat_container">
				{chatList?.map((chat, idx) => {
					return (
						<div key={idx}>
							{chat.memberId != PK ? (
								chat.message === '' ? (
									''
								) : (
									<div className="chat_other_wrap">
										<img src={chat.profileUrl} className="chat_other_profile" />
										<div className="chat_other_container">
											<div className="chat_other_name">{chat.sender}</div>
											<div className="chat_other_msg_clock">
												<div className="chat_other_box">{chat.message}</div>
												<div className="chat_clock_box">
													<div className="chat_clock">
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
								<div className="chat_me_container">
									<div className="chat_clock_box">
										<div className="Chat_Clock">
											{detailTime(chat.createdAt)}
										</div>
									</div>
									<div className="chat_me_box">{chat.message}</div>
								</div>
							)}
						</div>
					);
				})}
				<div className="chat_input_container">
					<form
						className="chat_input_box"
						onSubmit={(event) => onKeyPress(event)}
					>
						<input
							className="chat_input"
							type="text"
							placeholder="대화를 시작해보세요!"
							value={userData.message}
							onChange={(event) => handleValue(event)}
						/>
						<div className="chat_input_button_box">
							<button className="chat_input_button">
								<Icon icon="akar-icons:send" className="chat_button_icon" />
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Chat;
