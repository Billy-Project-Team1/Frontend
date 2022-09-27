// React import
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Style import
import './ReviewCard.scss';
import { FaStar } from 'react-icons/fa';

// Redux import
import { getMypageReview } from '../../redux/modules/reviewSlice';
import { useDispatch, useSelector } from 'react-redux';
import ReviewCardContent from './ReviewCardContent';
import ReviewCardComment from './ReviewCardComment';

const ReviewCard = ({ totalAvg, profile }) => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const reviewGet = useSelector((state) => state.review.reviewGet);
	console.log(reviewGet)

	useEffect(() => {
		dispatch(getMypageReview(id));
	}, []);

	return (
		<div>
			<div className="reviewCard_container">
				{reviewGet?.map((item, index) => {
					return (
						<div className="reviewCard_container_box">
							<ReviewCardContent
								item={item}
								index={index}
								profileUrl={profile?.profileUrl}
							/>
							<ReviewCardComment item={item} profileUrl={profile?.profileUrl} reviewId={item.reviewId}/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ReviewCard;
