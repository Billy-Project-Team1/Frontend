import React from 'react';
import ReviewHeader from '../../commponents/header/ReviewHeader';
import StarRating from '../../commponents/starRating/StarRating';
import ImageUploader from '../../commponents/imageUploader/ImageUploader';
import './ReviewPosting.scss';
import { useState } from 'react';

const ReviewPosting = () => {
	//API 참고해서 적기
	const initialState = {
		reservationId: '',
		stars: '',
		comment: '',
	};
	const [data, setData] = useState(initialState);
	const [img, setImg] = useState([]);

	//이거 그냥 복붙! onChangeHandler & setData만 바꿔주기
	const onChangeHandler = (e) => {
		const { name, value } = e.target;
		//...data 기존 데이터 두고 추가시키는 느낌
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
							<StarRating
								name="star"
								value={data.content}
								onChange={onChangeHandler}
							/>
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
							name="content"
							value={data.content}
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
