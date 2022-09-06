import React, { useState } from 'react';
import ModifyProfileHeader from '../../commponents/header/ModifyProfileHeader';
import profileimg from '../../static/image/profileimg.png';
import DeleteIdModal from './DeleteIdModal';
import LogoutModal from './LogoutModal';
import './ModifyProfile.scss';

const ModifyProfile = () => {
  //모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  //모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };
  const isModal = () => {
    setDeleteModalOpen(true);
  };

  return (
    <div className="modifiyProfile-wrap">
      <ModifyProfileHeader />
      <div className="modifyProfile-container">
        <div className="modifyProfile-imgBox">
          <img src={profileimg} className="modifyProfile-img" />
        </div>
        <div className="modifyProfile-rightBox">
          <div className="modifyProfile-nickname">닉네임</div>
          <input className="modifyProfile-input"></input>
        </div>
      </div>
      <div className="modifyProfile-setbtns">
        <button onClick={showModal}>로그아웃</button>
        {modalOpen && <LogoutModal setModalOpen={setModalOpen} />}
        <button onClick={isModal}>회원탈퇴</button>
        {deleteModalOpen && (
          <DeleteIdModal setDeleteModalOpen={setDeleteModalOpen} />
        )}
      </div>
    </div>
  );
};

export default ModifyProfile;
