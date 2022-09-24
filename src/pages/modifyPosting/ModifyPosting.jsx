import React, { useState } from 'react';
import Headers from '../../commponents/header/Headers';
import ImageUploader from '../../commponents/imageUploader/ImageUploader';
import Calendar from '../../commponents/calendar/Calendar';
import PostingMap from '../../commponents/maps/PostingMap';
import SearchPlace from '../../commponents/maps/SearchPlace';
import '../posting/Posting.scss';
import { useSelector } from 'react-redux';
import Footer from '../../commponents/footer/Footer';
import ModifyPlace from '../../commponents/maps/ModifyPlace';

const ModifyPosting = () => {
  const [img, setImg] = useState([]); // file
  const [blockDateDtoList, setBlockDateDtoList] = useState([]);
  const [searchMapModal, setSearchMapModal] = useState(false);

  const detailPost = useSelector((state) => state.post.post);
  console.log(detailPost);
  // console.log(detailPost)
  const initialState = {
    title: `${detailPost.title}`,
    price: `${detailPost.price}`,
    deposit: `${detailPost.deposit}`,
    location: `${detailPost.location}`,
    content: `${detailPost.content}`,
    detailLocation: `${detailPost.detailLocation}`,
    latitude: `${detailPost.latitude}`,
    longitude: `${detailPost.longitude}`,
    blockDateDtoList: `${detailPost.blockDateDtoList}`,
  };
  const [revisePosting, setRevisePosting] = useState(initialState);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setRevisePosting({ ...revisePosting, [name]: value });
  };

  const onPostingHandler = async (e) => {};
  return (
    <div>
      <Headers
        pageName="글 수정하기"
        onClickSave={onPostingHandler}
        type="완료"
      />
      <div className="posting_container">
        <div className="posting_image">
          <ImageUploader img={img} setImg={setImg} />
        </div>
        <div className="posting_title">
          <input
            type="text"
            placeholder="제품명"
            name="title"
            value={revisePosting.title}
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
              value={revisePosting.price}
              onChange={onChangeHandler}
              maxLength={9}
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
              value={revisePosting.deposit}
              onChange={onChangeHandler}
              maxLength={9}
            />
          </div>
        </div>

        <div className="posting_content">
          <textarea
            type="text"
            placeholder="게시물 내용을 작성해주세요. (적절하지 못한 제품은 게시가 제한될 수
				있어요.)"
            name="content"
            value={revisePosting.content}
            onChange={onChangeHandler}
          />
        </div>
        <div className="posting_calendar_wrap">
          <div className="posting_calendar_icon">
            <Calendar setData={setBlockDateDtoList} data={blockDateDtoList} />
          </div>
        </div>
        <div className="posting_map_wrap">
          <PostingMap
            setSearchMapModal={setSearchMapModal}
            data={revisePosting}
          />
          {searchMapModal && (
            <ModifyPlace
              setSearchMapModal={setSearchMapModal}
              setData={setRevisePosting}
              data={revisePosting}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ModifyPosting;
