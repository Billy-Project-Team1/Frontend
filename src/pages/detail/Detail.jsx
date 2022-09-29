// React import
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Redux import
import { useDispatch, useSelector } from 'react-redux';

// Style import
import './Detail.scss';
import 'swiper/css/bundle';

// Library import
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

// Sclice import
import { getPost } from '../../redux/modules/postSlice';
import { reservationThunk } from '../../redux/modules/reservationSlice';

// Component import
import DetailHeader from '../../commponents/header/DetailHeader';
import DetailMap from '../../commponents/maps/DetailMap';
import DetailCalendar from '../../commponents/calendar/DetailCalendar';
import DetailFooter from '../../commponents/footer/DetailFooter';
import AlertSmallModal from '../../commponents/modal/AlertSmallModal';
import ReviewCardDeatil from '../../commponents/Review/ReviewCardDeatil';
import ReviewCardDetailStarAvg from '../../commponents/Review/ReviewCardDetailStarAvg';
import { getDetailReview } from '../../redux/modules/reviewSlice';

const Detail = () => {
	//2. 함수 만들 때 수입해서 쓸거임. slice에서 수입해올 때 사용하는 함수임.
	// redux toolkit 전역변수는 props 따로 사용할 필요 없이 함수를 받아올 수 있게 해줌.
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [blockDate, setBlockDate] = useState([]);

	//3. 주소창에 있는 id num을 불러오기 위함. app.js에서 확인
	const { postid } = useParams();
	const myUserId = localStorage.getItem('userId');
	const [modalOn, setModalOn] = useState(false);
	const modalTrue = () => {
		setModalOn(true);
	};

	// 1. 포스팅에서 완료버튼 누르면 내용 불러오기
	// [] 안에 있는게 변화하면 실행을 해주는 함수. [] 안에 내용이 없으면 처음 페이지가 랜더링 되었을 때 한번만 실행해줌.
	useEffect(() => {
		//slice에 있는 함수 불러오기
		//getPost(여기) 여기에 데이터를 넣으면 postslice의 payload 값이 됨.
		//3-1 에 넣은 postid가 여기로 들어옴. -> slice가서 확인해보면 payload값으로 들어가는걸 확인할 수 있음.
		dispatch(getPost({ postid, myUserId }));
		// console.log("123")
		window.scrollTo(0, 0);
		dispatch(getDetailReview({ postid, myUserId }));
	}, []);

	const reviewGet = useSelector((state) => state.review?.detailReviewGet);
	// slice에 있는 post를 쓸 수 있게 해줌. (리덕스 안에 있는 애를 뽑아쓸 때 필요함)
	// state는 전역변수를 뜻하는거기 때문에 걍 쓰삼 (configstore를 뜻함)
	// state.post 는 configstore에 지정해둔 post 값임 slice를 뜻함
	// state.post.post는 slice안에 있는 Initialstate값을 가져옴
	const detailPost = useSelector((state) => state.post.post);

	const blockDateList = detailPost.blockDate?.blockDateList;
	const reservationDateList = detailPost.blockDate?.reservationDateList;

	useEffect(() => {
		if (blockDateList && reservationDateList) {
			setBlockDate([...reservationDateList, ...blockDateList]);
		}
	}, [blockDateList]);

	//1. props 내려주는거임
	//로그인 정보를 가져옴. 게시글 삭제 버튼을 위함 ㅋㅋ~

	const detailPrice = detailPost.price
		?.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	const detailDeposit = detailPost.deposit
		?.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	//시간 바꾸기
	const detailDate = (a) => {
		const milliSeconds = new Date() - a;
		const seconds = milliSeconds / 1000;
		if (seconds < 60) return `방금 전`;
		const minutes = seconds / 60;
		if (minutes < 60) return `${Math.floor(minutes)}분 전`;
		const hours = minutes / 60;
		if (hours < 24) return `${Math.floor(hours)}시간 전`;
		const days = hours / 24;
		if (days < 7) return `${Math.floor(days)}일 전`;
		const weeks = days / 7;
		if (weeks < 5) return `${Math.floor(weeks)}주 전`;
		const months = days / 30;
		if (months < 12) return `${Math.floor(months)}개월 전`;
		const years = days / 365;
		return `${Math.floor(years)}년 전`;
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
			if (response.payload === '예약이 접수되었습니다.') {
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
							<span className="detail_location_line">&nbsp;⎜&nbsp;</span>
							<span className="detail_time"> {nowDate}</span>
						</div>
					</div>
				</div>
				<div className="detail_content_part">
					<div className="detail_title">{detailPost.title}</div>
					<div className="detail_rental">
						<span className="detail_price">일 대여금 {detailPrice}원</span>
						<span className="detail_rental_line">⎜</span>
						<span className="detail_deposit">보증금 {detailDeposit}원</span>
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
							대여&nbsp;{detailPost.reservationCount}&nbsp;
						</span>
						<span className="detail_contents_line">⎜</span>
						<span className="detail_like">
							&nbsp;관심&nbsp;{detailPost.likeCount}
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
					body="로그인이 필요한 페이지입니다."
					buttonType="로그인"
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
