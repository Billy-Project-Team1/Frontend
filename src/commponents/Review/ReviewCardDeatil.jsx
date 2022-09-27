// React import
import React from 'react';

// Style import
import './ReviewCard.scss';

// Redux import
import { useDispatch } from 'react-redux';
import ReviewCardContent from './ReviewCardContent';
import ReviewCardYourComment from './ReviewCardYourComment ';

const ReviewCardDeatil = ({ totalAvg, profile, reviewGet, profileUrl }) => {
	const dispatch = useDispatch();
	return (
		<div>
			<div className="reviewCard_container">
				{!!reviewGet
					? reviewGet?.map((item, index) => {
							return (
								<div className="reviewCard_container_box">
									<ReviewCardContent
										item={item}
										index={index}
										profileUrl={profileUrl}
									/>
									{item?.children[0]?.comment ? (
										<ReviewCardYourComment
											item={item}
											profileUrl={profileUrl}
										/>
									) : (
										''
									)}
								</div>
							);
					  })
					: ''}
			</div>
		</div>
	);
};

export default ReviewCardDeatil;
