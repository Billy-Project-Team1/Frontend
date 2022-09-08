import React from 'react';
import { useLocation } from 'react-router-dom';
import DetailHeader from '../../commponents/header/DetailHeader';
import './Detail.scss';

const Detail = () => {
	return (
		<div className="detail_container">
			<DetailHeader style={{ position: 'absolute' }} />
			<div className="detail_image_box" />
			<div className="detail_user_profile">
				<p>프로필~</p>
			</div>

			<div className="detail_title">
				{/* <input>여기에 타이틀이 들어갑니다.</input> */}
			</div>
		</div>
	);
};

export default Detail;
