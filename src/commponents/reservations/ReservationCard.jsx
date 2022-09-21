import React from 'react';
import './ReservationCard.scss';
import dailycost from '../../static/image/dailycost.svg';
import deposit from '../../static/image/deposit.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  billyStateListThunk,
  deliveryDoneThunk,
  reservationCancelThunk,
} from '../../redux/modules/reservationSlice';
import { useNavigate, useParams } from 'react-router-dom';
import ApprovalModal from './ApprovalModal';
import CancelPage from './CancelPage';

const ReservationCard = ({ billyState }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const is_login = localStorage.getItem('userId');
  const [cancelMessage, setCancelMessage] = useState({
    cancelMessage: '취소할게요',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    dispatch(billyStateListThunk(billyState));
  }, []);

  const billylist = useSelector((state) => state.billystate?.billyList);

  useEffect(() => {}, [JSON.stringify(billylist)]);

  const rentalTotalDate = (a, b) => {
    return Math.floor(a / b);
  };

  function rentalDate(a) {
    var d = new Date(a);
    return (
      (d.getMonth() + 1 > 9
        ? (d.getMonth() + 1).toString()
        : '0' + (d.getMonth() + 1)) +
      '.' +
      (d.getDate() > 9
        ? d.getDate().toString()
        : '0' + d.getDate().toString()) +
      '(' +
      ('월화수목금토일'.charAt(d.getUTCDay()) + '') +
      ')'
    );
  }
  // console.log(rentalDate())

  const dailyPrice = (a) => {
    return a?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const depositPrice = (a) => {
    return a?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const cancelHandler = async (a, b) => {
    // console.log(b)
    try {
      const response = await dispatch(reservationCancelThunk({ a, b }));
      if (response) {
        // return window.location.replace(`/mypage/${is_login}`);
      }
    } catch {}
  };

  const deliveryDoneHandler = async (e) => {
    try {
      const response = await dispatch(deliveryDoneThunk(e));
      if (response) {
        // return window.location.replace(`/mypage/${is_login}`);
      }
    } catch {}
  };
  // const title = 'ㅠㅠ'
  //   const cancel = () => {
  //     navigate('/cancelPage', {
  //       state: { title:title, price: '오만원' },
  //     });
  //   };
  const cancel = ()=>{
    navigate('/cancelPage')
  }
  return (
    // .slice(0).reverse()
    <div className="reservationcard_first_container">
      {billylist?.map((item, index) => {
        return (
          <div className="reservationcard_container" key={index}>
            <div className="reservationcard_small_container">
              <div className="reservationcard_title_wrap">
                <div className="reservationcard_title">{item.title}</div>
              </div>
              <div className="reservationcard_detail_wrap">
                <img className="reservationcard_img" src={item.postImgUrl} />
                <div className="reservationcard_body_box">
                  <div className="reservationcard_icon_box">
                    <div className="reservationcard_price">
                      <img src={dailycost} />
                      <p>{dailyPrice(item.price)}</p>
                    </div>
                    <div className="reservationcard_price">
                      <img src={deposit} />
                      <p>{depositPrice(item.deposit)}</p>
                    </div>
                  </div>
                  <div>
                    예약일자 : {rentalDate(item.startDate)}~
                    {rentalDate(item.endDate)}&nbsp;(
                    {rentalTotalDate(item.totalAmount, item.price)}박)
                  </div>
                  <div>
                    예약상태 :&nbsp;
                    {billyState === '1'
                      ? '예약 대기중'
                      : billyState === '2'
                      ? '예약중'
                      : billyState === '4'
                      ? '대여중'
                      : billyState === '5'
                      ? '거래 완료'
                      : billyState === '3'
                      ? '취소 완료'
                      : ''}
                  </div>
                  <div className="reservationcard_name_wrap">
                    <div className="reservationcard_name">
                      대여자 : {item.jullyNickname}
                    </div>
                    <button className="reservationcard_chat_btn">
                      1:1 문의
                    </button>
                  </div>
                  <div className="reservationcard_alert_content">
                    {billyState === '2'
                      ? '• 거래 완료시 수령 완료 버튼을 체크해주세요.'
                      : ''}
                  </div>
                  {billyState === '3' ? (
                    <div className="reservationcard_alert_content">
                      취소사유 : {item.cancelMessage}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div className="reservationcard_btn_wrap">
                {billyState === '1' ? (
                  <button
                    className="reservationcard_btn"
                    onClick={cancel}
                    // onClick={() => {
                    //   '/cancelPage',
                    //     {
                    //       state: { title: item.title, price: '오만원' },
                    //     };
                    // }}
                    // onClick={() =>
                    // cancelHandler(item.reservationId, cancelMessage)
                    // }
                  >
                    예약 취소
                  </button>
                ) : billyState === '2' ? (
                  item.delivery === true ? (
                    <button className="reservationcard_wait_btn">
                      승인 대기 중
                    </button>
                  ) : (
                    <>
                      <button
                        className="reservationcard_btn"
                        onClick={showModal}
                        // onClick={() => deliveryDoneHandler(item.reservationId)}
                      >
                        수령 완료
                      </button>
                      {modalOpen && (
                        <ApprovalModal
                          word="수령"
                          buttonType="수령 완료"
                          onClickSaver={deliveryDoneHandler(item.reservationId)}
                          setModalOpen={setModalOpen}
                        />
                      )}
                    </>
                  )
                ) : billyState === '4' ? (
                  <div style={{ marginBottom: '20px' }} />
                ) : billyState === '5' ? (
                  <button className="reservationcard_btn">리뷰 작성</button>
                ) : billyState === '3' ? (
                  <div style={{ marginBottom: '20px' }} />
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ReservationCard;
