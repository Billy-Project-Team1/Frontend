// React import
import React, { useState } from 'react';
// Style import
import './StarRating.scss';
// Icon import
import { FaStar } from 'react-icons/fa';

const StarRating = ({ onChangeHandler }) => {
	const [rating, setRating] = useState(null);
	const [hover, setHover] = useState(null);

	return (
		<div>
			{[...Array(5)].map((star, i) => {
				const ratingValue = i + 1;
				return (
					<label key={i}>
						<input
							className="starRating_rating"
							type="radio"
							name="star"
							value={ratingValue}
							onChange={(e) => onChangeHandler(e)}
							onClick={() => setRating(ratingValue)}
						/>
						<FaStar
							className="starRating_star"
							color={ratingValue <= (hover || rating) ? '#FED500' : '#EEEEEE'}
							size={33}
							onMouseEnter={() => setHover(ratingValue)}
							onMouseLeave={() => setHover(null)}
						/>
					</label>
				);
			})}
		</div>
	);
};

export default StarRating;
