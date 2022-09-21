import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import profileimg from '../../static/image/profileimg.png';
import DeleteIdModal from './DeleteIdModal';
import LogoutModal from './LogoutModal';
import './ModifyProfile.scss';
import { FaCamera } from 'react-icons/fa';
import { editProfileThunk } from '../../redux/modules/profileSlice';
import AddPostingHeader from '../../commponents/header/AddPostingHeader';

const ModifyProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const memberImg_ref = useRef(null);
  const is_login = localStorage.getItem('userId');

  const member = useSelector((state) => state.myprofile.myProfile);
  // console.log(member);
  const initialState = {
    nickname: `${member.nickname}`,
    profileUrl: member.profileUrl,
  };
  const [reviseProfile, setReviseProfile] = useState(initialState);
  const [files, setFile] = useState('');
  const [image, setImage] = useState(
    member.profileUrl ? member.profileUrl : profileimg
  );
  const [nickCheck, setNickCheck] = useState(false);

  useEffect(() => {
    if (
      reviseProfile.nickname.length < 2 ||
      reviseProfile.nickname.length > 8
    ) {
      setNickCheck(false);
    } else if (reviseProfile.nickname.search(/\s/) != -1) {
      setNickCheck(false);
    } else if (
      reviseProfile.nickname.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi) != -1
    ) {
      setNickCheck(false);
    } else if (reviseProfile.nickname === null) {
      setNickCheck(false);
    } else {
      setNickCheck(true);
    }
  }, [reviseProfile.nickname]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setReviseProfile({ ...reviseProfile, [name]: value });
  };
  console.log(reviseProfile);
  //프로필 사진 변경 함수
  const onLoadFile = (e) => {
    if (e.target.files[0]) {
      setFile(URL.createObjectURL(e.target.files[0]));
    } else {
      // 업로드 취소시 기본 이미지
      setImage(profileimg);
    }
    // 화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const sumbitHandler = async (event) => {
    if (nickCheck == false) {
      event.preventDefault();
      alert('잘못된 형식입니다')
    } else {
      event.preventDefault();
      let formData = new FormData();
      let uploadImg = memberImg_ref.current;

      formData.append(
        'data',
        new Blob([JSON.stringify(reviseProfile)], { type: 'application/json' })
      );
      formData.append('image', uploadImg.files[0]);
      await dispatch(editProfileThunk({ formData, is_login }));
      setReviseProfile(initialState);
      navigate(`/mypage/${is_login}`);
    }
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
      <AddPostingHeader
        pageName="프로필 편집"
        onClickSave={sumbitHandler}
        type="완료"
      />

      <div className="modifiyProfile_wrap">
        <div className="modifyProfile_container">
          <div className="modifyProfile_img_box">
            <input
              ref={memberImg_ref}
              type="file"
              accept="image/*"
              id="img_upFile"
              onChange={onLoadFile}
              style={{ display: 'none' }}
            />
            <img src={image} alt="" className="modifyProfile_img" />
            <div className="modifiyProfile_icon_wrap">
              <div className="modifiyProfile_icon">
                <label className="Img_label" htmlFor="img_upFile">
                  <FaCamera color="#CCCCCC" className="modifiyProfile_camera" />
                </label>
              </div>
            </div>
          </div>
          <div className="modifyProfile_right_box">
            <input
              className="modifyProfile_input"
              name="nickname"
              value={reviseProfile.nickname}
              onChange={onChangeHandler}
            ></input>
            <p>2-8자 이내, 특수문자/띄어쓰기 불가</p>
          </div>
        </div>
        <div className="modifyProfile_setbtns">
          <button className="modifyProfile_btn" onClick={showModal}>
            로그아웃
          </button>
          {modalOpen && <LogoutModal setModalOpen={setModalOpen} />}
          <button className="modifyProfile_btn2" onClick={isModal}>
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
