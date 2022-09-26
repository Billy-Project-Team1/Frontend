// React import
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Style import
import './ReviewCard.scss';

// Redux import
import { getDetailReview } from '../../redux/modules/reviewSlice';
import { useDispatch, useSelector } from 'react-redux';
import ReviewCardContent from './ReviewCardContent';
import ReviewCardComment from './ReviewCardComment';

const ReviewCardDeatil = ({ totalAvg, profile, myUserId, postid }) => {
	const dispatch = useDispatch();
	// const { postid } = useParams();
	// const myUserId = localStorage.getItem('userId');

	useEffect(() => {
		dispatch(getDetailReview({ postid, myUserId }));
	}, []);

	const reviewGet = useSelector((state) => state.review.detailReviewGet);
	console.log(reviewGet);

	return (
		<div>
			{/* <div className="reviewCard_container">
				{reviewGet?.map((item, index) => {
					return (
						<div className="reviewCard_container_box">
							<ReviewCardContent
								item={item}
								index={index}
								profileUrl={profile?.profileUrl}
							/>
							<ReviewCardComment item={item} profileUrl={profile?.profileUrl} />
						</div>
					);
				})}
			</div> */}
		</div>
	);
};

export default ReviewCardDeatil;
