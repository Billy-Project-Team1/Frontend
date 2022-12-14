// React import
import React, { useCallback, useRef, useState } from 'react';
// Redux improt
import { useDispatch } from 'react-redux';
import { delReview } from '../../redux/modules/reviewSlice';
// Style & Icon import
import './ReviewCard.scss';
import { TbMinusVertical } from 'react-icons/tb';
import { TbDotsVertical } from 'react-icons/tb';
// Component import
import ReviewStarRating from '../starRating/ReviewStarRating';
import ReviewModal from '../modal/ReviewModal';
import AlertSmallModal from '../modal/AlertSmallModal';

const ReviewCardContent = ({ item, index, authorId, id, reviewId }) => {
	const userId = localStorage.getItem('userId');
	const dispatch = useDispatch();

	function rentalDate(a) {
		var d = new Date(a);
		return (
			(d.getMonth() + 1 > 9
				? (d.getMonth() + 1).toString()
				: '0' + (d.getMonth() + 1)) +
			'.' +
			(d.getDate() > 9 ? d.getDate().toString() : '0' + d.getDate().toString())
		);
	}

	const textRef = useRef();
	const handleResizeHeight = useCallback(() => {
		textRef.current.style.height = textRef.current.scrollHeight + 'px';
	}, []);

	const [modalOpen, setModalOpen] = useState(false);
	const showModal = () => {
		setModalOpen(!modalOpen);
	};

	const [modalOn, setModalOn] = useState(false);

	const deleteHandler = async () => {
		try {
			const data = await dispatch(delReview({ reviewId, id })).unwrap();
			console.log(data);
			if (data) {
				return window.location.replace('/');
			}
		} catch {}
	};
	return (
		<>
			<div>
				<div className="reviewCard_wrap_2" key={index}>
					<div className="reviewCard_title">{item.title}</div>
					<div className="reviewCard_rating_name_wrap">
						<div className="reviewCard_rating_name_box">
							<ReviewStarRating
								className="reviewStarRating_star"
								reviewRating={item.star}
							/>
						</div>
						<div className="reviewCard_rating_container">
							<div className="reviewCard_rating_box">
								<div className="reviewCard_rating">{item.star}.0</div>
								<div className="reviewCard_rating_name_box">
									<div className="reviewCard_rating_box">
										<div className="reviewCard_rental_name">
											{item.nickname}
										</div>
										<div className="reviewCard_middle_line">
											<TbMinusVertical />
										</div>
										<div className="reviewCard_rental_date">
											{rentalDate(item.startDate)}&nbsp;???&nbsp;
											{rentalDate(item.endDate)} ({item.dateCount}???)
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="reviewCard_rating_name_wrap_btn">
							{userId === authorId ? (
								<>
									<TbDotsVertical
										style={{ fontSize: '20px', color: '#757575' }}
										onClick={() => showModal()}
									/>
								</>
							) : (
								''
							)}
						</div>
					</div>
					<div className="reviewCard_imgs_wrap">
						{item.reviewImgUrl.map((img, index) => {
							return (
								<div className="reviewCard_img_list" key={index}>
									<img
										className="reviewCard_img"
										src={img.reviewImgUrl}
										alt=""
									/>
								</div>
							);
						})}
					</div>
					<div className="reviewCard_comment">{item.comment}</div>
				</div>
				{modalOpen && (
					<ReviewModal
						showModal={showModal}
						setModalOpen={setModalOpen}
						setModalOn={setModalOn}
					/>
				)}
			</div>
			{modalOn && (
				<AlertSmallModal
					setModalOn={setModalOn}
					body="?????????????????????????"
					buttonType="??????"
					onClickSubmit={deleteHandler}
				/>
			)}
		</>
	);
};

export default ReviewCardContent;
