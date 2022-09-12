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
  console.log(searchMapModal);

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
    blockDateDtoList: {},
    // files: form/data,
  };
  const [data, setData] = useState(initialState);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    //...data 기존 데이터 두고 추가시키는 느낌~ㅋㅋ
    setData({ ...data, [name]: value });
  };
  console.log(data);

  /////////////////

  const move = () => {
		dispatch(addPost());
    // navigate(`/detail/${}`);
  };

  return (
    <div>
      <AddPostingHeader move={move} />
      {/* <AddLocationHeader></AddLocationHeader>
			<ModifyPostingHeader></ModifyPostingHeader>
			<ModifyProfileHeader></ModifyProfileHeader>
			<MypageHeader></MypageHeader>
			<LoginHeader></LoginHeader>			
			<DetailHeader></DetailHeader>
			<MainHeader></MainHeader> */}

      <div className="posting_container">
        <div className="posting_image">
          <ImageUploader />
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
            <Calendar setData={setData} data={data} />
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
