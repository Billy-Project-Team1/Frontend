// React import
import React from 'react';
import { useNavigate } from 'react-router-dom';
// Style & Icon import
import './Headers.scss';
import { HiOutlineChevronLeft } from 'react-icons/hi';

const Headers = ({ pageName, onClickSave, type }) => {
	const navigate = useNavigate();

	return (
		<div className="header_container">
			<div className="header_wrap">
				<div className="header_content">
					<HiOutlineChevronLeft
						style={{ marginRight: '17px', cursor: 'pointer' }}
						color="#212121"
						size="24px"
						onClick={() => navigate(-1)}
					/>
					<div className="header_title">{pageName}</div>
					<div className="header_done" onClick={onClickSave}>
						{type}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Headers;
