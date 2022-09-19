import React from 'react';
import './Headers.scss';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft } from 'react-icons/hi';

const ReviewHeader = ({ move }) => {
	const navigate = useNavigate();

	return (
		<div className="header_container">
			<div className="header_wrap">
				<div className="mypage_header_content">
					<HiOutlineChevronLeft
						style={{ marginRight: '22px' }}
						color="#212121"
						size="24px"
						onClick={() => navigate(-1)}
					/>
					<div className="mypage_header_title">리뷰 작성</div>
					<div className="mypage_header_done">&nbsp;</div>
				</div>
				<div className="header_line"></div>
			</div>
		</div>
	);
};

export default ReviewHeader;
