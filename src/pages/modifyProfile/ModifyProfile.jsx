// React import
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Redux import
import { useDispatch, useSelector } from 'react-redux';
import {
	editProfileThunk,
	getProfileThunk,
} from '../../redux/modules/profileSlice';
import { getCookie } from '../../redux/modules/customCookies';
import { logOut, withdrawal } from '../../redux/modules/memberSlice';
// Style & Img & Icon import
import './ModifyProfile.scss';
import { FaCamera } from 'react-icons/fa';
// Component import
import Headers from '../../commponents/header/Headers';
import AlertSmallModal from '../../commponents/modal/AlertSmallModal';
import AlertLargeModal from '../../commponents/modal/AlertLargeModal';

const ModifyProfile = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const memberImg_ref = useRef(null);
	const is_login = localStorage.getItem('userId');
	const refreshToken = getCookie('refreshToken');
	const token = localStorage.getItem('accessToken');

	useEffect(() => {
		async function getProfile() {
			const result = await dispatch(getProfileThunk(is_login)).unwrap();
			if (result) {
				setReviseProfile({
					nickname: `${result.nickname}`,
					profileUrl: `${result.profileUrl}`,
				});
				setImage(result.profileUrl);
			}
		}
		getProfile();
	}, []);

	const member = useSelector((state) => state.myprofile?.myProfile);
	const [reviseProfile, setReviseProfile] = useState({
		nickname: '',
		profileUrl: '',
	});
	const [files, setFile] = useState('');
	const [image, setImage] = useState('');
	const [nickCheck, setNickCheck] = useState(false);

	useEffect(() => {
		if (
			reviseProfile?.nickname?.length < 2 ||
			reviseProfile?.nickname?.length > 6
		) {
			setNickCheck(false);
		} else if (reviseProfile?.nickname?.search(/\s/) != -1) {
			setNickCheck(false);
		} else if (
			reviseProfile?.nickname?.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi) != -1
		) {
			setNickCheck(false);
		} else if (reviseProfile?.nickname === null) {
			setNickCheck(false);
		} else {
			setNickCheck(true);
		}
	}, [reviseProfile?.nickname]);

	const onChangeHandler = (e) => {
		const { name, value } = e.target;
		setReviseProfile({ ...reviseProfile, [name]: value });
	};
	//프로필 사진 변경 함수
	const onLoadFile = (e) => {
		if (e.target.files[0]) {
			setFile(URL.createObjectURL(e.target.files[0]));
		} else {
			// 업로드 취소시 기본 이미지
			setImage();
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
			alert('잘못된 형식입니다');
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
			setReviseProfile();
			navigate(`/mypage/${is_login}`);
		}
	};

	const [modalOn, setModalOn] = useState(false);
	const [largeModalOpen, setLargeModalOpen] = useState(false);
	const modalTrue = () => {
		setModalOn(true);
	};
	const isModal = () => {
		setLargeModalOpen(true);
	};

	const logout = async () => {
		dispatch(logOut({ refreshToken, token }));
	};
	const Withdrawal = async () => {
		try {
			const response = await dispatch(withdrawal(is_login)).unwrap();
			if (response) {
				console.log(response);
			}
		} catch (error) {
			alert(error.response.data.message);
		}
	};

	return (
		<>
			<Headers pageName="프로필 편집" onClickSave={sumbitHandler} type="완료" />
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
						<p>2-6자 이내, 특수문자/띄어쓰기 불가</p>
					</div>
				</div>
				<div className="modifyProfile_setbtns">
					<button className="modifyProfile_btn" onClick={modalTrue}>
						로그아웃
					</button>
					{modalOn && (
						<AlertSmallModal
							setModalOn={setModalOn}
							body="로그아웃 하시겠습니까?"
							buttonType="로그아웃"
							onClickSubmit={logout}
						/>
					)}
					<button className="modifyProfile_btn2" onClick={isModal}>
						회원탈퇴
					</button>
					{largeModalOpen && (
						<AlertLargeModal
							setLargeModalOpen={setLargeModalOpen}
							body1="탈퇴시 사용자님의 정보가 모두 삭제됩니다."
							body2="탈퇴하시겠습니까?"
							buttonType="회원탈퇴"
							onClickSubmit={Withdrawal}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default ModifyProfile;
