// react import
import React from 'react';

//icon import
import { FaStar } from 'react-icons/fa';

const ReviewCardDetailStarAvg = ({ reviewGet }) => {
  const result = reviewGet.reduce(function add(sum, currValue) {
    return sum + currValue.star;
  }, 0);

  const totalAvg = (result / reviewGet.length).toFixed(1);
  return (
    <>
      {reviewGet.length === 0 ? (
        ''
      ) : (
        <div className="ReviewCard_starAvg_container">
          <div className="reviewCard_star_avg">
            <div className="reviewCard_total">대여 리뷰</div>
            <div className="reciewCard_one_star_wrap">
              <FaStar className="reviewCard_one_star" />
            </div>
            {totalAvg} ({reviewGet?.length})
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewCardDetailStarAvg;
