import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deletePost } from '../../redux/modules/postSlice';
import './DetailModal.scss';

const DetailModal = ({ showModal, postId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteHandler = async () => {
    try {
      const response = await dispatch(deletePost(postId)).unwrap();
      if (response) {
        navigate('/')
      }
    } catch {}
  };

  return (
    <div className="detailModal_background">
      <div className="detailModal_container">
        <div className="detailModal_btn_first">
          <div className="detailModal_edit_btn" onClick={()=>navigate('/modifyPosting')}>게시물 수정하기</div>
          <div className="detailModal_del_btn" onClick={() => deleteHandler()}>
            삭제
          </div>
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
