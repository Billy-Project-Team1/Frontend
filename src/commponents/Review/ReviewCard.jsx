// React import
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Style import
import './ReviewCard.scss';
import { FaStar } from 'react-icons/fa';

// Redux import
import { getMypageReview } from '../../redux/modules/reviewSlice';
import { useDispatch, useSelector } from 'react-redux';
import ReviewCardComment from './ReviewCardComment';

const ReviewCard = ({ totalAvg, profile }) => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const reviewGet = useSelector((state) => state.review.reviewGet);

	useEffect(() => {
		dispatch(getMypageReview(id));
	}, []);

	return (
		<div>
			<div className="reviewCard_container">
				<div className="reviewCard_star_avg">
					<div className="reviewCard_total">총 별점</div>
					<div className="reciewCard_one_star_wrap">
						<FaStar className="reviewCard_one_star" />
					</div>
					{totalAvg} ({reviewGet.length})
				</div>
				{reviewGet?.map((item, index) => {
					return (
						<ReviewCardComment
							item={item}
							index={index}
							profileUrl={profile?.profileUrl}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default ReviewCard;
