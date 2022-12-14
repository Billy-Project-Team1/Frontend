// React import
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Redux import
import { useDispatch } from 'react-redux';
import { deletePost } from '../../redux/modules/postSlice';
// Components import
import DetailModal from '../header/DetailModal';
import AlertSmallModal from '../modal/AlertSmallModal';
// Style & Icon import
import './Headers.scss';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { TbDotsVertical } from 'react-icons/tb';

const AddPostingHeader = ({ authorId, postId }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userId = localStorage.getItem('userId');

	const [modalOpen, setModalOpen] = useState(false);
	const showModal = () => {
		setModalOpen(!modalOpen);
	};
	const [modalOn, setModalOn] = useState(false);

	const deleteHandler = async () => {
		try {
			const response = await dispatch(deletePost(postId)).unwrap();
			if (response) {
				window.location.replace('/');
			}
		} catch {}
	};

	const [scrollPosition, setScrollPosition] = useState(0);

	const updateScroll = () => {
		setScrollPosition(window.scrollY || document.documentElement.scrollTop);
	};

	useEffect(() => {
		window.addEventListener('scroll', updateScroll);
		return () => {
			window.removeEventListener('scroll', updateScroll); //unmount시 해제되도록
		};
	}, []);

	return (
		<>
			<div
				className="detail_header_container"
				style={{
					backgroundColor: scrollPosition < 390 ? 'transparent' : '#ffffff',
				}}
			>
				<div className="detail_header_wrap">
					<div className="mypage_header_content">
						<HiOutlineChevronLeft
							style={{
								marginRight: '22px',
								cursor: 'pointer',
								color: scrollPosition < 390 ? '#ffffff' : '#212121',
							}}
							size="24px"
							onClick={() => navigate(-1)}
						/>

						{userId === authorId ? (
							<div>
								<TbDotsVertical
									style={{
										width: '28px',
										fontSize: '24px',
										color: scrollPosition < 390 ? '#ffffff' : '#212121',
									}}
									onClick={() => showModal()}
								/>
							</div>
						) : (
							''
						)}
					</div>
				</div>
				{modalOpen && (
					<DetailModal
						showModal={showModal}
						setModalOpen={setModalOpen}
						postId={postId}
						setModalOn={setModalOn}
					/>
				)}
			</div>
			{modalOn && (
				<AlertSmallModal
					setModalOn={setModalOn}
					body="삭제하시겠습니까?"
					buttonType="삭제"
					onClickSubmit={deleteHandler}
					showModal={showModal}
				/>
			)}
		</>
	);
};

export default AddPostingHeader;
