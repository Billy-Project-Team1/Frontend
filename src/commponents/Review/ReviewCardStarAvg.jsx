// React import
import React from 'react';
import { useSelector } from 'react-redux';
// Icon import
import { FaStar } from 'react-icons/fa';

const ReviewCardStarAvg = ({ totalAvg }) => {
	const reviewGet = useSelector((state) => state.review.reviewGet);

	return (
		<>
			{reviewGet.length === 0 ? (
				''
			) : (
				<div className="ReviewCard_starAvg_container">
					<div className="reviewCard_star_avg">
						<div className="reviewCard_total">대여 리뷰</div>
						<div className="reciewCard_one_star_wrap">
							<FaStar className="reviewCard_one_star" />
						</div>
						{totalAvg} ({reviewGet?.length})
					</div>
				</div>
			)}
		</>
	);
};

export default ReviewCardStarAvg;
