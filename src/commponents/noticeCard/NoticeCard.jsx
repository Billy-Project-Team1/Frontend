import React from 'react';
import './NoticeCard.scss';

const NoticeCard = () => {
  return (
		<div className="noticecard_wrap">
			<div className="noticecard_container">
				<div className="noticecard_img_box">
					<img className="noticecard_img" src="/billyiphone.png" />
				</div>
				<div className="noticecard_right">
					<div className="noticecard_right_top">
						<div className="noticecard_right_top_class">페이지 구현중</div>
						<div className="noticecard_right_top_clock">9월 28일</div>
					</div>
					<div className="noticecard_right_bottom">
						<div>최대한 빠르게 구현하겠습니다 😭</div>
						<div>9월 28일&nbsp;⎻&nbsp;10월 7일 (9박)</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NoticeCard;
