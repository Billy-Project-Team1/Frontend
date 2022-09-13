import React from 'react';
import './Headers.scss';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import dotIcon from '../../static/image/detail_dot_icon.svg';

//3.props 받은건데 47번에 보라색 이름이 들어오는거
const AddPostingHeader = ({ move, mine }) => {
	const navigate = useNavigate();

	return (
		<div className="detail_header_container">
			<div className="detail_header_wrap">
				<div className="mypage_header_content">
					<HiOutlineChevronLeft
						style={{ marginRight: '22px' }}
						color="#656565"
						size="24px"
						onClick={() => navigate(-1)}
					/>

					{/* 4. 삼항연산자. props 이용해하기. api 확인~ */}
					{mine === true ? <img src={dotIcon} /> : ''}
				</div>
			</div>
		</div>
	);
};

export default AddPostingHeader;
