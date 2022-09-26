import React, { useCallback, useRef, useState } from 'react';

const ReviewCardYourComment = ({ item, index, profileUrl }) => {

	const textRef = useRef();
	const handleResizeHeight = useCallback(() => {
		textRef.current.style.height = textRef.current.scrollHeight + 'px';
	}, []);

	return (
		<div className="reviewCard_wrap">
			<div className="reviewCard_myprofile_img" key={index} />
			<div className="reviewCard_reply_wrap">
				<div className="reviewCard_reply_profile">
					<img className="reviewCard_profile_img" src={profileUrl} alt="" />
				</div>
				<div className="reviewCard_mycomment_done">
					{item?.children[0]?.comment}
				</div>
			</div>
		</div>
	);
};

export default ReviewCardYourComment;
