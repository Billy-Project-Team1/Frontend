// React import
import React, { useCallback, useRef, useState } from 'react';

// Style import
import './ReviewCard.scss';

const ReviewCardComment = ({ item, index, profileUrl }) => {
	const [reviewOpen, setReviewOpen] = useState(false);

	const reviewClose = () => {
		setReviewOpen(!reviewOpen);
	};

	function rentalDate(a) {
		var d = new Date(a);
		return (
			(d.getMonth() + 1 > 9
				? (d.getMonth() + 1).toString()
				: '0' + (d.getMonth() + 1)) +
			'.' +
			(d.getDate() > 9
				? d.getDate().toString()
				: '0' + d.getDate().toString()) +
			'(' +
			('월화수목금토일'.charAt(d.getUTCDay()) + '') +
			')'
		);
	}

	const textRef = useRef();
	const handleResizeHeight = useCallback(() => {
		textRef.current.style.height = textRef.current.scrollHeight + 'px';
	}, []);

	return (
		<div>
			<div className="reviewCard_wrap" key={index}>
				<div className="reviewCard_title">{item.title}</div>
				<span className="reviewCard_rating">{item.star}.0</span>
				<span className="reviewCard_rental_name">{item.nickname} | </span>
				<span className="reviewCard_rental_date">
					{rentalDate(item.startDate)} - {rentalDate(item.endDate)} (
					{item.dateCount}박)
				</span>
				<div className="reviewCard_imgs_wrap">
					{item.reviewImgUrl.map((img, index) => {
						return (
							<div className="reviewCard_img_list" key={index}>
								<img className="reviewCard_img" src={img.reviewImgUrl} alt="" />
							</div>
						);
					})}
				</div>
				<div className="reviewCard_comment">{item.comment}</div>
				<div className="reviewCard_myprofile_img" />
				{item?.children[0]?.comment ? (
					<div className="reviewCard_reply_wrap">
						<div className="reviewCard_reply_profile">
							<img className="reviewCard_profile_img" src={profileUrl} alt="" />
						</div>
						<div className="reviewCard_mycomment_done">
							{item?.children[0]?.comment}
						</div>{' '}
					</div>
				) : reviewOpen === false ? (
					<div className="reviewCard_addcomment_btn" onClick={reviewClose}>
						리뷰 답글 달기
					</div>
				) : (
					<div className="reviewCard_reply_wrap">
						<div className="reviewCard_reply_profile">
							<img className="reviewCard_profile_img" src={profileUrl} alt="" />
						</div>
						<div className="reviewCard_mycomment_wrap">
							<div className="reviewCard_mycomment">
								<textarea
									ref={textRef}
									type="text"
									placeholder="리뷰에 대한 감사 인사를 전해주세요!"
									onInput={handleResizeHeight}
								/>
							</div>
							<div className="reviewCard_btns">
								<div className="reviewCard_cancel_btn" onClick={reviewClose}>
									취소
								</div>
								<div className="reviewCard_add_btn">저장</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ReviewCardComment;
