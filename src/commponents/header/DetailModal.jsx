// React import
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Redux import
import { useDispatch } from 'react-redux';
// Style import
import './DetailModal.scss';
// Slice import
import { deletePost } from '../../redux/modules/postSlice';
// Component import
import AlertSmallModal from '../modal/AlertSmallModal';

const DetailModal = ({ showModal, postId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalOn, setModalOn] = useState(false);
  const modalTrue = () => {
    setModalOn(true);
  };

  const deleteHandler = async () => {
    try {
      const response = await dispatch(deletePost(postId)).unwrap();
      if (response) {
        navigate('/');
      }
    } catch {}
  };

  return (
    <div className="detailModal_background">
      <div className="detailModal_container">
        <div className="detailModal_btn_first">
          <div
            className="detailModal_edit_btn"
            onClick={() => navigate('/modifyPosting')}
          >
            게시물 수정하기
          </div>
          <div className="detailModal_del_btn" onClick={modalTrue}>
            삭제
          </div>
          {modalOn&& (
            <AlertSmallModal
              setModalOn={setModalOn}
              body="삭제하시겠습니까?"
              buttonType="삭제"
              onClickSubmit={deleteHandler}
            />
          )}
        </div>
        <div className="detailModal_btn_second">
          <div className="detailModal_cancel_btn" onClick={showModal}>
            취소
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
