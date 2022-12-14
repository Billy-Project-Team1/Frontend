// React import
import React from 'react';
import { useNavigate } from 'react-router-dom';
// Style & Icon import
import './Headers.scss';
import { HiOutlineChevronLeft } from 'react-icons/hi';

const ChatHeader = ({ quitRoom }) => {
	const navigate = useNavigate();

	return (
		<div className="chat_header_container">
			<div className="header_wrap">
				<div className="header_content">
					<HiOutlineChevronLeft
						style={{ marginRight: '22px', cursor: 'pointer' }}
						color="#212121"
						size="24px"
						onClick={() => navigate(-1)}
					/>
					<div className="header_title">&nbsp;</div>
					<div className="header_done" onClick={() => quitRoom()}>
						나가기
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatHeader;
