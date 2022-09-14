import React from 'react';
import DetailHeader from '../../commponents/header/DetailHeader';
import { useParams } from 'react-router-dom';
import './Detail.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../../redux/modules/postSlice';
import DetailMap from '../../commponents/maps/DetailMap';
import DetailCalendar from '../../commponents/calendar/DetailCalendar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css/bundle';

const Detail = () => {
	//2. 함수 만들 때 수입해서 쓸거임. slice에서 수입해올 때 사용하는 함수임.
	// redux toolkit 전역변수는 props 따로 사용할 필요 없이 함수를 받아올 수 있게 해줌.
	const dispatch = useDispatch();

	//3. 주소창에 있는 id num을 불러오기 위함. app.js에서 확인
	const { postid } = useParams();
	console.log(postid);
	// 1. 포스팅에서 완료버튼 누르면 내용 불러오기
	// [] 안에 있는게 변화하면 실행을 해주는 함수. [] 안에 내용이 없으면 처음 페이지가 랜더링 되었을 때 한번만 실행해줌.
	useEffect(() => {
		//slice에 있는 함수 불러오기
		//getPost(여기) 여기에 데이터를 넣으면 postslice의 payload 값이 됨.
		//3-1 에 넣은 postid가 여기로 들어옴. -> slice가서 확인해보면 payload값으로 들어가는걸 확인할 수 있음.
		dispatch(getPost(postid));
		window.scrollTo(0,0);
		// console.log("123")
		window.scrollTo(0,0);

	}, []);
	

	// slice에 있는 post를 쓸 수 있게 해줌. (리덕스 안에 있는 애를 뽑아쓸 때 필요함)
	// state는 전역변수를 뜻하는거기 때문에 걍 쓰삼 (configstore를 뜻함)
	// state.post 는 configstore에 지정해둔 post 값임 slice를 뜻함
	// state.post.post는 slice안에 있는 Initialstate값을 가져옴
	const detailPost = useSelector((state) => state.post.post);
	console.log(detailPost);

	//1. props 내려주는거임
	//로그인 정보를 가져옴. 게시글 삭제 버튼을 위함 ㅋㅋ~
	const myUserId = localStorage.getItem('userId');

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

	return (
		<div className="detail_container">
			{/* 2. props 내려줌 그럼 받는측은 ㅇㄷ? header 가보기~*/}
			<div className="detail_header">
				<DetailHeader authorId={detailPost.authorId} />
			</div>
			<div className="detail_image_box">
				<Swiper pagination={true} modules={[Pagination]} className="mySwiper">
					{detailPost.postImgUrl?.postImgUrlList.map((item) => {
						return (
							<SwiperSlide>
								<img src={item} />
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
			<div className="detail_contents_wrap">
				<div className="detail_user_profile">
					<div className="detail_profile_img">
						<img src={detailPost.profileUrl} />
					</div>
					<div className="detail_profile_wrap">
						<div className="detail_nickname">{detailPost.nickname}</div>
						<div className="detail_profile_second">
							<span className="detail_location">{detailPost.location} </span>
							<span className="detail_location_line">&nbsp;|&nbsp;</span>
							<span className="detail_time"> {nowDate}</span>
						</div>
					</div>
				</div>
				<div className="detail_content_part">
					<div className="detail_title">{detailPost.title}</div>
					<div className="detail_rental">
						<span className="detail_price">일 대여금 {detailPost.price}원</span>
						<span className="detail_rental_line">|</span>
						<span className="detail_deposit">
							보증금 {detailPost.deposit}원
						</span>
					</div>
					<div className="detail_content">
						{detailPost.content?.split('\n').map((line) => {
							return (
								<span>
									{line}
									<br />
								</span>
							);
						})}
					</div>
					<div className="detail_bottom_contents">
						<span className="detail_like">
							대여&nbsp;{detailPost.likeCount}&nbsp;
						</span>
						<span className="detail_contents_line">|</span>
						<span className="detail_like">
							&nbsp;관심&nbsp;{detailPost.likeCount}
						</span>
					</div>
				</div>
			</div>
			<div className="detail_map">
				<DetailMap data={detailPost} />
			</div>
			<div className="detail_calendar">
				<DetailCalendar
					data={detailPost.blockDate?.blockDateList}
					detailPost={detailPost}
				/>
			</div>
		</div>
	);
};

export default Detail;
