import React, { useCallback, useRef, useState } from 'react'

const ReviewCardComment = ({ item, index, profileUrl }) => {
	const [reviewOpen, setReviewOpen] = useState(false);

	const reviewClose = () => {
		setReviewOpen(!reviewOpen);
	};
	const textRef = useRef();
	const handleResizeHeight = useCallback(() => {
		textRef.current.style.height = textRef.current.scrollHeight + 'px';
	}, []);

	return (
		<div className="reviewCard_wrap">
			<div className="reviewCard_myprofile_img" key={index} />
			{item?.children[0]?.comment ? (
				<div className="reviewCard_reply_wrap">
					<div className="reviewCard_reply_profile">
						<img className="reviewCard_profile_img" src={profileUrl} alt="" />
					</div>
					<div className="reviewCard_mycomment_done">
						{item?.children[0]?.comment}
					</div>
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
	);
};

export default ReviewCardComment;