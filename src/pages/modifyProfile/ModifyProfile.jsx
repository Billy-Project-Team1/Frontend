import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import ModifyProfileHeader from '../../commponents/header/ModifyProfileHeader';
import profileimg from '../../static/image/profileimg.png';
import DeleteIdModal from './DeleteIdModal';
import LogoutModal from './LogoutModal';
import './ModifyProfile.scss';
import { FaCamera } from 'react-icons/fa';

const ModifyProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const memberImg_ref = useRef(null);
  const is_login = localStorage.getItem('userId');

  const member = useSelector((state) => state.myprofile.myProfile);
  const initialState = {
    nickname: member.nickname,
  };
  const [reviseProfile, setReviseProfile] = useState(initialState);
  const [files, setFile] = useState('');

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setReviseProfile({ ...reviseProfile, [name]: value });
  };
  const onLoadFile = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const sumbitHandler = async (event) => {
    let frm = new FormData();
    let uploadImg = memberImg_ref.current;

    frm.appen(
      'data',
      new Blob([JSON.stringify(reviseProfile)], { type: 'application/json' })
    );
    frm.append('img', uploadImg.files[0]);
    await dispatch();
    // setReviseProfile(initialState);
    navigate(`/mypage/${is_login}`);
  };

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
    <>
      <ModifyProfileHeader move={sumbitHandler} />
      <div className="modifiyProfile-iconWrap">
        <div className="modifiyProfile-icon">
          <label className="Img_label" htmlFor="img_upFile">
            <FaCamera className="modifiyProfile-camera" />
          </label>
        </div>
      </div>
      <div className="modifiyProfile-wrap">
        <div className="modifyProfile-container">
          <div className="modifyProfile-imgBox">
            <input
              ref={memberImg_ref}
              type="file"
              accept="image/*"
              id="img_upFile"
              onChange={onLoadFile}
              style={{ display: 'none' }}
            />
            {/* <img
              src={files}
              alt=""
              // style={{ width: "50px", height: "50px" }}
            /> */}

            <img
              src={member.profileUrl ? member.profileUrl : profileimg}
              className="modifyProfile-img"
            />
          </div>
          <div className="modifyProfile-rightBox">
            <input
              className="modifyProfile-input"
              name="nickname"
              value={reviseProfile.nickname}
              onChange={onChangeHandler}
            ></input>
            <p>2-8자 이내, 특수문자/띄어쓰기 불가</p>
          </div>
        </div>
        <div className="modifyProfile-setbtns">
          <button className="modifyProfile-btn" onClick={showModal}>
            로그아웃
          </button>
          {modalOpen && <LogoutModal setModalOpen={setModalOpen} />}
          <button className="modifyProfile-btn" onClick={isModal}>
            회원탈퇴
          </button>
          {deleteModalOpen && (
            <DeleteIdModal setDeleteModalOpen={setDeleteModalOpen} />
          )}
        </div>
      </div>
    </>
  );
};

export default ModifyProfile;
