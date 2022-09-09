import React from 'react';
import { useNavigate } from 'react-router-dom';

//style
import './Headers.scss';

//icons
import { HiSearch } from 'react-icons/hi';
import { FaRegBell } from 'react-icons/fa';

const MainHeader = ({ move }) => {
	const navigate = useNavigate();

	return (
		<div className="header_container">
			<div className="header_top" />
			<div className="header_wrap">
				<div className="billy_logo" />
				<div className="main_header_content">
					<HiSearch
						style={{ marginRight: '14px' }}
						color="#212121"
						size="24px"
						onClick={() => navigate(-1)}
					/>
					<FaRegBell color="#212121" size="24px" />
				</div>
				<div className="header_line"></div>
			</div>
		</div>
	);
};

export default MainHeader;
