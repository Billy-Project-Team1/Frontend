import React from 'react';
import './Headers.scss';
import { HiOutlineChevronLeft } from 'react-icons/hi';

const MapModalheader = ({ pageName, setSearchMapModal }) => {

	return (
		<div className="header_container">
			<div className="header_wrap">
				<div className="mypage_header_content">
					<HiOutlineChevronLeft
						style={{ marginRight: '17px', cursor: 'pointer' }}
						color="#212121"
						size="24px"
						onClick={() => setSearchMapModal(false)}
					/>
					<div className="mypage_header_title">{pageName}</div>
					<div className="mypage_header_done">&nbsp;</div>
				</div>
				<div className="header_line"></div>
			</div>
		</div>
	);
};

export default MapModalheader;
