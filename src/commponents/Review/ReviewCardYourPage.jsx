// React import
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Style import
import './ReviewCard.scss';

// Redux import
import { getMypageReview } from '../../redux/modules/reviewSlice';
import { useDispatch, useSelector } from 'react-redux';
import ReviewCardContent from './ReviewCardContent';
import ReviewCardYourComment from './ReviewCardYourComment ';

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
            <div className="reviewCardYourPage_container">
              <ReviewCardContent
                item={item}
                index={index}
                profileUrl={profile?.profileUrl}
              />
              {item.children[0] ? (
                <ReviewCardYourComment
                  item={item}
                  profileUrl={profile?.profileUrl}
                />
              ) : (
                ' '
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewCard;
