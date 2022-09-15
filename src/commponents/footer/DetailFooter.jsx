import React, { useEffect } from 'react';
import { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa'; //비활성화 메인
import { useNavigate, useLocation } from 'react-router-dom';
import './DetailFooter.scss';
import LoginModal from './LoginModal';

const DetailFooter = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	//로그인 모달
	const [modalOpen, setModalOpen] = useState(false);
	const showModal = () => {
		setModalOpen(true);
	};
	//로그인 함수
	const is_login = localStorage.getItem('userId');

	const postingPage = () => {
		if (is_login) {
			navigate('/posting');
		} else {
			showModal();
		}
	};
	const chattingPage = () => {
		if (is_login) {
			navigate('/chatList');
		} else {
			showModal();
		}
	};
	const myPage = () => {
		if (is_login) {
			navigate(`/mypage/${is_login}`);
		} else {
			showModal();
		}
	};
	// useEffect(() => {
	//   document.body.style.cssText = `
	//     position: fixed;
	//     top: -${window.scrollY}px;
	//     overflow-y: scroll;
	//     width: 100%;`;
	//   return () => {
	//     const scrollY = document.body.style.top;
	//     document.body.style.cssText = '';
	//     window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
	//   };
	// }, []);

	return (
		<div className="detail_footer">
			<div className="detail_footer_container">
				<div className="detail_footer_wrap">
					<FaRegHeart className="detail_footer_icon" />
					<div
						className="detail_chat_btn"
						onClick={() => navigate('/chatList')}
					>
						채팅하기
					</div>
					<div className="detail_reservattion_btn">대여 예약하기</div>
					{/* <div onClick={() => navigate('/')}>
						<HiOutlineHome
							className="footer-icon"
							style={{ color: pathname === '/' ? '#212121' : '#CCCCCC' }}
						/>
					</div>
					<div onClick={() => navigate('/search')}>
						<HiSearch
							className="footer-icon"
							style={{ color: pathname === '/search' ? '#212121' : '#CCCCCC' }}
						/>
					</div>
					<div
						onClick={() => {
							postingPage();
						}}
					>
						<HiOutlinePlusCircle
							className="footer-icon"
							style={{ color: pathname === '/posting' ? '#212121' : '#CCCCCC' }}
						/>
					</div>
					<div
						onClick={() => {
							chattingPage();
						}}
					>
						<HiOutlineChat
							className="footer-icon"
							style={{
								color: pathname === '/chatList' ? '#212121' : '#CCCCCC',
							}}
						/>
					</div>
					<div
						onClick={() => {
							myPage();
						}}
					>
						<HiOutlineUser
							className="footer-icon"
							style={{
								color:
									pathname === `/mypage/${is_login}` ? '#212121' : '#CCCCCC',
							}}
						/>
					</div> */}
				</div>
				{modalOpen && (
					<LoginModal setModalOpen={setModalOpen} modalOpen={modalOpen} />
				)}
			</div>
		</div>
	);
};

export default DetailFooter;
