import React, { useCallback, useId, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addDetailReview } from '../../redux/modules/reviewSlice';

const ReviewCardComment = ({ item, index, profileUrl, reviewId }) => {
	const [reviewOpen, setReviewOpen] = useState(false);
	const [reply, setReply] = useState({ comment: '', reviewId: `${reviewId}` });
	const dispatch = useDispatch();
	const userId = localStorage.getItem('userId');

	const onChangeHandler = (e) => {
		const { name, value } = e.target;
		//...data 기존 데이터 두고 추가시키는 느낌
		setReply({ ...reply, [name]: value });
	};
	console.log(reply);

	const reviewClose = () => {
		setReviewOpen(!reviewOpen);
	};
	const textRef = useRef();
	const handleResizeHeight = useCallback(() => {
		textRef.current.style.height = textRef.current.scrollHeight + 'px';
	}, []);

	const onPostingHandler = async (a) => {
		try {
			const response = await dispatch(addDetailReview({ a })).unwrap(); //useEffect 쓰려고 벗겨주는거임. (무엇을???)
			if (response) {
				window.location.reload(`/mypage/${userId}`);
				// setReload(true);
			}
		} catch {}
	};

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
								name="comment"
								onInput={handleResizeHeight}
								value={reply.comment}
								onChange={onChangeHandler}
							/>
						</div>
						<div className="reviewCard_btns">
							<div className="reviewCard_cancel_btn" onClick={reviewClose}>
								취소
							</div>
							<div
								className="reviewCard_add_btn"
								type="submit"
								onClick={() => onPostingHandler(reply)}
							>
								저장
							</div>
						</div>

						<div className="reviewCard_btns">
							<div className="reviewCard_cancel_btn" onClick={reviewClose}>
								수정
							</div>
							<div className="reviewCard_add_btn">삭제</div>
						</div>
						
					</div>
				</div>
			)}
		</div>
	);
};

export default ReviewCardComment;
