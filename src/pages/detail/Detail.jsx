import React from 'react';

import DetailHeader from '../../commponents/header/DetailHeader';
import MyProfilHeader from '../../commponents/myProfile/MyProfileHeader';

import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import './Detail.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../../redux/modules/postSlice';

const Detail = () => {
	//2. 함수 만들 때 수입해서 쓸거임. slice에서 수입해올 때 사용하는 함수임.
	// redux toolkit 전역변수는 props 따로 사용할 필요 없이 함수를 받아올 수 있게 해줌.
	const dispatch = useDispatch();

	//3. 주소창에 있는 id num을 불러오기 위함. app.js에서 확인
	const {postid} = useParams();
	console.log(postid);
	// 1. 포스팅에서 완료버튼 누르면 내용 불러오기
	// [] 안에 있는게 변화하면 실행을 해주는 함수. [] 안에 내용이 없으면 처음 페이지가 랜더링 되었을 때 한번만 실행해줌.
	useEffect(() => {
		//slice에 있는 함수 불러오기
		//getPost(여기) 여기에 데이터를 넣으면 postslice의 payload 값이 됨.
		//3-1 에 넣은 postid가 여기로 들어옴. -> slice가서 확인해보면 payload값으로 들어가는걸 확인할 수 있음.
		dispatch(getPost(postid))
		// console.log("123")
	},[])



	// slice에 있는 post를 쓸 수 있게 해줌. (리덕스 안에 있는 애를 뽑아쓸 때 필요함)
	// state는 전역변수를 뜻하는거기 때문에 걍 쓰삼 (configstore를 뜻함)
	// state.post 는 configstore에 지정해둔 post 값임 slice를 뜻함
	// state.post.post는 slice안에 있는 Initialstate값을 가져옴
	const detailPost = useSelector((state)=> state.post.post);
	console.log(detailPost)


	return (
		<div className="detail_container">
			<DetailHeader />
			<div className="detail_image_box"></div>
			<div className="detail_wrap">
				<div className="detail_user_profile">
					<MyProfilHeader />
				</div>

				<div className="detail_title">
					{/* <p>{detailPost.title}</p> */}
					<p>타이틀ㅋㅋ</p>
				</div>
				<div className="detail_price">
					
				</div>
					<div className="detail_content">
						<p>내용</p>
					</div>
			</div>
		</div>
	);
};

export default Detail;
