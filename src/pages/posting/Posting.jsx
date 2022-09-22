// React import
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

// Redux import
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../redux/modules/postSlice';

// Style import
import './Posting.scss';

// icon import
import { FaCamera } from 'react-icons/fa';

// Component import
import Headers from '../../commponents/header/Headers';
import Calendar from '../../commponents/calendar/Calendar';
import ImageUploader from '../../commponents/imageUploader/ImageUploader';
import KakaoMap from '../../commponents/maps/KakaoMap';
import SearchPlace from '../../commponents/maps/SearchPlace';
import Footer from '../../commponents/footer/Footer';
import PostingMap from '../../commponents/maps/PostingMap';

const Posting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchMapModal, setSearchMapModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
  console.log(blockDateDtoList.blockDateDtoList);

  /////////////////

  //   //[1] post
  const onPostingHandler = async (e) => {
    e.preventDefault();
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
    for (let i = 0; i < blockDateDtoList.blockDateDtoList.length; i++) {
      formData.append('blockDateDtoList', blockDateDtoList.blockDateDtoList[i]);
    }
    try {
      const data = await dispatch(addPost(formData)).unwrap();
      console.log(data);
      if (data) {
        window.location.replace('/');
        window.location.replace(`/detail/${data.id}`);
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
		<div>
			<Headers pageName="글쓰기" onClickSave={onPostingHandler} type="완료" />

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
							onInput={(e) => {
								if (e.target.value.length > e.target.maxLength)
									e.target.value = e.target.value.slice(0, e.target.maxLength);
							}}
							className="posting_price_input"
							type="number"
							placeholder="￦"
							name="price"
							value={data.price}
							onChange={onChangeHandler}
							maxlength={9}
						/>
					</div>

					<div className="posting_deposit">
						<label className="posting_deposit_label">보증금</label>
						<input
							onInput={(e) => {
								if (e.target.value.length > e.target.maxLength)
									e.target.value = e.target.value.slice(0, e.target.maxLength);
							}}
							className="posting_deposit_input"
							type="number"
							placeholder="￦"
							name="deposit"
							value={data.deposit}
							onChange={onChangeHandler}
							maxlength={9}
							// onChange={e => form({setDeposit: e.target.value.replace(/[^0-9]/g, "")})} />
						/>
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
				<div className="posting_calendar_wrap">
					<div className="posting_calendar_icon">
						<Calendar setData={setBlockDateDtoList} data={blockDateDtoList} />
					</div>
				</div>
				<div className="posting_map_wrap">
					<PostingMap setSearchMapModal={setSearchMapModal} data={data} />
					{searchMapModal && (
						<SearchPlace
							setSearchMapModal={setSearchMapModal}
							setData={setData}
							data={data}
						/>
					)}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Posting;
