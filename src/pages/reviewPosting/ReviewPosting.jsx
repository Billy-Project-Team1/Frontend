// React import
import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';

// Redux import
import { useDispatch, useSelector } from 'react-redux';
import { addReview } from '../../redux/modules/reviewSlice';

// Style import
import './ReviewPosting.scss';

// Components import
import Headers2 from '../../commponents/header/Headers2';
import StarRating from '../../commponents/starRating/StarRating';
import ImageUploader from '../../commponents/imageUploader/ImageUploader';

const ReviewPosting = () => {
	const { postId, reservationId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const initialState = {
		reservationId: reservationId,
		star: 0,
		comment: '',
	};
	const [data, setData] = useState(initialState);
	const [img, setImg] = useState([]);

	const onChangeHandler = (e) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
	};
	console.log(data);

	const onPostingHandler = async (e) => {
		e.preventDefault();
		//이미지 form 데이터
		let formData = new FormData();
		//a는 이름으로  b를 저장한다. c는 어떠한 타입으로 / form은 c를 굳이 안써도됨
		// formData.append(a,b)
		formData.append(
			'reviewRequestDto',
			new Blob([JSON.stringify(data)], { type: 'application/json' })
		);
		for (let i = 0; i < img.length; i++) {
			formData.append('files', img[i]);
		}

		try {
			const data = await dispatch(addReview(formData)).unwrap();
			console.log(data);
			if (data) {
				navigate(`/detail/${postId}`);
			} else {
				console.log(data);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<Headers2 pageName="리뷰 작성" />
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
				<div
					className="reviewPost_submit_btn"
					type="submit"
					onClick={onPostingHandler}
				>
					작성완료
				</div>
			</div>
		</div>
	);
};

export default ReviewPosting;
