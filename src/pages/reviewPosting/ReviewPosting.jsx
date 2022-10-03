// React import
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Redux import
import { useDispatch, useSelector } from 'react-redux';
import { addReview } from '../../redux/modules/reviewSlice';

// Style import
import './ReviewPosting.scss';

// Components import
import Headers2 from '../../commponents/header/Headers2';
import StarRating from '../../commponents/starRating/StarRating';
import ImageUploader from '../../commponents/imageUploader/ImageUploader';
import { getReviewPost } from '../../redux/modules/postSlice';

const ReviewPosting = () => {
  const { postId, reservationId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myUserId = localStorage.getItem('userId');
  const initialState = {
    reservationId: reservationId,
    star: 0,
    comment: '',
  };

  const [data, setData] = useState(initialState);
  const [img, setImg] = useState([]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  useEffect(() => {
    dispatch(getReviewPost({ postId, myUserId }));
  }, []);

  const postDetail = useSelector((state) => state.post.post);

  const onPostingHandler = async (e) => {
    if (data.star === 0) {
      return '';
    } else {
      e.preventDefault();
      let formData = new FormData();
      formData.append(
        'reviewRequestDto',
        new Blob([JSON.stringify(data)], { type: 'application/json' })
      );
      for (let i = 0; i < img.length; i++) {
        formData.append('files', img[i]);
      }

      try {
        const data = await dispatch(addReview(formData)).unwrap();
        if (data) {
          navigate(`/detail/${postId}`);
        } else {
          console.log(data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="reviewPost_wrap">
      <Headers2 pageName="리뷰 작성" />
      <div className="reviewPost_container">
        <div className="reviewPost_rating_container">
          <div className="reviewPost_img_box">
            <img
              className="reviewPost_img"
              src={postDetail.postImgUrl?.postImgUrlList[0]}
            />
          </div>
          <div className="reviewPost_right_box">
            <div className="reviewPost_title">
              거래에 대한 평가를 남겨주세요.
            </div>
            <div className="reviewPost_star">
              <StarRating onChangeHandler={onChangeHandler} />
            </div>
          </div>
        </div>

        <div className="reviewPost_write">
          <span className="reviewPost_title">후기를 써주세요.</span>
          <span className="reviewPost_option"> (선택)</span>
          <div className="reviewPost_write_content">
            <textarea
              type="text"
              placeholder="후기를 남겨주시면 다른 대여자들에게 도움이 됩니다!"
              name="comment"
              value={data.comment}
              onChange={onChangeHandler}
            />
          </div>
        </div>

        <div className="reviewPost_upload_img">
          <span className="reviewPost_title">제품 사진을 올려주세요.</span>
          <span className="reviewPost_option"> (선택)</span>
        </div>
        <ImageUploader img={img} setImg={setImg} />
        {data.star === 0 ? (
          <div className="reviewPost_submit_btn_wait">작성완료</div>
        ) : (
          <div
            className="reviewPost_submit_btn"
            type="submit"
            onClick={onPostingHandler}
          >
            작성완료
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewPosting;
