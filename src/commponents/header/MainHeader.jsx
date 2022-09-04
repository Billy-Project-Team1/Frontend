import React from 'react';
import './Headers.scss';
import { useNavigate } from 'react-router-dom';
import { HiSearch } from 'react-icons/hi';
import { FaRegBell } from 'react-icons/fa';

const MainHeader = (props) => {
	const navigate = useNavigate();

	const move = () => {
		navigate('/posting', {
			state: {
				title: '글 쓰기',
				done: '완료',
			},
		});
	};

	return (
		<div className="header_wrap">
			<div className="main_header_content">
				<HiSearch
					style={{ marginRight: '22px' }}
					color="#656565"
					size="24px"
					onClick={() => navigate(-1)}
				/>
				<FaRegBell
					style={{ marginRight: '22px' }}
					color="#656565"
					size="24px"
				/>
			</div>
			<div className="header_line"></div>
		</div>
	);
};

export default MainHeader;
