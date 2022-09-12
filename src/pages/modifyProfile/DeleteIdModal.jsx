import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { withdrawal } from '../../redux/modules/memberSlice';
import './DeleteIdModal.scss';

const DeleteIdModal = ({ setDeleteModalOpen }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const closeModal = () => {
    setDeleteModalOpen(false);
  };
  const Withdrawal = () => {
    dispatch(withdrawal(userId));
    Navigate('/');
  };

  return (
    <div className="deleteIdModal-container">
      <div className="deleteIdModal-box">
        <p>탈퇴시 사용자님의 정보가 모두 삭제됩니다.</p>
        <p>탈퇴하시겠습니까?</p>
        <div className="deleteIdModal-btns">
          <button
            style={{ backgroundColor: '#EB0000', color: '#F7F7F7' }}
            onClick={Withdrawal}
          >
            탈퇴하기
          </button>

          <button onClick={closeModal}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteIdModal;
