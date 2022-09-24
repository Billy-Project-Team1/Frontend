import React, { useEffect } from 'react';
import './ReviewCard.scss';
import { useNavigate } from 'react-router-dom';
import { getMypageReview } from '../../redux/modules/reviewSlice';
import { useDispatch, useSelector } from 'react-redux';

const ReviewCard = ({ post, totalAvg }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const reviewGet = useSelector((state) => state.review.reviewGet);
	console.log(reviewGet);

	useEffect(() => {
		dispatch(getMypageReview());
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

	return (
		<div>
			<div className="reviewPost_container">
				<div className="reviewPost_star_avg">{totalAvg}</div>
				{reviewGet?.map((item, index) => {
					return (
						<div style={{ border: '1px solid gray' }} key={index}>
							<div className="reviewPost_title">{item.title}</div>
							<span className="reviewPost_rating">{item.star}</span>
							<span className="reviewPost_rental_name">{item.nickname}</span>
							<span className="reviewPost_rental_date">
								{rentalDate(item.startDate)} -{rentalDate(item.endDate)}(
								{item.dateCount}박)
							</span>
							<div className="reviewPost_imgs">{item.reviewImgUrl}</div>
							<div className="reviewPost_comment">{item.comment}</div>

							<div className="reviewPost_myprofile_img" />
							<div
								className="reviewPost_mycomment"
								style={{ color: 'pink', border: 'gray' }}
							>
								{item?.children[0]?.comment}
							</div>

							<div className="reviewPost_addcomment">리뷰 답글 달기</div>

							<div className="reviewPost_addcomment"></div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ReviewCard;
