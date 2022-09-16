import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { withdrawal } from '../../redux/modules/memberSlice';
import '../../commponents/footer/AlertLargeModal.scss';

const DeleteIdModal = ({ setDeleteModalOpen }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const closeModal = () => {
    setDeleteModalOpen(false);
  };
  const Withdrawal = () => {
    dispatch(withdrawal(userId));

  };

  return (
    <div className="alertModalLargeModal-container">
      <div className="alertModalLargeModal-box">
        <p>탈퇴시 사용자님의 정보가 모두 삭제됩니다.</p>
        <p>탈퇴하시겠습니까?</p>
        <div className="alertModalLargeModal-btns">
          <button className="alertModal-whiteBtn" onClick={closeModal}>
            취소
          </button>
          <button className="alertModal-blueBtn" onClick={Withdrawal}>
            탈퇴
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteIdModal;
