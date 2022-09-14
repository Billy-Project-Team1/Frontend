import React from 'react';
import './Headers.scss';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft } from 'react-icons/hi';

const AddLocationHeader = ({ move }) => {
	const navigate = useNavigate();

	return (
		<div className="header_container">
			<div className="header_wrap">
				<div className="header_content">
					<HiOutlineChevronLeft
						style={{ marginRight: '22px' }}
						color="#212121"
						size="24px"
						onClick={() => navigate(-1)}
					/>
					<div className="header_title">거래장소 지정</div>
					<div className="header_done">완료</div>
				</div>
				<div className="header_line"></div>
			</div>
		</div>
	);
};

export default AddLocationHeader;
