import React from 'react';
import './DetailHeader.scss';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft } from 'react-icons/hi';

const DetailHeader = (props) => {
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
			<div className="header_content">
				<HiOutlineChevronLeft
					style={{ marginRight: '22px' }}
					color="#656565"
					size="24px"
					onClick={() => navigate(-1)}
				/>
				<div className="header_done">완료</div>
			</div>
			<div className="header_line"></div>
		</div>
	);
};

export default DetailHeader;
