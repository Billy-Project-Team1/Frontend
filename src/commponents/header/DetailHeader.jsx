import React, { useState } from 'react';
import './Headers.scss';
import DetailModal from '../header/DetailModal';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import dotIcon from '../../static/image/detail_dot_icon.svg';

//3.props 받은건데 47번에 보라색 이름이 들어오는거
const AddPostingHeader = ({ authorId,postId }) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="detail_header_container">
      <div className="detail_header_wrap">
        <div className="mypage_header_content">
          <HiOutlineChevronLeft
            style={{ marginRight: '22px' }}
            color="#656565"
            size="24px"
            onClick={() => navigate(-1)}
          />
          {/* 4. 삼항연산자. props 이용해하기. api 확인~ */}

          {userId === authorId ? (
            <div>
              <img
                src={dotIcon}
                style={{ width: '28px' }}
                onClick={() => showModal()}
              />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      {modalOpen && <DetailModal showModal={showModal} postId={postId}/>}
    </div>
  );
};

export default AddPostingHeader;
