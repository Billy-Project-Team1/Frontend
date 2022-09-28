// React import
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Redux import
import { useDispatch } from 'react-redux';
// Style import
import '../posting/Posting.scss';
// Slice import
import { getPost, updatePost } from '../../redux/modules/postSlice';
// Component import
import Headers from '../../commponents/header/Headers';
import PostingMap from '../../commponents/maps/PostingMap';
import Footer from '../../commponents/footer/Footer';
import ModifyPlace from '../../commponents/maps/ModifyPlace';
import ModifyCalendar from '../../commponents/calendar/ModifyCalendar';
import ModifyImageUploader from '../../commponents/imageUploader/ModifyImageUploader';

const ModifyPosting = () => {
  const dispatch = useDispatch();
  const { postid } = useParams();
  const myUserId = localStorage.getItem('userId');
  const [img, setImg] = useState([]);
  const [blockDateDtoList, setBlockDateDtoList] = useState([]);
  const [searchMapModal, setSearchMapModal] = useState(false);
  const [imgUrl, setImgUrl] = useState([]);
  const [date, setDate] = useState([]);
  const [blockDate, setBlockDate] = useState([]);

  useEffect(() => {
    async function getDetail() {
      const result = await dispatch(getPost({ postid, myUserId })).unwrap();
      if (result) {
        setRevisePosting({
          title: `${result.title}`,
          price: `${result.price}`,
          deposit: `${result.deposit}`,
          location: `${result.location}`,
          content: `${result.content}`,
          detailLocation: `${result.detailLocation}`,
          latitude: `${result.latitude}`,
          longitude: `${result.longitude}`,
          postImgUrl: `${result.postImgUrl?.postImgUrlList}`,
        });
        setImg(result.postImgUrl.postImgUrlList);
        setImgUrl([...imgUrl, ...result.postImgUrl.postImgUrlList]);
        result.blockDate.blockDateList.map((item) => {
          return date.push(new Date(item));
        });
        setBlockDate(result.blockDate?.reservationDateList);
        setBlockDateDtoList(result.blockDate?.reservationDateList);
      }
    }
    getDetail();
  }, []);

  const initialState = {
    title: '',
    price: '',
    deposit: '',
    location: '',
    content: '',
    detailLocation: '',
    latitude: '',
    longitude: '',
  };
  const [revisePosting, setRevisePosting] = useState(initialState);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setRevisePosting({ ...revisePosting, [name]: value });
  };

  const onPostingHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append(
      'postUploadRequestDto',
      new Blob([JSON.stringify(revisePosting)], { type: 'application/json' })
    );
    for (let i = 0; i < imgUrl.length; i++) {
      formData.append('imgUrlList', imgUrl[i]);
    }

    for (let i = 0; i < img.length; i++) {
      formData.append('files', img[i]);
    }
    for (let i = 0; i < blockDateDtoList?.blockDateDtoList?.length; i++) {
      formData.append('blockDateDtoList', blockDateDtoList.blockDateDtoList[i]);
    }
    try {
      const data = await dispatch(updatePost({ formData, postid })).unwrap();
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
      <Headers
        pageName="글 수정하기"
        onClickSave={onPostingHandler}
        type="완료"
      />
      <div className="posting_container">
        <div className="posting_image">
          <ModifyImageUploader
            img={img}
            setImg={setImg}
            imgUrl={imgUrl}
            setImgUrl={setImgUrl}
          />
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
            <ModifyCalendar
              data={blockDate}
              date={date}
              setDate={setDate}
              setBlockDateDtoList={setBlockDateDtoList}
              blockDateDtoList={blockDateDtoList}
            />
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
