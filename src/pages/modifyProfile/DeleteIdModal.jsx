import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { withdrawal } from '../../redux/modules/memberSlice';
import './LogoutModal.scss';

const DeleteIdModal = ({ setDeleteModalOpen }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const closeModal = () => {
    setDeleteModalOpen(false);
  };
  const Withdrawal = () => {
    dispatch(withdrawal());
    Navigate('/');
  };
  return (
    <div className="logoutModal-container">
      <div className="logoutModal-box">
        <p>정말로 탈퇴 하시겠습니까?</p>
        <div className="logoutModal-btns">
          <button onClick={closeModal}>취소</button>
          <button onClick={Withdrawal}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteIdModal;
