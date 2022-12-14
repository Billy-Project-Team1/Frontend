// React import
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// Redux import
import { useDispatch, useSelector } from 'react-redux';
import { getDetailReview } from '../../redux/modules/reviewSlice';
import { getPost } from '../../redux/modules/postSlice';
import { reservationThunk } from '../../redux/modules/reservationSlice';
// Style import
import './Detail.scss';
import 'swiper/css/bundle';
// Library import
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
// Component import
import DetailHeader from '../../commponents/header/DetailHeader';
import DetailMap from '../../commponents/maps/DetailMap';
import DetailCalendar from '../../commponents/calendar/DetailCalendar';
import DetailFooter from '../../commponents/footer/DetailFooter';
import AlertSmallModal from '../../commponents/modal/AlertSmallModal';
import ReviewCardDeatil from '../../commponents/Review/ReviewCardDeatil';
import ReviewCardDetailStarAvg from '../../commponents/Review/ReviewCardDetailStarAvg';

const Detail = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [blockDate, setBlockDate] = useState([]);

	const { postid } = useParams();
	const myUserId = localStorage.getItem('userId');
	const [modalOn, setModalOn] = useState(false);
	const modalTrue = () => {
		setModalOn(true);
	};
	useEffect(() => {
		dispatch(getPost({ postid, myUserId }));
		window.scrollTo(0, 0);
		dispatch(getDetailReview({ postid, myUserId }));
	}, []);

	const reviewGet = useSelector((state) => state.review?.detailReviewGet);
	const detailPost = useSelector((state) => state.post.post);

	const blockDateList = detailPost.blockDate?.blockDateList;
	const reservationDateList = detailPost.blockDate?.reservationDateList;

	useEffect(() => {
		if (blockDateList && reservationDateList) {
			setBlockDate([...reservationDateList, ...blockDateList]);
		}
	}, [blockDateList]);

	const detailPrice = detailPost.price
		?.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	const detailDeposit = detailPost.deposit
		?.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	//?????? ?????????
	const detailDate = (a) => {
		const milliSeconds = new Date() - a;
		const seconds = milliSeconds / 1000;
		if (seconds < 60) return `?????? ???`;
		const minutes = seconds / 60;
		if (minutes < 60) return `${Math.floor(minutes)}??? ???`;
		const hours = minutes / 60;
		if (hours < 24) return `${Math.floor(hours)}?????? ???`;
		const days = hours / 24;
		if (days < 7) return `${Math.floor(days)}??? ???`;
		const weeks = days / 7;
		if (weeks < 5) return `${Math.floor(weeks)}??? ???`;
		const months = days / 30;
		if (months < 12) return `${Math.floor(months)}?????? ???`;
		const years = days / 365;
		return `${Math.floor(years)}??? ???`;
	};

	const nowDate = detailDate(new Date(detailPost.createdAt));

	const initialState = {
		postId: postid,
		startDate: '',
		endDate: '',
	};
	const [pickDate, setPickDate] = useState(initialState);

	const onReservationHandler = async () => {
		try {
			const response = await dispatch(reservationThunk(pickDate));
			if (response.payload === '????????? ?????????????????????.') {
				return window.location.replace(`/mypage/${myUserId}`);
			} else {
				return;
			}
		} catch (e) {
			return console.log(e);
		}
	};

	const profilePage = () => {
		if (myUserId) {
			navigate(`/mypage/${detailPost.memberUserId}`);
		} else {
			modalTrue();
		}
	};
	const login = () => {
		navigate('/login');
	};

	return (
		<div className="detail_container">
			<div className="detail_header">
				<DetailHeader authorId={detailPost.memberUserId} postId={postid} />
			</div>
			<div className="detail_image_box">
				<Swiper pagination={true} modules={[Pagination]} className="mySwiper">
					{detailPost.postImgUrl?.postImgUrlList.map((item, index) => {
						return (
							<SwiperSlide key={index}>
								<img src={item} />
								<div className="detail_image_gradient" />
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
			<div className="detail_contents_wrap">
				<div className="detail_user_profile">
					<div className="detail_profile_img">
						<img src={detailPost.profileUrl} onClick={() => profilePage()} />
					</div>
					<div className="detail_profile_wrap">
						<div className="detail_nickname" onClick={() => profilePage()}>
							{detailPost.nickname}
						</div>
						<div className="detail_profile_second">
							<span className="detail_location">{detailPost.location} </span>
							<span className="detail_location_line">&nbsp;???&nbsp;</span>
							<span className="detail_time"> {nowDate}</span>
						</div>
					</div>
				</div>
				<div className="detail_content_part">
					<div className="detail_title">{detailPost.title}</div>
					<div className="detail_rental">
						<span className="detail_price">??? ????????? {detailPrice}???</span>
						<span className="detail_rental_line">???</span>
						<span className="detail_deposit">????????? {detailDeposit}???</span>
					</div>
					<div className="detail_content">
						{detailPost.content?.split('\n').map((line, index) => {
							return (
								<span key={index}>
									{line}
									<br />
								</span>
							);
						})}
					</div>
					<div className="detail_bottom_contents">
						<span className="detail_like">
							??????&nbsp;{detailPost.reservationCount}&nbsp;
						</span>
						<span className="detail_contents_line">???</span>
						<span className="detail_like">
							&nbsp;??????&nbsp;{detailPost.likeCount}
						</span>
					</div>
				</div>
				<div className="detail_calendar">
					<DetailCalendar
						data={blockDate}
						detailPost={detailPost}
						setPickDate={setPickDate}
						pickDate={pickDate}
					/>
				</div>
				<div className="detail_map">
					<DetailMap data={detailPost} />
				</div>
			</div>
			<DetailFooter
				authorId={detailPost.memberUserId}
				detailPost={detailPost}
				pickDate={pickDate}
			/>
			{modalOn && (
				<AlertSmallModal
					setModalOn={setModalOn}
					body="???????????? ????????? ??????????????????."
					buttonType="?????????"
					onClickSubmit={login}
				/>
			)}
			<ReviewCardDetailStarAvg reviewGet={reviewGet} />
			<ReviewCardDeatil
				reviewGet={reviewGet}
				profileUrl={detailPost.profileUrl}
				id={postid}
			/>
		</div>
	);
};

export default Detail;
