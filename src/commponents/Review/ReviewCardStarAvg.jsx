import React from 'react';
import { FaStar } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const ReviewCardStarAvg = ({ totalAvg }) => {
	const reviewGet = useSelector((state) => state.review.reviewGet);

	return (
		<div className="ReviewCard_starAvg_container">
			<div className="reviewCard_star_avg">
				<div className="reviewCard_total">대여 리뷰</div>
				<div className="reciewCard_one_star_wrap">
					<FaStar className="reviewCard_one_star" />
				</div>
				{totalAvg} ({reviewGet?.length})
			</div>
		</div>
	);
};

export default ReviewCardStarAvg;
