// React import
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Style import
import './ReviewCard.scss';

// Redux import
import { getMypageReview } from '../../redux/modules/reviewSlice';
import { useDispatch, useSelector } from 'react-redux';
import ReviewCardContent from './ReviewCardContent';
import ReviewCardComment from './ReviewCardComment';

const ReviewCard = ({ profile }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const reviewGet = useSelector((state) => state.review.reviewGet);

  useEffect(() => {
    dispatch(getMypageReview(id));
  }, []);

  return (
    <div>
      <div className="reviewCard_container">
        {reviewGet?.map((item, index) => {
          return (
            <div className="reviewCard_container_box">
              <ReviewCardContent
                item={item}
                index={index}
                profileUrl={profile?.profileUrl}
                authorId={item.authorId}
                id={id}
                reviewId={item.reviewId}
              />
              <ReviewCardComment
                item={item}
                profileUrl={profile?.profileUrl}
                reviewId={item.reviewId}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewCard;
