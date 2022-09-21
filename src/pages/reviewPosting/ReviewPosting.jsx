import React, { useState } from 'react';
import './ReviewPosting.scss';
// import components
import ReviewHeader from '../../commponents/header/ReviewHeader';
import StarRating from '../../commponents/starRating/StarRating';
import ImageUploader from '../../commponents/imageUploader/ImageUploader';
import { addReview } from '../../redux/modules/reviewSlice';


const ReviewPosting = () => {
	const initialState = {
		reservationId: '',
		stars: '',
		comment: '',
	};
	const [data, setData] = useState(initialState);
	const [img, setImg] = useState([]);

	// useEffect(() => {
	// 	dispatch(addReview(id));
	// }, [dispatch]);

	const onChangeHandler = (e) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
	};
	console.log(data);

	return (
		<div>
			<ReviewHeader />
			<div className="reviewPost_container">
				<div className="reviewPost_rating_container">
					<div className="reviewPost_img_box">
						<img className="reviewPost_img" />
					</div>
					<div className="reviewPost_right_box">
						<div className="reviewPost_title">
							거래에 대한 평가를 남겨주세요.
						</div>
						<div className="reviewPost_star">
							<StarRating onChangeHandler={onChangeHandler} />
						</div>
					</div>
				</div>

				<div className="reviewPost_write">
					<span className="reviewPost_title">후기를 써주세요.</span>
					<span className="reviewPost_option"> (선택)</span>
					<div className="reviewPost_write_content">
						<textarea
							type="text"
							placeholder="후기를 남겨주시면 다른 대여자들에게 도움이 됩니다!"
							name="comment"
							value={data.comment}
							onChange={onChangeHandler}
						/>
					</div>
				</div>

				<div className="reviewPost_upload_img">
					<span className="reviewPost_title">제품 사진을 올려주세요.</span>
					<span className="reviewPost_option"> (선택)</span>
				</div>
				<ImageUploader img={img} setImg={setImg} />
				<div className="reviewPost_submit_btn">작성완료</div>
			</div>
		</div>
	);
};

export default ReviewPosting;
