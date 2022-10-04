// React import
import React, { useState } from 'react';
// Style import
import './StarRating.scss';
// Icon import
import { FaStar } from 'react-icons/fa';
import { useEffect } from 'react';

const ReviewStarRating = ({ reviewRating }) => {
	const [rating, setRating] = useState(null);
	const [hover, setHover] = useState(null);

	useEffect(() => {
		setRating(reviewRating);
	}, []);

	return (
		<div className="reviweStarRating_wrap">
			{[...Array(5)].map((star, i) => {
				const ratingValue = i + 1;
				return (
					<label className="reviewStarRating_Fastar_label" key={i}>
						<FaStar
							className="reviewStarRating_star"
							color={ratingValue <= (hover || rating) ? '#FED500' : '#EEEEEE'}
							size={18}
						/>
					</label>
				);
			})}
		</div>
	);
};

export default ReviewStarRating;
