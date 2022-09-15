import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MyDetailFooter.scss';
import LoginModal from './LoginModal';

const MyDetailFooter = () => {
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
		<div className="mydetail_footer">
			<div className="mydetail_footer_container">
				<div className="mydetail_footer_wrap">
					<div
						className="mydetail_reservation_btn"
						onClick={() => navigate('/chatList')}
					>
						예약현황
					</div>
					<div className="mydetail_chatlist_btn">채팅 목록보기</div>
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

export default MyDetailFooter;
