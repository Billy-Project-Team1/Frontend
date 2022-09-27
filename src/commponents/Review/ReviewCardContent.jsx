// React import
import React, { useCallback, useRef, useState } from 'react';

// Style import
import './ReviewCard.scss';
import ReviewStarRating from '../starRating/ReviewStarRating';
import { TbMinusVertical } from 'react-icons/tb';
import { TbDotsVertical } from 'react-icons/tb';
import ReviewModal from '../modal/ReviewModal';

const ReviewCardContent = ({ item, index, authorId }) => {
  const userId = localStorage.getItem('userId');

  function rentalDate(a) {
    var d = new Date(a);
    return (
      (d.getMonth() + 1 > 9
        ? (d.getMonth() + 1).toString()
        : '0' + (d.getMonth() + 1)) +
      '.' +
      (d.getDate() > 9 ? d.getDate().toString() : '0' + d.getDate().toString())
    );
  }

  const textRef = useRef();
  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = textRef.current.scrollHeight + 'px';
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div>
      <div className="reviewCard_wrap_2" key={index}>
        <div className="reviewCard_title">{item.title}</div>
        <div className="reviewCard_rating_name_wrap">
          <div className="reviewCard_rating_name_box">
            <ReviewStarRating
              className="reviewStarRating_star"
              reviewRating={item.star}
            />
          </div>
          <div className="reviewCard_rating_container">
            <div className="reviewCard_rating_box">
              <div className="reviewCard_rating">{item.star}.0</div>
              <div className="reviewCard_rating_name_box">
                <div className="reviewCard_rating_box">
                  <div className="reviewCard_rental_name">{item.nickname}</div>
                  <div className="reviewCard_middle_line">
                    <TbMinusVertical />
                  </div>
                  <div className="reviewCard_rental_date">
                    {rentalDate(item.startDate)} - {rentalDate(item.endDate)} (
                    {item.dateCount}박)
                    {userId === authorId ? (
                      <>
                        <TbDotsVertical onClick={() => showModal()} />
                      </>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="reviewCard_imgs_wrap">
          {item.reviewImgUrl.map((img, index) => {
            return (
              <div className="reviewCard_img_list" key={index}>
                <img className="reviewCard_img" src={img.reviewImgUrl} alt="" />
              </div>
            );
          })}
        </div>
        <div className="reviewCard_comment">{item.comment}</div>
      </div>
      {modalOpen && (
        <ReviewModal
          showModal={showModal}
          setModalOpen={setModalOpen}
          //   postId={postId}
        />
      )}
    </div>
  );
};

export default ReviewCardContent;
