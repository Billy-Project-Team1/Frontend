// React import
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Style import
import './ReviewCard.scss';
import { FaStar } from 'react-icons/fa';

// Redux import
import { getMypageReview } from '../../redux/modules/reviewSlice';
import { useDispatch, useSelector } from 'react-redux';

const ReviewCard = ({ post, totalAvg }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {id} = useParams();
	const reviewGet = useSelector((state) => state.review.reviewGet);
	console.log(reviewGet);

	useEffect(() => {
		dispatch(getMypageReview(id));
	}, [JSON.stringify(reviewGet)]);

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

	//false:첫 화면은 닫혀있는 상태
	const [reviewOpen, setReviewOpen] = useState(false);
	//boolean값 주기
	const reviewClose = () => {
		setReviewOpen(!reviewOpen);
	};

	return (
		<div>
			<div className="reviewCard_container">
				<div className="reviewCard_star_avg">
					{' '}
					<FaStar className="MainListCardStar" />총 별점 {totalAvg}
				</div>
				{reviewGet?.map((item, index) => {
					return (
						<div className="reviewCard_wrap" key={index}>
							<div className="reviewCard_title">{item.title}</div>
							<span className="reviewCard_rating">{item.star}.0</span>
							<span className="reviewCard_rental_name">{item.nickname} | </span>
							<span className="reviewCard_rental_date">
								{rentalDate(item.startDate)} - {rentalDate(item.endDate)} (
								{item.dateCount}박)
							</span>
							<div className="reviewCard_imgs">{item.reviewImgUrl}</div>
							<div className="reviewCard_comment">{item.comment}</div>
							<div className="reviewCard_myprofile_img" />
							<div className="reviewCard_addcomment_btn" onClick={reviewClose}>
								리뷰 답글 달기
							</div>
							{reviewOpen && (
								<div className="reviewCard_reply_wrap">
									<div className="reviewCard_reply_profile"></div>
									<div className="reviewCard_mycomment">
										{item?.children[0]?.comment ? (
											item?.children[0]?.comment
										) : (
											<input
												type="text"
												placeholder="리뷰에 대한 감사 인사를 전해주세요!"
											/>
										)}
									</div>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ReviewCard;
