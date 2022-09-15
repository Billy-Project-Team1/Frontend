import React from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './DetailFooter.scss';

const DetailFooter = () => {
	const navigate = useNavigate();

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
				</div>
			</div>
		</div>
	);
};

export default DetailFooter;
