import React from 'react';
import './CancelPage.scss';
import dailycost from '../../static/image/dailycost.svg';
import deposit from '../../static/image/deposit.svg';
import { HiOutlineChevronLeft } from 'react-icons/hi';

const CancelPage = ({ setModalOpen,title,dailyPrice,img }) => {

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="cancelpage_modal">
      <div className="cancelpage_wrap">
        <div className='cancelpage_header_wrap'>
          <div className="cancelpage_header_content">
            <HiOutlineChevronLeft
              color="#212121"
              size="24px"
              onClick={()=>closeModal()}
            />
            <div className="cancelpage_header_title">대여 예약 취소</div>
          </div>
        </div>
        <div className="cancelpage_container">
          <img className="cancelpage_img"src={img}/>
          <div className="cancelpage_content_box">
            <div className='cancelpage_title'>{title}</div>
            <div className="cancelpagae_price_wrap">
              <div className="cancelpage_price_box">
                <img className="cancelpage_icon" src={dailycost} />
                <p>{dailyPrice}</p>
              </div>
              <div className="cancelpage_price_box">
                <img className="cancelpage_icon" src={deposit} />
                <p>490000</p>
              </div>
            </div>
            <div>날짜</div>
          </div>
        </div>
        <div className="cancelpage_body">취소 사유</div>
      </div>
    </div>
  );
};

export default CancelPage;
