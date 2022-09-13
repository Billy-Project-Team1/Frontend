// React import
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { addPosting } from '../../redux/modules/posting';

// Style
import './Posting.scss';

//icons
import { FaCamera } from 'react-icons/fa';

// Component import
import AddPostingHeader from '../../commponents/header/AddPostingHeader';
import Calendar from '../../commponents/calendar/Calendar';
// import AddLocationHeader from '../../commponents/header/AddLocationHeader';
// import DetailHeader from '../../commponents/header/DetailHeader';
// import MainHeader from '../../commponents/header/MainHeader';
// import ModifyPostingHeader from '../../commponents/header/ModifyPostingHeader';
// import ModifyProfileHeader from '../../commponents/header/ModifyProfileHeader';
// import LoginHeader from '../../commponents/header/LoginHeader';
// import MypageHeader from '../../commponents/header/MypageHeader';

import ImageUploader from '../../commponents/imageUploader/ImageUploader';

import KakaoMap from '../../commponents/maps/KakaoMap';
import SearchPlace from '../../commponents/maps/SearchPlace';
import { Navigate, useNavigate } from 'react-router-dom';
import Footer from '../../commponents/footer/Footer';
import PostingMap from '../../commponents/maps/PostingMap';
import { addPost } from '../../redux/modules/postSlice';

const Posting = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [searchMapModal, setSearchMapModal] = useState(false);

	const [calendarOpen, setCalendarOpen] = useState(false);
	const calendarClose = () => {
		setCalendarOpen(!calendarOpen);
	};

	/////////////////

	const initialState = {
		title: '',
		content: '',
		price: '',
		deposit: '',
		location: '',
		detailLocation: '',
		latitude: '',
		longitude: '',
		// blockDateDtoList: {},
		// files: form/data,
	};
	const [data, setData] = useState(initialState);
	const [blockDateDtoList, setBlockDateDtoList] = useState([]);
	const [img, setImg] = useState([]); // file

	const onChangeHandler = (e) => {
		const { name, value } = e.target;
		//...data 기존 데이터 두고 추가시키는 느낌~ㅋㅋ
		setData({ ...data, [name]: value });
	};
	console.log(data);
	console.log(blockDateDtoList);

	/////////////////

	//   postUploadRequestDto: {
	// "title": "맥북쓰고싶은분~",
	// "content": "새 맥북이 생겨서 올려봅니다 깨끗하게 써주시",
	// "price": 10000,
	// "deposit": 100000,
	// "location": "상봉동",
	// "detailLocation": "111-11번지",
	// "latitude": "33.45050036271282",
	// "longitude": "126.57007065166688"
	// }
	// ”blockDateDtoList”: “2022/09/22”, “2022/10/22”
	// ”files”: form/data,

	//   //[1] post
	const onPostingHandler = (e) => {
    e.preventDefault()
		//이미지 form 데이터
		let formData = new FormData();
		//a는 이름으로  b를 저장한다. c는 어떠한 타입으로 / form은 c를 굳이 안써도됨
		// formData.append(a,b)
		formData.append(
			'postUploadRequestDto',
			new Blob([JSON.stringify(data)], { type: 'application/json' })
		);
		for (let i = 0; i < img.length; i++) {
			formData.append('files', img[i]);
		}
		for (let i = 0; i < blockDateDtoList.length; i++) {
			formData.append(
				'blockDateDtoList',
				new Blob([JSON.stringify(blockDateDtoList[i])], {
					type: 'application/json',
				})
			);
		}
		dispatch(addPost(formData));
		// navigate(`/detail/${}`);
	};

	return (
		<div>
			<AddPostingHeader onPostingHandler={onPostingHandler} />
			{/* <AddLocationHeader></AddLocationHeader>
			<ModifyPostingHeader></ModifyPostingHeader>
			<ModifyProfileHeader></ModifyProfileHeader>
			<MypageHeader></MypageHeader>
			<LoginHeader></LoginHeader>			
			<DetailHeader></DetailHeader>
			<MainHeader></MainHeader> */}

			<div className="posting_container">
				<div className="posting_image">
					<ImageUploader img={img} setImg={setImg} />
				</div>
				<div className="posting_title">
					<input
						type="text"
						placeholder="제품명"
						//input에 네임, 밸류 설정하기.
						name="title"
						value={data.title}
						onChange={onChangeHandler}
					/>
				</div>
				<div className="posting_rental">
					<div className="posting_price">
						<label className="posting_price_label">일 대여금</label>
						<input
							className="posting_price_input"
							type="number"
							placeholder="￦"
							name="price"
							value={data.price}
							onChange={onChangeHandler}
						/>
					</div>

					<div className="posting_deposit">
						<label className="posting_deposit_label">보증금</label>
						<input
							className="posting_deposit_input"
							type="number"
							placeholder="￦"
							name="deposit"
							value={data.deposit}
							onChange={onChangeHandler}
							// onChange={e => form({setDeposit: e.target.value.replace(/[^0-9]/g, "")})} />
						/>
					</div>
				</div>

				<div className="posting_calendar_wrap">
					<div className="posting_calendar_icon">
						<Calendar setData={setBlockDateDtoList} data={blockDateDtoList} />
					</div>
				</div>

				<div className="posting_content">
					<textarea
						type="text"
						placeholder="게시물 내용을 작성해주세요. (적절하지 못한 제품은 게시가 제한될 수
				있어요.)"
						name="content"
						value={data.content}
						onChange={onChangeHandler}
					/>
				</div>
				<PostingMap setSearchMapModal={setSearchMapModal} data={data} />
				{searchMapModal && (
					<SearchPlace
						setSearchMapModal={setSearchMapModal}
						setData={setData}
						data={data}
					/>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default Posting;
