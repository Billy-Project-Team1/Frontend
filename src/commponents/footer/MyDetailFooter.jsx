import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MyDetailFooter.scss';

const MyDetailFooter = () => {
	const navigate = useNavigate();

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
				</div>
			</div>
		</div>
	);
};

export default MyDetailFooter;
